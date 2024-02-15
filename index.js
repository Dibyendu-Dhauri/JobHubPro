const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const userRouter = require("./src/routes/user.routes");
const jobsRouter = require("./src/routes/job.routes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// mongoDB connection
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    throw error;
  }
};

// if mongoDB disconnect, call this functon
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use("/api/auth", userRouter); 
app.use("/api/jobs", jobsRouter);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage =
    err.message || "Something went wrong! Please try after some time.";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// middleware for no route
app.use((req, res, next) => {
  res.status(400).json({
    message: "no route found",
  });
});

app.listen(process.env.PORT || 8003, () => {
  connect();
  console.log("server is started");
});
