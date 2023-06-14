const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb+srv://rahul:Qwerty123@netflix.schcbhv.mongodb.net/';
const dbName = 'netflix';
const collectionName = 'movies';

// Fetch data from MongoDB
app.get('/movies', (req, res) => {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to MongoDB');
      return;
    }
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    collection.find().toArray((error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching data from MongoDB');
        return;
      }
      
      res.json(result);
      client.close();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
