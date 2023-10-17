const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port =process.env.PORT || 5000
require('dotenv').config()

// Middlewire
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oglq0ui.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    let productCollection = client.db('ProductDB').collection("Products");

    app.post('/product', async(req,res) =>{
        let newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
      })

    //   Delete Operation
    //   app.delete('/coffee/:id', async(req,res) =>{
    //     let id = req.params.id;
    //     let quary = {_id: new ObjectId(id)}
    //     const result = await coffeeCollection.deleteOne(quary);
    //     res.send(result);
    //   })


    // Update Operation
    // app.get('/coffee', async(req,res) =>{
    //     let cursor = coffeeCollection.find()
    //     let result = await cursor.toArray()
    //     res.send(result);
    //   })
  
    //   app.get('/coffee/:id', async(req,res) =>{
    //     let id = req.params.id;
    //     let quary = {_id: new ObjectId(id)}
    //     const result = await coffeeCollection.findOne(quary);
    //     res.send(result);
    //   })
    //   app.put('/coffee/:id', async(req,res) =>{
    //     let id = req.params.id;
    //     let quary = {_id: new ObjectId(id)}
    //     const options = { upsert: true };
    //     let updatedCoffee = req.body;
    //     let coffee={
    //       $set:{
    //         name: updatedCoffee.name,
    //         chef: updatedCoffee.chef,
    //         supplier: updatedCoffee.supplier,
    //         category: updatedCoffee.category,
    //         taste: updatedCoffee.taste,
    //         details: updatedCoffee.details,
    //         photo: updatedCoffee.photo
    //       }
    //     }
    //     const result = await coffeeCollection.updateOne(quary, coffee, options);
    //     res.send(result);
    //   })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Brand-Shop Server is Running...')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})