const express = require("express");
const cors = require("cors");
const app = express();
// const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const routes = require("./routes/routes");

var corOptions = {
  origin: "https://localhost:3001",
};

//middleware
app.use(cors(corOptions));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use(process.env.BASE_URL, routes);

//test api
app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

//port
const PORT = process.env.PORT || 3000;

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
