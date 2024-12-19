import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { q: query },
    });
    return response.data.data.filter((item) => item.type === 'track');
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    return [];
  }
};

export const registerPlay = async (songTitle, artistName) => {
    try {
      const response = await axios.post(`${BASE_URL}/register_play`, {
        song_title: songTitle,
        artist_name: artistName,
      });
      console.log('Playback registered:', response.data);
    } catch (error) {
      console.error('Error registering playback:', error);
    }
  };