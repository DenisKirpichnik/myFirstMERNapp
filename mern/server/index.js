import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
const app = express(); // initialize the app

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to yourexp API");
});

// mongo DB
const CONNECTION_URL =
  "mongodb+srv://deniskirpichnik:deniskirpichnik123@cluster0.gj23o.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`))) // if it goes well and connects
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
