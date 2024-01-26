const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

const mongoUri = 'mongodb+srv://yannickkurtzg:Yannick1996!@cluster0.00rei2t.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB', err);
    return;
  }
  const collection = client.db("Dexscreener").collection("Addresses");

  app.post('/api/saveToken', async (req, res) => {
    const baseTokenAddress = req.body.baseTokenAddress;

    collection.insertOne({ baseTokenAddress, metadata }, (err, result) => {
      if (err) {
        res.status(500).send('Error saving to database');
        return;
      }
      res.status(200).send('Token saved successfully with metadata');
    });
});
  


});
