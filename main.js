const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const web3 = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const { exec } = require('child_process');

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

const mongoUri = 'mongodb+srv://yannickkurtzg:Yannick1996!@cluster0.00rei2t.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB', err);
    return;
  }
  const collection = client.db("Dexscreener").collection("Addresses");

  app.post('/api/saveToken', async (req, res) => {
    const baseTokenAddress = req.body.baseTokenAddress;

    collection.findOne({ baseTokenAddress: baseTokenAddress }, async (err, result) => {
      if (err) {
        res.status(500).send('Error querying database');
        return;
      }
      if (result) {
        res.status(200).send('Token already saved');
      } else {
        exec(`node index.js ${baseTokenAddress}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing script: ${error}`);
            return res.status(500).send('Error fetching metadata');
          }

          let metadata;
        
            metadata = stdout;
        

          // Save token with metadata
          collection.insertOne({ baseTokenAddress, metadata }, (err, result) => {
            if (err) {
              res.status(500).send('Error saving to database');
              return;
            }
            res.status(200).send('Token saved successfully with metadata');
          });
        });
      }
    });
});
  

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
