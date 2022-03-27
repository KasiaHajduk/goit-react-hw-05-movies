//import axios from 'axios';

const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

const fetchTrending = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};

const api = {
  fetchTrending,
};

export default api;



// const fetchTrending = async () => {
//   const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`);
//   return response.data;
// };

// const trendingApi = {
//   fetchTrending,
// };

// export default trendingApi;