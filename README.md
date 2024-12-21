# Micro Flask (Python) and React Full-Stack Application with Docker

This project is a full-stack application that combines a micro Flask backend (Python) and a React frontend, running in Docker containers. The backend tracks artist and song playback statistics using an SQLite database, which is created automatically upon deployment. The frontend provides a user interface for interacting with the backend API.

---

## Features

### **Backend**
- Built with Flask to handle song and artist playback statistics.
- Tracks the number of plays for each artist and song.
- Provides the following endpoints:
  - **Search songs**: Retrieve songs via the Deezer API.
  - **Register playback**: Record a song and artist playback.
  - **Fetch top data**: Retrieve top artists and songs based on playback statistics.
- Automatically creates the SQLite database (`stats.db`) upon deployment.

### **Frontend**
- Developed with React and Node.js.
- Displays playback statistics and integrates seamlessly with the backend API.

### **Dockerized Deployment**
- Fully containerized using Docker and Docker Compose.
- Separate containers for the backend and frontend services.
- Simple and fast setup with minimal configuration.

---

## Requirements

- **Docker** and **Docker Compose** must be installed on your system.

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Create the `.env` Files

Use the provided `.env.example` files to create `.env` files:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Important:** Replace the placeholder `RAPIDAPI_KEY` in `backend/.env` with a valid RapidAPI key.

### 3. Run the Application

Start the application using Docker Compose:
```bash
docker-compose up --build
```

This will start two services:
- **Backend**: Available at [http://localhost:5000](http://localhost:5000)
- **Frontend**: Available at [http://localhost:3000](http://localhost:3000)

### 4. Access the Application

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to use the React frontend.
- Test the backend API directly at [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### **Backend API Routes**

#### 1. **Search Songs**
**GET** `/api/search?q=<query>`

Search for songs using the Deezer API.

#### 2. **Register Playback**
**POST** `/api/register_play`

Registers a playback for a song and artist.

**Request Body:**
```json
{
  "song_title": "Song Title",
  "artist_name": "Artist Name"
}
```

#### 3. **Fetch Top Artists**
**GET** `/api/top_artists`

Retrieve the top 10 artists based on playback statistics.

#### 4. **Fetch Top Songs**
**GET** `/api/top_songs`

Retrieve the top 10 songs based on playback statistics.

---

## Project Structure

```
├── backend
│   ├── app.py             # Main Flask application
│   ├── models.py          # Database models
│   ├── requirements.txt   # Python dependencies
│   ├── .env.example       # Backend environment variables example
│   └── Dockerfile         # Dockerfile for backend
├── frontend
│   ├── src/               # React source files
│   ├── public/            # Static files
│   ├── package.json       # Node.js dependencies
│   ├── nginx.conf         # Nginx configuration
│   ├── .env.example       # Frontend environment variables example
│   └── Dockerfile         # Dockerfile for frontend
└── docker-compose.yml      # Docker Compose configuration
```

---

## Notes

- **Database**: The SQLite database (`stats.db`) is created automatically inside the backend container and persists playback statistics.
- **Nginx**: The frontend is served via Nginx for a production-ready deployment.
- **Docker Network**: Both backend and frontend containers communicate using a custom Docker network (`app-network`).

---

## Troubleshooting

- Ensure that Docker and Docker Compose are installed and running.
- Replace the placeholder `RAPIDAPI_KEY` in the backend `.env` file with a valid key.
- Check for errors in the logs using:
  ```bash
  docker-compose logs -f
  ```

---
