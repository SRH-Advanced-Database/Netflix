const express = require('express');
const redis = require('redis');
const axios = require('axios');

const app = express();
const client = redis.createClient({
  host: 'redis-17416.c17.us-east-1-4.ec2.cloud.redislabs.com',
  port: 17416,
  password: 'L9iS5ebZDi1l8DA18pXA15du5laALhN8'
});

const movieId = 385687;
const apiKey = '293c1376f1117547a0a3989a61d3a0aa';

axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => {
    saveToRedis(response, 'opular_movies');
  })
  .catch(error => {
    console.error('Error fetching popular movies:', error);
  });

axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
  .then(response => {
    saveToRedis(response, 'upcoming_movies');
  })
  .catch(error => {
    console.error('Error fetching upcoming movies:', error);
  });

axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`)
  .then(response => {
    saveToRedis(response, 'trending_tvshow');
  })
  .catch(error => {
    console.error('Error fetching trending TV shows:', error);
  });

axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`)
  .then(response => {
    saveToRedis(response, 'Airing Today');
  })
  .catch(error => {
    console.error('Error fetching airing today TV shows:', error);
  });

axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching movie videos:', error);
  });

function saveToRedis(data, fileName) {
  const json = JSON.stringify(data.data, null, 4);
  client.set(fileName, json, (error, result) => {
    if (error) {
      console.error(`Error saving ${fileName} to Redis:`, error);
    } else {
      console.log(`${fileName} saved to Redis successfully.`);
    }
  });
}

app.listen(5000, () => {
    console.log("server started on port 5000");
  });
