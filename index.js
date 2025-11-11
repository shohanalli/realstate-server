const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

// user real_state_db
// pass  mDEYjmNdjgd0CaJ7
//mongodb
const uri = "mongodb+srv://real_state_db:mDEYjmNdjgd0CaJ7@cluster0.11tuu0x.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('real state server is running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})