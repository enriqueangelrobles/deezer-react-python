import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { registerPlay } from "../api";


const Player = ({ currentTrack }) => {
  if (!currentTrack || !currentTrack.album) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const duration = currentTrack?.duration || 0;
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);

  // Reset status when change track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); 
      setPosition(0);
    }
    setIsPlaying(false);

    if (currentTrack) {
        registerPlay(currentTrack.title, currentTrack.artist.name);
      }

    if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPosition(audioRef.current.currentTime);
    }
  };

  const handleSeek = (event, newValue) => {
    setPosition(newValue);
  };

  const handleSeekCommitted = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        mx: "auto",
        mt: 4,
      }}
    >
      {/* Album image */}
      <Box
        component="img"
        src={currentTrack.album.cover_small}
        alt={currentTrack.title}
        sx={{
          width: 60,
          height: 60,
          borderRadius: 1,
          objectFit: "cover",
        }}
      />

      {/* Track information and progress bar */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {currentTrack.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "grey.600", mb: 1 }}>
          {currentTrack.artist.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Play/Pause Button */}
          <IconButton
            onClick={handlePlayPause}
            sx={{
              bgcolor: "white",
              border: "2px solid #f5f5f5",
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 40,
              height: 40,
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          {/* Barra de progreso */}
          <Box sx={{ flex: 1 }}>
            <Slider
              value={position}
              onChange={handleSeek}
              onChangeCommitted={handleSeekCommitted}
              min={0}
              max={duration}
              sx={{
                color: "#FF7043", // naranja
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: "-6px" }}>
              <Typography variant="caption">{formatTime(position)}</Typography>
              <Typography variant="caption">{formatTime(duration)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Volume control */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 100 }}>
        <VolumeUpIcon sx={{ color: "grey.700" }} />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          sx={{
            color: "#FF7043",
          }}
        />
      </Box>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </Box>
  );
};

export default Player;
