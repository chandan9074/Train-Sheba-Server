const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRET);

let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: false}));

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2qxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();

    const database = client.db("trainSheba");
    const trainsCollection = database.collection("trains");
    const letestDestinationsCollection = database.collection("letestDestinations");
    const letestNewsCollection = database.collection("news");
    const usersCollection = database.collection("users");
    const reviewCollection = database.collection("review");
    const trainTicketManageCollection = database.collection("trainTicketManage");
    const userTrainBookingsCollection = database.collection("userTrainBookings");

    // const ordersCollection = database.collection("orders");
    // const reviewCollection = database.collection("review");
    // const usersCollection = database.collection("users");

    //trains docs
    // const docs = [
    //   { classname: "Air Conditioned Class", fromDistrict: "Dhaka", fromStation: "Airport, Bimanbondor", toDistrict: "Kumilla", toStation: "Kumilla, Kandirpar", trainName:"Shuborno Express", sit:"60", availableSit:"60", araivelTime:"6.00pm", departureTime:"5.00am", travelTime:"Daily", available:false, price: "610"},
    //   { classname: "Shovon Chair", fromDistrict: "Dhaka", fromStation: "Airport, Bimanbondor", toDistrict: "Kumilla", toStation: "Kumilla, Kandirpar", trainName:"Shuborno Express", sit:"60", availableSit:"60", araivelTime:"6.00pm", departureTime:"5.00am", travelTime:"Daily", available:false, price: "310"},
    // ];
    // this option prevents additional documents from being inserted if one fails
    // const options = { ordered: true };
    // const result = await trainsCollection.insertMany(docs, options);

    //letest destination docs
    // const docs = [
    //   {img:"https://i.ibb.co/YXfBqXq/Dhaka-to-Chittagong-train-Schedule-and-Ticket-Price.jpg", formDistrict: "Dhaka", toDistrict: "Chittagone", fromStation: "Airport, Bimanbondor", toStation: "Chittagong, Railstation", travelTime: "Daily", price: "340", },
    //   {img:"https://i.ibb.co/mNJ970k/Dhaka-to-Sylhet-Train-1200x900.png", formDistrict: "Dhaka", toDistrict: "Sylhet", fromStation: "Airport, Bimanbondor", toStation: "Sylhet, Railstation", travelTime: "Daily", price: "650", }
    // ]

    //letest news
    // const docs = [
    //   {img: "https://i.ibb.co/m8WF29Y/train-sufferring-0.jpg", title: "New time for train announced after schedule collapses", created: "Admin", postTime:"9.35", des:"Bangladesh Railway has rescheduled for today the departure time of several trains from Dhaka’s Kamalapur Railway Station amid immense sufferings of holidaymakers due to schedule collapse ahead of Eid-ul-Azha.The home-goers who are waiting at the station for hours do not know when their trains will leave Dhaka and reach their destinations"},
    //   {img: "https://i.ibb.co/BqRVQZJ/maitree-0.jpg", title: "Maitree to run 6 days a week", created: "Tuhin Shubhra Adhikary", postTime:"9.40", des:"Bangladesh Railway has started working to increase the number of trips between Bangladesh and India.Once the proceedings are completed, Maitree Express, on Dhaka-Kolkata route, would run six days a week instead of four and Bandhan Express, on Khulna-Kolkata route, would run three days a week instead of one."},
      
    // ]
    const options = { ordered: true };
    // const result = await letestNewsCollection.insertMany(docs, options);

    app.get("/letestdestinations", async (req, res)=>{
      const cursor = letestDestinationsCollection.find({});
      const destinations = await cursor.toArray();
      res.send(destinations);
    })
    app.post("/letestdestinations", async (req, res)=>{
        const des = req.body;
        const result = await letestDestinationsCollection.insertOne(des);
        res.json(result)
    })

    app.delete('/letestdestinations/:id', async (req, res)=>{
      const userid = req.params.id;
      const query = {_id: ObjectId(userid)};
      const result = await letestDestinationsCollection.deleteOne(query);
      res.json(result)
    })

    app.put('/letestdestinations/:id', async (req, res) => {
        const id = req.params.id;
        const trainData = req.body;
        const filter = {_id: ObjectId(id)};
        const options = { upsert: false };
        const updateDoc = { $set: trainData };
        const result = await letestDestinationsCollection.updateOne(filter, updateDoc, options);
        res.json(result);
    });

    app.get("/letestnews", async (req, res)=>{
      const cursor = letestNewsCollection.find({});
      const news = await cursor.toArray();
      res.send(news);
    })

    app.post("/letestnews", async (req, res)=>{
        const news = req.body;
        const result = await letestNewsCollection.insertOne(news);
        res.json(result)
    })

    app.put('/letestnews/:id', async (req, res) => {
        const id = req.params.id;
        const newsData = req.body;
        const filter = {_id: ObjectId(id)};
        const options = { upsert: false };
        const updateDoc = { $set: newsData };
        const result = await letestNewsCollection.updateOne(filter, updateDoc, options);
        res.json(result);
    });

    app.delete('/letestnews/:id', async (req, res)=>{
      const newsid = req.params.id;
      const query = {_id: ObjectId(newsid)};
      const result = await letestNewsCollection.deleteOne(query);
      res.json(result)
    })
    
    app.get("/trains", async (req, res)=>{
      const cursor = trainsCollection.find({});
      const train = await cursor.toArray();
      res.send(train);
    })
    
    app.post("/train", async (req, res)=>{
        const train = req.body;
        const result = await trainsCollection.insertOne(train);
        res.json(result);
    })

    app.put('/train/:id', async (req, res) => {
        const id = req.params.id;
        const trainData = req.body;
        const filter = {_id: ObjectId(id)};
        const options = { upsert: false };
        const updateDoc = { $set: trainData };
        const result = await trainsCollection.updateOne(filter, updateDoc, options);
        res.json(result);
    });

    app.delete('/train/:id', async (req, res)=>{
      const trainID = req.params.id;
      const query = {_id: ObjectId(trainID)};
      const result = await trainsCollection.deleteOne(query);
      res.json(result)
    })

    app.post("/trains", async (req, res)=>{
      const train = req.body;
      const query = { fromDistrict:train.from, toDistrict: train.to, classname: train.classname };
      const cursor = trainsCollection.find(query);
      // console.log("cursor", cursor);
      const searchTrains = await cursor.toArray();
      res.send(searchTrains);
    })
    // //post api
    app.post("/user", async (req, res)=>{
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.json(result)
    })
    app.put('/user', async (req, res) => {
        const user = req.body;
        const filter = { email: user.email };
        const options = { upsert: true };
        const updateDoc = { $set: user };
        const result = await usersCollection.updateOne(filter, updateDoc, options);
        res.json(result);
    });

    app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            res.json(user);
        });
    
    app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { admin: true } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });

    app.post("/review", async (req, res)=>{
        const review = req.body;
        const result = await reviewCollection.insertOne(review);
        res.json(result)
    })
    
    app.get("/review", async (req, res)=>{
      const cursor = reviewCollection.find({});
      const review = await cursor.toArray();
      res.send(review);
    })

    app.post("/search-train-tickets-manage", async (req, res)=>{
      const train = req.body;
      const query = { fromDistrict:train.from, toDistrict: train.to, classname: train.classname, departure: train.departure };
      const cursor = trainTicketManageCollection.find(query);
      // console.log("cursor", cursor);
      const searchTrains = await cursor.toArray();
      res.send(searchTrains);
    })

    app.put('/search-train-tickets-manage', async (req, res) => {
        const trainData = req.body;
        const filter = { fromDistrict: trainData.fromDistrict, toDistrict: trainData.toDistrict, classname: trainData.classname, departure: trainData.departure };
        const options = { upsert: true };
        const updateDoc = { $set: trainData };
        const result = await trainTicketManageCollection.updateOne(filter, updateDoc, options);
        res.json(result);
    });

    app.post("/user-train-bookings", async (req, res)=>{
        const bookings = req.body;
        const result = await userTrainBookingsCollection.insertOne(bookings);
        res.json(result)
    })

    app.get("/user-train-bookings", async (req, res)=>{
      const cursor = userTrainBookingsCollection.find({});
      const bookings = await cursor.toArray();
      res.send(bookings);
    })

    app.post("/user-train-bookings/my-bookings/", async (req, res)=>{
      const train = req.body;
      const query = { email: train.email };
      const cursor = userTrainBookingsCollection.find(query);
      // console.log("cursor", cursor);
      const searchTrains = await cursor.toArray();
      res.send(searchTrains);
    })

    app.post("/create-payment-intent", async (req, res)=>{
      const paymentInfo = req.body;
      const amount = paymentInfo.newUpdatePrice * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        currency : 'usd',
        amount : amount,
        payment_method_types: ['card']
      });
      res.json({clientSecret: paymentIntent.client_secret})
    })

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

run().catch(console.dir);

app.get("/", (req, res)=>{
    res.send("Responding from server site")
})

app.listen(port, ()=>{
    console.log(`lisiting port on ${port}`)
})