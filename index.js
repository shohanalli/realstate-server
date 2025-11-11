const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

//mongodb


const uri = "mongodb+srv://realstate-db:c02ew2eZIp0bUEkm@cluster0.11tuu0x.mongodb.net/?appName=Cluster0";
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
    const db = client.db('realstate_db')
    const mainCollection = db.collection('products')
    const myCollection = db.collection('my_products')
// get all product
app.get('/products', async (req,res)=>{
    const result = await mainCollection.find().toArray()
    res.send(result)
})
// add property insert one
app.post('/my-products', async(req,res)=>{
 const data = req.body
 const result = await myCollection.insertOne(data)
 res.send({
    success:true,
    result
 })
})
// my property data api link
app.get('/my-products', async(req,res)=>{
  const result = await myCollection.find().toArray()
    res.send(result)
})
//get data for product details in maincollection
app.get('/products/:id', async (req, res)=>{
    const {id} = req.params
    const result = await mainCollection.findOne({_id: id})
    res.send({
        success : true,
        result
    })
})
//get data for product details in my-collection
app.get('/my-products/:id', async (req, res)=>{
    const {id} = req.params
    const result = await myCollection.findOne({_id: new ObjectId(id)})
    res.send({
        success : true,
        result
    })
})






    await client.db("admin").command({ ping: 1 });
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