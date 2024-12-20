# Micro Flask (Python) and React Full-Stack Application with Docker

This project is a full-stack application that combines a micro Flask backend (Python) and a React frontend, running in Docker containers. The backend tracks artist and song playback statistics using an SQLite database, which is created automatically upon deployment. The frontend provides a user interface for interacting with the backend API.

## Features

- **Backend**: A Flask API to handle song and artist playback statistics.
  - Tracks the number of plays for each artist and song.
  - Supports endpoints for searching songs, registering playbacks, and fetching top artists and songs.
  - The database (`stats.db`) is created automatically when the backend is deployed.
  
- **Frontend**: A React-based user interface built with Node.js.
  - Displays playback statistics and integrates with the backend API.

- **Dockerized Deployment**:
  - Uses Docker Compose to manage separate containers for the frontend and backend.
  - Simple setup with minimal configuration required.

## Requirements

- Docker and Docker Compose installed on your system.

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository

## 2. Create the .env File

# A .env.example file is provided in both the backend and frontend folders. Create a .env file based on them by running:
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

## 3. Run the Application

# Start the application with Docker Compose:
docker-compose up --build

The application will spin up two services:

Backend: Available at http://localhost:5000
Frontend: Available at http://localhost:3000


##  4. Access the Application
Open your browser and navigate to http://localhost:3000 to view the React frontend.
Use the API endpoints at http://localhost:5000 for testing or integration.

API Endpoints
Backend API Routes
Search Songs:
GET /api/search?q=<query>
Search for songs using the Deezer API.

Register Playback:
POST /api/register_play
Register a playback for a song and artist.

Request body:

json
{
  "song_title": "Song Title",
  "artist_name": "Artist Name"
}

Fetch Top Artists:
GET /api/top_artists
Fetch the top 10 artists based on playback statistics.

Fetch Top Songs:
GET /api/top_songs
Fetch the top 10 songs based on playback statistics.

Project Structure


├── backend
│   ├── app.py             # Main Flask application
│   ├── models.py          # Database models
│   ├── requirements.txt   # Python dependencies
│   ├── .env.example       # Environment variable example
│   └── Dockerfile         # Dockerfile for backend
├── frontend
│   ├── src/               # React source files
│   ├── public/            # Static files
│   ├── package.json       # Node.js dependencies
│   ├── nginx.conf         # Nginx configuration
│   ├── .env.example       # Environment variable example
│   └── Dockerfile         # Dockerfile for frontend
└── docker-compose.yml      # Docker Compose configuration

Notes
Database: The SQLite database (stats.db) is automatically created in the backend container upon deployment. It persists playback statistics for songs and artists.
Nginx: The frontend is served using Nginx for production-ready deployment.
Docker Networks: Both containers are connected via a custom Docker network (app-network).