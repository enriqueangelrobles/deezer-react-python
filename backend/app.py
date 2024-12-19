from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import requests
import os
from dotenv import load_dotenv  

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stats.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Database models
class ArtistStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist_name = db.Column(db.String(255), nullable=False)
    listen_count = db.Column(db.Integer, default=0)

class SongStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_title = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(255), nullable=False)
    listen_count = db.Column(db.Integer, default=0)

# Routes
@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400

    url = "https://deezerdevs-deezer.p.rapidapi.com/search"
    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    }
    response = requests.get(url, headers=headers, params={"q": query})

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch data from Deezer"}), response.status_code

@app.route('/api/register_play', methods=['POST'])
def register_play():
    data = request.json

    # Validate received data
    song_title = data.get('song_title')
    artist_name = data.get('artist_name')

    if not song_title or not artist_name:
        return jsonify({"error": "song_title and artist_name are required"}), 400

    # # Update artist statistics
    artist = ArtistStats.query.filter_by(artist_name=artist_name).first()
    if artist:
        artist.listen_count += 1
    else:
        artist = ArtistStats(artist_name=artist_name, listen_count=1)
        db.session.add(artist)

    # Update song statistics
    song = SongStats.query.filter_by(song_title=song_title, artist_name=artist_name).first()
    if song:
        song.listen_count += 1
    else:
        song = SongStats(song_title=song_title, artist_name=artist_name, listen_count=1)
        db.session.add(song)

    # Save changes
    db.session.commit()

    return jsonify({"message": "Playback registered successfully"}), 200

@app.route('/api/top_artists', methods=['GET'])
def top_artists():
    top_artists = ArtistStats.query.order_by(ArtistStats.listen_count.desc()).limit(10).all()
    return jsonify([{"artist_name": a.artist_name, "listen_count": a.listen_count} for a in top_artists])

@app.route('/api/top_songs', methods=['GET'])
def top_songs():
    top_songs = SongStats.query.order_by(SongStats.listen_count.desc()).limit(10).all()
    return jsonify([{"song_title": s.song_title, "artist_name": s.artist_name, "listen_count": s.listen_count} for s in top_songs])

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # tables are created if they don't exist
    app.run(debug=True, host="0.0.0.0")
