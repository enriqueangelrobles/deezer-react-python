import React from "react";
import Grid from '@mui/material/Grid2';
import SongCard from "./SongCard";

const SongGrid = ({ tracks, onSelect }) => (
    <Grid
      container
      spacing={3}
      justifyContent="flex-start"
      alignItems="center"
    >
      {tracks.map((track) => (
        <Grid xs={12} sm={6} md={4} key={track.id}>
          <SongCard track={track} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
  );
  
  export default SongGrid;
