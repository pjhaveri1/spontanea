import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 3000;

// MongoDB Connection
const uri = "your_mongodb_connection_string";
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

// Define the API route to fetch places
app.use(cors()); // Enable CORS for cross-origin requests
app.get("/places", async (req: Request, res: Response) => {
  try {
    const database = client.db("Spontanea"); // Your database name
    const collection = database.collection("activities"); // Your collection name

    const places = await collection.find({}, { projection: { _id: 0 } }).toArray();
    res.json(places);
  } catch (err) {
    console.error("Error fetching places", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDB();
});
