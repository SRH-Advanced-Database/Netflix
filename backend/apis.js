const express = require('express');
const app = express();
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const redis = require('ioredis');
const client = redis.createClient({
  host: 'redis-17416.c17.us-east-1-4.ec2.cloud.redislabs.com',
  port: 17416,
  password: 'L9iS5ebZDi1l8DA18pXA15du5laALhN8'
});




const PORT = 3000;

app.use(cors());

// hit the external api and save in mongodb
app.get('/trending_movies', async (req, res) => {
  try {
    // Hit the API and retrieve the data
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=293c1376f1117547a0a3989a61d3a0aa');
    data = [response.data]


    const client = await MongoClient.connect('mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/');
    const db = client.db('netflix');
    const collection = db.collection('trending_movies');
    const result = await collection.insertMany(data);

    client.close();

    res.json({ message: 'Data saved to MongoDB' });
    res.json(response.data);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
    
  }
});


// hit the external api and save in mongodb
app.get('/toprated_movies', async (req, res) => {
    try {
      // Hit the API and retrieve the data
      const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=293c1376f1117547a0a3989a61d3a0aa');
      data = [response.data]
     
      const client = await MongoClient.connect('mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/');
      const db = client.db('netflix');
      const collection = db.collection('toprated_movies');
      const result = await collection.insertMany(data);
  
      client.close();
  
      console.log('Data saved to MongoDB:', result);
  
      res.json({ message: 'Data saved to MongoDB' });
  
      res.json(response.data);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
      
    }
  });





//retrieve data from mongodb
app.get('/get_trending_movies', async (req, res) => {
    try {
      const client = await MongoClient.connect('mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/');
      const db = client.db('netflix');
      const collection = db.collection('trending_movies');
        
      const result = await collection.find({}).toArray();
      data = result[0]
      console.log(data)
  
      client.close();
  
      console.log('Data retrieved from MongoDB');
  
      res.json({ data });
    //   console.log(resultt)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
      
    }
  });

  //saving to redis from mongo
  app.get('/save_trending_to_redis', async (req, res) => {
    try {
      // Hit the API and retrieve the data from mongodb
      const response = await axios.get('http://localhost:3000/get_trending_movies');

      
      
      data = [response.data]
      d = data[0]
      // console.log(data)
      saveToRedis(d, 'Trending Movies');
    
      function saveToRedis(data, fileName) {
        const json = JSON.stringify(data.data, null, 4);
        client.set(fileName, json, (error, result) => {
          if (error) {
            console.error(`Error saving ${fileName} to Redis:`, error);
          } else {
            console.log(`${fileName} saved to Redis successfully.`);
          }
        })};
  
      // console.log('Data saved to MongoDB:', d);
  
      res.json({ message: 'Data saved to Redis' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
      
    }
  });


  
//fetching data from redis for trending movies
  app.get('/get_trending_from_redis', async (req, res) => {
    try {
      // Fetch data from Redis
      const data = await client.get('Trending Movies');

      if (data) {
        // Data exists in Redis
        res.json(JSON.parse(data));
      } else {
        // Data does not exist in Redis, handle accordingly
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching data from Redis:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });








  //retrieve data from mongodb
app.get('/get_toprated_movies', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/');
    const db = client.db('netflix');
    const collection = db.collection('toprated_movies');
      
    const result = await collection.find({}).toArray();
    data = result[0]
    // console.log(data)

    client.close();

    console.log('Data retrieved from MongoDB');

    res.json({ data });
  //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
    
  }
});


//saving to redis from mongo
app.get('/save_toprated_to_redis', async (req, res) => {
  try {
    // Hit the API and retrieve the data from mongodb
    const response = await axios.get('http://localhost:3000/get_toprated_movies');

    
    
    data = [response.data]
    d = data[0]
    // console.log(data)
    saveToRedis(d, 'Top Rated');
  
    function saveToRedis(data, fileName) {
      const json = JSON.stringify(data.data, null, 4);
      client.set(fileName, json, (error, result) => {
        if (error) {
          console.error(`Error saving ${fileName} to Redis:`, error);
        } else {
          console.log(`${fileName} saved to Redis successfully.`);
        }
      })};

    // console.log('Data saved to MongoDB:', d);

    res.json({ message: 'Data saved to Redis' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
    
  }
});

//fetching data from redis for trending movies
app.get('/get_toprated_from_redis', async (req, res) => {
  try {
    // Fetch data from Redis
    const data = await client.get('Top Rated');

    if (data) {
      // Data exists in Redis
      res.json(JSON.parse(data));
    } else {
      // Data does not exist in Redis, handle accordingly
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    // Handle error
    console.error('Error fetching data from Redis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// sorting query
app.get('/sort_trending_byrating', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/');
    const db = client.db('netflix');
    const collection = db.collection('trending_movies');
    const pipeline = [
      { $unwind: "$results" },
      { $sort: { "results.vote_average": 1 } },
      { $group: {
          _id: "$_id",
          results: { $push: "$results" }
        }
      }];
    
    // Perform aggregation
    const sort_rating = await collection.aggregate(pipeline).toArray();
    sortbyrating = sort_rating[0]
    // console.log(sort_rating[0])
    // Close the MongoDB connection
    client.close();
    // Send the result as JSON
    res.json(sortbyrating);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


//saving sorted trending movies to redis 
app.get('/save_sorted_to_redis', async (req, res) => {
  try {
    // Hit the API and retrieve the data from mongodb
    const response = await axios.get('http://localhost:3000/sort_trending_byrating');

    
    
    data = [response.data]
    // console.log(data)
    d = data[0]
    console.log(d)
    saveToRedis(d, 'top rated trending movies');
  
    function saveToRedis(data, fileName) {
      const json = JSON.stringify(data.data, null, 4);
      client.set(fileName, json, (error, result) => {
        if (error) {
          console.error(`Error saving ${fileName} to Redis:`, error);
        } else {
          console.log(`${fileName} saved to Redis successfully.`);
        }
      })};

    // console.log('Data saved to MongoDB:', d);

    res.json({ message: 'Data saved to Redis' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
    
  }
});



//saving to redis from mongo
app.get('/save_upcoming_to_redis', async (req, res) => {
  try {
    // Hit the API and retrieve the data from mongodb
    const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=293c1376f1117547a0a3989a61d3a0aa');

    
    
    data = [response.data]
    d = data[0]

    // console.log(d)
    saveToRedis(d, 'Upcoming Movie');
  
    function saveToRedis(d, fileName) {
      console.log(d)
      const json = JSON.stringify(data.data, null, 4);
      client.set(fileName, json, (error, result) => {
        if (error) {
          console.error(`Error saving ${fileName} to Redis:`, error);
        } else {
          console.log(`${fileName} saved to Redis successfully.`);
        }
      })};

    // console.log('Data saved to MongoDB:', d);

    res.json({ message: d });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
    
  }
});


  








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
