const express = require("express");
const app = express();
const axios = require("axios");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const PORT = 3000;

app.use(cors());

// hit the external api and save in mongodb
app.get("/trending_movies", async (req, res) => {
  try {
    // Hit the API and retrieve the data
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=293c1376f1117547a0a3989a61d3a0aa"
    );
    data = [response.data];
    // console.log(response.data);
    // Print the data
    // console.log(response.data);
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("trending_movies");
    const result = await collection.insertMany(data);

    client.close();

    console.log("Data saved to MongoDB:", result);

    res.json({ message: "Data saved to MongoDB" });

    res.json(response.data);
    // const query = {};

    // const resultt = await collection.find(query).toArray();
    // console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/toprated_movies", async (req, res) => {
  try {
    // Hit the API and retrieve the data
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=293c1376f1117547a0a3989a61d3a0aa"
    );
    data = [response.data];
    // console.log(response.data);
    // Print the data
    // console.log(response.data);
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("toprated_movies");
    const result = await collection.insertMany(data);

    client.close();

    console.log("Data saved to MongoDB:", result);

    res.json({ message: "Data saved to MongoDB" });

    res.json(response.data);
    // const query = {};

    // const resultt = await collection.find(query).toArray();
    // console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//retrieve data from mongodb
app.get("/get_trending_movies", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("trending_movies");

    const result = await collection.find({}).toArray();
    //   console.log(result);

    client.close();

    console.log("Data retrieved from MongoDB");

    res.json({ result });
    const query = {};

    const resultt = await collection.find(query).toArray();
    //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get_trending_movies", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("trending_movies");

    const result = await collection.find({}).toArray();
    //   console.log(result);

    client.close();

    console.log("Data retrieved from MongoDB");

    res.json({ result });
    const query = {};

    const resultt = await collection.find(query).toArray();
    //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get_trending_movies", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("trending_movies");

    const result = await collection.find({}).toArray();
    //   console.log(result);

    client.close();

    console.log("Data retrieved from MongoDB");

    res.json({ result });
    const query = {};

    const resultt = await collection.find(query).toArray();
    //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get_toprated_movies", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("toprated_movies");

    const result = await collection.find({}).toArray();
    //   console.log(result);

    client.close();

    console.log("Data retrieved from MongoDB");

    res.json({ result });
    const query = {};

    const resultt = await collection.find(query).toArray();
    //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get_box_office", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("box_office");

    const result = await collection.find({}).toArray();
    //   console.log(result);

    client.close();

    console.log("Data retrieved from MongoDB");

    res.json({ result });
  
    //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.get("/get_reddit_comments", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("reddit_comments");

    const result = await collection.find({}).toArray();
    //   console.log(result);

    client.close();

    console.log("Data retrieved from MongoDB");

    res.json({ result });
  
    //   console.log(resultt)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
