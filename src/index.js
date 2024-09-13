import express from "express";
import mongoose from "mongoose";

import customers from "./routes/customers.js";
import genres from "./routes/genres.js";
import movies from "./routes/movies.js";

const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) =>
    console.error("Couldn't connect to MongoDB", `${err.message}`)
  );

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
