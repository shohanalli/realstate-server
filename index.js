const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require("dotenv").config()
const port = 3000
app.use(cors())
app.use(express.json())

//mongodb
const uri = mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.11tuu0x.mongodb.net/realstate?retryWrites=true&w=majority&appName=Cluster0;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.11tuu0x.mongodb.net/?appName=Cluster0`;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function run() {
  try {
    // await client.connect();
    const db = client.db('realstate_db')
    const mainCollection = db.collection('products')
    const reviewCollection = db.collection('review')
// get all product
app.get('/products', async (req,res)=>{
    const result = await mainCollection.find().limit(12).sort({ _id: -1 }).toArray()
    res.send(result)
})
// add property insert one
app.post('/products', async(req,res)=>{
 const data = req.body
 const result = await mainCollection.insertOne(data)
 res.send({
    success:true,
    result
 })
})
 //add review data in databes 
app.post('/review', async(req,res)=>{
  const data = req.body
  const result = await reviewCollection.insertOne(data)
  res.send({
    result
  })
})
//get review data in databes
app.get('/review', async(req, res)=>{
  const email = req.query.email
  const result = await reviewCollection.find({email: email}).toArray()
    res.send(result)
})

// my property data api link
app.get('/my-products', async(req,res)=>{
  const email = req.query.email
  const result = await mainCollection.find({email: email}).toArray()
    res.send(result)
})
//update data in my collection
app.put('/products/:id', async(req,res)=>{
  const {id} = req.params.id
 const data = req.body
  const objectId = new ObjectId(id)
const fillter = {_id: objectId}
const update = {
  $set: data
}
const result = await mainCollection.updateOne(fillter, update)
 res.send({
    success:true,
    result
 })
})
//delete data in my collection
app.delete('/products/:id', async(req,res)=>{
  const id = req.params.id
const result = await mainCollection.deleteOne({_id: new ObjectId(id)})
 res.send({
    success:true,
    result
 })
})
//get data for product details in maincollection
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    query = { _id: new ObjectId(id) };
  } else {
    query = { _id: id };
  }
  const result = await mainCollection.findOne(query);

  res.send({ result });
});
//homepage short showing data 
app.get('/sortproducts', async (req, res) => {
  const result = await mainCollection.find().limit(6).sort({ _id: -1 }).toArray();
  res.send(result);
});







    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('real state server is running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



