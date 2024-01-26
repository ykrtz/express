const express = require('express');
const MongoClient = require('mongodb').MongoClient;
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
});
