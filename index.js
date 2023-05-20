import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
//Router
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/postRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
const app = express();
//to serve images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));
//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => app.listen(PORT, () => console.log(`Listening at ${PORT}`)))
  .catch((error) => console.log("Error"));

//Usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
