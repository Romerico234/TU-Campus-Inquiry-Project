const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Import route(s)
const inquiriesRoute = require("./routes/inquiries-route");

require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Get environment variables
const port = process.env.PORT || 3001; //If the port is undefined in our environment file, we will use port 3001
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db; // Declare a variable to hold the database connection

// Function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        await client.connect(); // Connect to the MongoDB server
        db = client.db(dbName);
        console.log("Connected to MongoDB"); // Log a success message

        const collectionInfo = await db
            .listCollections({ name: "inquiries" })
            .next();

        // Create inquiries collection if it doesn't exist
        if (!collectionInfo) {
            await db.createCollection("inquiries");
            console.log("Collection inquiries created!");
        }
    } catch (err) {
        console.error(err);
    } // Log any errors that occur during connection
}

connectToDatabase(); // Connecting to the database

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors()); // Middleware to enable CORS (Cross-origin resource sharing) for security reasons

// Middleware to attach the database instance to each request
app.use((req, res, next) => {
    req.db = db; // Attach the database instance to the req object
    next(); // Call the next middleware or route handler
});

// Import routes
app.use("/api/inquiries", inquiriesRoute); // inquiries route for the /api/inquiries path

// Simple route for the root URL
app.get("/", (req, res) => {
    res.send("TU Campus Inquiry Request Server");
});

// Start the API server
app.listen(port, () => {
    console.log(`Server up and running at http://localhost:${port}`);
});

// Function to gracefully shut down the server
function gracefulShutdown() {
    if (client) {
        // Check if the client is defined
        client
            .close(false) // Close the MongoDB client connection
            .then(() => {
                console.log("MongoDB connection closed."); // Log a success message
                process.exit(0); // Exit the process with success code 0
            })
            .catch((err) => {
                // Log any errors that occur during closure
                console.error("Error closing MongoDB connection:", err);

                process.exit(1); // Exit the process with error code 1
            });
    }
}

// Listen for the SIGINT signal (e.g., Ctrl+C) and call gracefulShutdown
// SIGINT (Signal Interrupt) is a signal sent to a process to interrupt it. The signal is typically generated by the user pressing Ctrl+C on the keyboard.
process.on("SIGINT", gracefulShutdown);

// Listen for the SIGTERM signal (e.g., termination) and call gracefulShutdown
// SIGTERM (Signal Terminate) is a signal sent to a process to request its termination. Unlike SIGKILL, it allows the process to terminate gracefully by performing cleanup operations.
process.on("SIGTERM", gracefulShutdown);
