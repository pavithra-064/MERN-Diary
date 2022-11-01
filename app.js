const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
//  var bodyparser = require('body-parser');

// Express app initialization
const app = express();
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true}))

app.use(cors());

const PORT = process.env.PORT || 3000;
// Mongo Atlas Connection
const mongoURI =
  "mongodb+srv://webdevskp:papo2123@cluster0.okfjq.mongodb.net/diary-db?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT);
    console.log(`Listening at ${PORT}`); // Log to be removed
  })
  .catch((err) => console.log("Error Raised : ", err));

// Routing
const api = require("./api/api");
app.use("/api", api);
