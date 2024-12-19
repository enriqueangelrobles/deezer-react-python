import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Player from './components/Player';
import SongGrid from './components/SongGrid';
import { searchTracks } from './api';
import Header from './components/Header';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (query) => {
    if (query.trim()) {
      setIsLoading(true);
      const results = await searchTracks(query);
      setTracks(results);
      setSearchTerm(query);
      setIsLoading(false);
      setNoResults(results.length === 0);
    }
  };

  return (
    <Box sx={{ height: '100vh', overflow: 'auto' }}>
      {/* Header */}
      <Header onSearch={handleSearch} noResults={noResults} />

      {/* Main content */}
      <Box sx={{ width: "75%", mx: "auto", pt: "180px" }}>
        {tracks.length > 0 && !noResults && (
          <Player currentTrack={currentTrack} />
        )}
        <Box mt={4}>
          {tracks.length > 0 && (
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Search results for: <span style={{ fontWeight: 400 }}>{searchTerm}</span>
            </Typography>
          )}
          <SongGrid tracks={tracks} onSelect={(track) => setCurrentTrack(track)} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
