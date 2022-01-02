const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2qxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();

    const database = client.db("trainSheba");
    const destinationsCollection = database.collection("destinations");
    // const ordersCollection = database.collection("orders");
    // const reviewCollection = database.collection("review");
    // const usersCollection = database.collection("users");


    const docs = [
      { fromDistrict: "Dhaka", fromStation: "Airport, Bimanbondor", toDistrict: "Kumilla", toStation: "Kumilla, Kandirpar", travelTime:"Daily", price: "400"},
      { name: "lettuce", healthy: true },
      { name: "donut", healthy: false }
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    // const result = await foods.insertMany(docs, options);



    // // // get api
    // app.get("/product", async (req, res)=>{

    //     const cursor = productCollection.find({});
    //     const services = await cursor.toArray();
    //     res.send(services)
    // })

    // // // get api
    // app.get("/review", async (req, res)=>{

    //     const cursor = reviewCollection.find({});
    //     const services = await cursor.toArray();
    //     res.send(services)
    // })

    // // // get api
    // app.get("/orders", async (req, res)=>{

    //     const cursor = ordersCollection.find({});
    //     const services = await cursor.toArray();
    //     res.send(services)
    // })
    
    // // // single service get 
    // app.get("/product/:id", async (req, res)=>{

    //     const id = req.params.id;
    //     const query = {_id: ObjectId(id)}

    //     const result = await productCollection.findOne(query);
    //     res.json(result)
    // })

    // // //post api
    // app.post("/product", async (req, res)=>{
    //     const product = req.body;
    //     const result = await productCollection.insertOne(product);
    //     res.json(result)
    // })

    // app.post("/review", async (req, res)=>{
    //     const product = req.body;
    //     const result = await reviewCollection.insertOne(product);
    //     res.json(result)
    // })

    // app.post("/orders", async (req, res)=>{
    //     const product = req.body;
    //     const result = await ordersCollection.insertOne(product);
    //     res.json(result)
    // })

    // //delete api
    // app.delete('/orders/:id', async (req, res)=>{
    //   const userid = req.params.id;
    //   const query = {_id: ObjectId(userid)};
    //   const result = await ordersCollection.deleteOne(query);

    //   res.json(result);

    // })

    // //delete api
    // app.delete('/product/:id', async (req, res)=>{
    //   const userid = req.params.id;
    //   const query = {_id: ObjectId(userid)};
    //   const result = await productCollection.deleteOne(query);

    //   res.json(result);

    // })

    // app.put("/orders/:id", async (req, res)=>{
    //   const id = req.params.id;
    //   const newBook = req.body;
    //   const filter = {_id: ObjectId(id)};
    //    const updateDoc = {
    //       $set: {
    //         panding: newBook.newOrderSt
    //       },
    //     };

    //     const result = await ordersCollection.updateOne(filter, updateDoc);
    //     res.json(result)
    //   })

    //   //storing the users to database [brand new users]
    //     app.post('/users', async (req, res) => {
    //         const user = req.body;
    //         const result = await usersCollection.insertOne(user);
    //         res.json(result);
    //     });

    //     //update and store the users [check if the user exists] for google login
    //     app.put('/users', async (req, res) => {
    //         const user = req.body;
    //         const filter = { email: user.email };
    //         const options = { upsert: true };
    //         const updateDoc = { $set: user };
    //         const result = await usersCollection.updateOne(filter, updateDoc, options);
    //         res.json(result);
    //     });

    //     //set the admin role 
    //     app.put('/users/admin', async (req, res) => {
    //         const user = req.body;
    //         const filter = { email: user.email };
    //         const updateDoc = { $set: { role: 'admin' } };
    //         const result = await usersCollection.updateOne(filter, updateDoc);
    //         res.json(result);
    //     });

    //     //checking the admin
    //     app.get('/users/:email', async (req, res) => {
    //         const email = req.params.email;
    //         const query = { email: email };
    //         const user = await usersCollection.findOne(query);
    //         res.json(user);
    //     });
  }
  finally{
    // await client.close();
  }
}

// run().catch(console.dir);

app.get("/", (req, res)=>{
    res.send("Responding from server site")
})

app.listen(port, ()=>{
    console.log(`lisiting port on ${port}`)
})