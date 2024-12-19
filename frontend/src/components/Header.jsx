import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim()) {
      setIsLoading(true);
      await onSearch(query);
      setIsLoading(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        boxShadow: 1,
      }}
    >
      <Box sx={{ width: "80%", mx: "auto" }}>
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            px: 0,
          }}
        >
          {/* Deezer Logo */}
          <Box display="flex" alignItems="center">
            <img
                src="/images/deezer_logo.png"
                style={{ height: "150px" }}
                alt="Deezer Logo"
            />
            </Box>

          {/* Search bar with form */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              px: 1,
              maxWidth: 1000,
              width: "100%",
              justifySelf: "center"
            }}
          >
            <IconButton type="submit">
              {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
            </IconButton>
            <InputBase
              placeholder="Search artists"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ flex: 1, ml: 1 }}
            />
          </Box>

          <Avatar
            alt="Profile"
            src="https://randomuser.me/api/portraits/men/60.jpg"
            sx={{ width: 40, height: 40 }}
          />
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
