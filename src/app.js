const express = require("express");
const bodyParser = require('body-parser')

const { fetchImage } = require("./actions/fetchImage");
const { fetchMetadata } = require("./actions/fetchMetadata");
const { createMetadata } = require("./actions/createMetadata");

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.get("/images/:filename", fetchImage);

app.get("/metadata/:id", fetchMetadata);
app.post("/metadata", createMetadata);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
