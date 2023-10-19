const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
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
    let cartCollection = client.db('ProductDB').collection('MyCart')

    /*Load data Operatons for Product*/
    app.get('/product', async (req, res) => {
      let cursor = productCollection.find()
      let result = await cursor.toArray()
      res.send(result);
    })


    /*Insert Operatons for Product*/
    app.post('/product', async (req, res) => {
      let newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })

    /*Get Data Operation for Single Brands*/
    // Get data from Apple
    app.get('/product/apple', async (req, res) => {
      const query = { "brand": "apple" };
      let cursor = productCollection.find(query)
      let result = await cursor.toArray()
      res.send(result);
    })
    // Get data from Google
    app.get('/product/google', async (req, res) => {
      const query = { "brand": "google" };
      let cursor = productCollection.find(query)
      let result = await cursor.toArray()
      res.send(result);
    })
    // Get data from samsung
    app.get('/product/samsung', async (req, res) => {
      const query = { "brand": "samsung" };
      let cursor = productCollection.find(query)
      let result = await cursor.toArray()
      res.send(result);
    })
    // Get data from microsoft
    app.get('/product/microsoft', async (req, res) => {
      const query = { "brand": "microsoft" };
      let cursor = productCollection.find(query)
      let result = await cursor.toArray()
      res.send(result);
    })
    // Get data from oneplus
    app.get('/product/oneplus', async (req, res) => {
      const query = { "brand": "oneplus" };
      let cursor = productCollection.find(query)
      let result = await cursor.toArray()
      res.send(result);
    })
    // Get data from intel
    app.get('/product/intel', async (req, res) => {
      const query = { "brand": "intel" };
      let cursor = productCollection.find(query)
      let result = await cursor.toArray()
      res.send(result);
    })

    /*Update Operation */
    app.get('/product/:id', async (req, res) => {
      let id = req.params.id;
      let query = { _id: new ObjectId(id) }
      let result = await productCollection.findOne(query)
      res.send(result)
    })
    app.put('/product/:id', async (req, res) => {
      let id = req.params.id;
      let query = { _id: new ObjectId(id) }
      const options = { upsert: true };
      let updatedProduct = req.body;
      let product = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          details: updatedProduct.details,
          rating: updatedProduct.rating,
          img: updatedProduct.img
        }
      }
      const result = await productCollection.updateOne(query, product, options);
      res.send(result);
    })

    /*Insert Operatons for My cart*/
    app.post('/cart', async (req, res) => {
      let newCart = req.body;
      const result = await cartCollection.insertOne(newCart);
      res.send(result);
    })
    /*Load data Operatons for cart*/
    app.get('/cart', async (req, res) => {
      let cursor = cartCollection.find()
      let result = await cursor.toArray()
      res.send(result); 
    })

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