import React from "react";
import { Box, Typography } from "@mui/material";

const SongCard = ({ track, onSelect }) => {
  return (
    <Box
      onClick={() => onSelect(track)}
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        minWidth: 338, 
        minHeight: 338,
        "&:hover": {
          transform: "scale(1.02)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      {/* Full image */}
      <img
        src={track.album.cover_medium}
        alt={track.title}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />

      {/* Gradient and text overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0))",
          color: "white",
          height: "30%",
        }}
      >
        <Typography variant="h6" noWrap>
          {track.title}
        </Typography>
        <Typography variant="subtitle2" noWrap>
          {track.artist.name}
        </Typography>
        <Typography variant="caption" noWrap>
          {track.album.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default SongCard;
