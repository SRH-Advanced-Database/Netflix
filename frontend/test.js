import React, { useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const redisHost = 'redis-17416.c17.us-east-1-4.ec2.cloud.redislabs.com';
      const redisPort = 17416;
      const redisPassword = 'L9iS5ebZDi1l8DA18pXA15du5laALhN8';
      const apiKey = '293c1376f1117547a0a3989a61d3a0aa';

      try {
        const popularResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const upcomingResponse = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
        const trendingTVShowResponse = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`);
        const airingTodayResponse = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`);
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/385687/videos?api_key=${apiKey}`);

        // Save the responses to Redis or perform any other desired operations
        saveToRedis(popularResponse, 'popular_movies');
        saveToRedis(upcomingResponse, 'upcoming_movies');
        saveToRedis(trendingTVShowResponse, 'trending_tvshow');
        saveToRedis(airingTodayResponse, 'Airing Today');

        console.log(movieResponse.data); // Output the response to the console
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  const saveToRedis = (data, fileName) => {
    const jsonObject = JSON.stringify(data.data, null, 4);
    // Save the jsonObject to Redis or perform any other desired operations
    // ...
  };

  return (
    <div>
      fss
    </div>
  );
};

export default MyComponent;
