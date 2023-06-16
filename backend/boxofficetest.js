const express = require("express");
const app = express();
const axios = require("axios");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const PORT = 3000;

app.use(cors());

// hit the external api and save in mongodb
app.get("/get_movie_box_officec", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/"
    );
    const db = client.db("netflix");
    const collection = db.collection("movie_box_office");

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
