import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import books from "./routes/books";
import item from "./routes/item";
import movies from "./routes/movies";
import shows from "./routes/shows";
import years from "./routes/years";
import authentication from "./routes/authentication";
import search from "./routes/search";
import stats from "./routes/stats";

require("dotenv").config();

const app = express();

const corsOriginDevelopment = "http://localhost:8080";
const corsOriginProduction = "https://what.pm";

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? corsOriginProduction
        : corsOriginDevelopment,
  })
);

const mongoDbUrl = process.env.MONGO_DB_URL;
mongoose.Promise = require("bluebird");

mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // eslint-disable-next-line global-require
    promiseLibrary: require("bluebird"),
  })
  .then(() =>
    console.log(
      ` → Successful connection to MongoDB URL: ${process.env.MONGO_DB_URL}`
    )
  )
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up routes
app.use("/api/authentication", authentication);
app.use("/api/books", books);
app.use("/api/movies", movies);
app.use("/api/shows", shows);
app.use("/api/years", years);
app.use("/api/search", search);
app.use("/api/stats", stats);
app.use("/api/item", item);

// When someone accesses the API directly via browser, don't show an error
app.get("/", (req, res) => {
  res.end();
});

export default app;
