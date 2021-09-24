import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import { ObjectId } from "mongodb";
const app = express();
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.DB_URL;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/cribs", async (req, res) => {
  const client = new MongoClient(MONGODB);
  await client.connect();
  const results = await client.db("fyz").collection("cribs").find({}).toArray();
  res.send(results);
});

app.post("/cribs", async (req, res) => {
  const client = new MongoClient(MONGODB);
  await client.connect();
  const results = await client
    .db("fyz")
    .collection("cribs")
    .insertOne(req.body);
  res.send(results);
});

app.delete("/cribs/:id", async (req, res) => {
  const client = new MongoClient(MONGODB);
  await client.connect();
  const results = await client
    .db("fyz")
    .collection("cribs")
    .deleteOne({ _id: ObjectId(req.params.id) });
  res.send(results);
});

app.put("/cribs/:id", async (req, res) => {
  const client = new MongoClient(MONGODB);
  await client.connect();
  const results = await client
    .db("fyz")
    .collection("cribs")
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
  res.send(results);
});

app.listen(PORT, function (req, res) {
  console.log("the server is started", PORT);
});
