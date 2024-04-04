const express = require("express");
const app = express();
const mongoose = require("mongoose");
const app_route = require("./routes/app_route");
const port = 5000;
const methodOverride = require("method-override");
const dotenv = require("dotenv");

// configure dotenv
dotenv.config();

// set view engine
app.set("view engine", "ejs");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected");
    app.listen(port, () => {
      console.log(`Listening to request coming from ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

connectToDatabase();

// url encoded
app.use(express.urlencoded({ extended: true }));

// set static middleware files
app.use(express.static("public"));
app.use(express.static("uploads"));

// overrides the default behaviour of a form
app.use(methodOverride("_method"));

// link to routes
app.use(app_route);

// 404 page
app.use((req, res) => {
  res.status(404).render("error.ejs", { title: "error page" });
});
