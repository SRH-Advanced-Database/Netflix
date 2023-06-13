// // const express = require('express');
// // const redis = require('ioredis');
// // const axios = require('axios');

// // const app = express();
// // const client = redis.createClient({
// //   host: 'redis-17416.c17.us-east-1-4.ec2.cloud.redislabs.com',
// //   port: 17416,
// //   password: 'L9iS5ebZDi1l8DA18pXA15du5laALhN8'
// // });

// // const movieId = 385687;
// // const apiKey = '293c1376f1117547a0a3989a61d3a0aa';

// // axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
// //   .then(response => {
// //     saveToRedis(response, 'popular_movies');
// //   })
// //   .catch(error => {
// //     console.error('Error fetching popular movies:', error);
// //   });

// // axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
// //   .then(response => {
// //     saveToRedis(response, 'upcoming_movies');
// //   })
// //   .catch(error => {
// //     console.error('Error fetching upcoming movies:', error);
// //   });

// // axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`)
// //   .then(response => {
// //     saveToRedis(response, 'trending_tvshow');
// //   })
// //   .catch(error => {
// //     console.error('Error fetching trending TV shows:', error);
// //   });

// // axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`)
// //   .then(response => {
// //     saveToRedis(response, 'Airing Today');
// //   })
// //   .catch(error => {
// //     console.error('Error fetching airing today TV shows:', error);
// //   });

// // axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
// //   .then(response => {
// //     console.log(response.data);
// //   })
// //   .catch(error => {
// //     console.error('Error fetching movie videos:', error);
// //   });

// // function saveToRedis(data, fileName) {
// //   const json = JSON.stringify(data.data, null, 4);
// //   client.set(fileName, json, (error, result) => {
// //     if (error) {
// //       console.error(`Error saving ${fileName} to Redis:`, error);
// //     } else {
// //       console.log(`${fileName} saved to Redis successfully.`);
// //     }
// //   });
// // }

// const express = require('express');
// const Redis = require('ioredis');

// const app = express();
// const redis = new Redis({
//   host: 'redis-17416.c17.us-east-1-4.ec2.cloud.redislabs.com',
//   port: 17416,
//   password: 'L9iS5ebZDi1l8DA18pXA15du5laALhN8'
// });
// console.log("ds");
// app.get('/', async (req, res) => {
//   try {
//     const fileName = 'popular_movies';

//     const data = await redis.get(fileName);
//     console.log(data);

//     if (data !== null) {
//       const jsonData = data.toString('utf-8');
//       console.log(jsonData); // Print the fetched data
//       // Perform further processing or parsing on the dataa
//       res.send(jsonData);
//     } else {
//       res.send(`No data found for file '${fileName}' in Redis.`);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred.');
//   }
// });

// const port = 9000; // or any other port number you prefer
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
const express = require('express');
const redis = require('ioredis');

const app = express();
const client = redis.createClient({
  host: 'redis-17416.c17.us-east-1-4.ec2.cloud.redislabs.com',
  port: 17416,
  password: 'L9iS5ebZDi1l8DA18pXA15du5laALhN8'
});

// Fetch data from Redis
const fileName = 'popular_movies';
client.get(fileName, (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  if (data !== null) {
    const jsonData = data.toString('utf-8'); // Decode the data from bytes to a string
    // Perform further processing or parsing on the data
    console.log(jsonData);
  } else {
    console.log(`No data found for file '${fileName}' in Redis.`);
  }
});

app.listen(10000, () => {
  console.log('Server is running on port 3000');
});
