import axios from 'axios';

const API_URL = 'https://api.opendota.com/api';

export const fetchLiveMatches = async () => {
  const response = await axios.get(`${API_URL}/live`);
  return response.data;
};

export const fetchUpcomingMatches = async () => {

    
  // OpenDota API doesn't have a direct endpoint for upcoming matches,
  // You might need to use tournament schedules or another approach.
};
