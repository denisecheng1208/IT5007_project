const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// GraphQL
const schema = require('./schema');
const {graphqlHTTP} = require('express-graphql');

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
  })
)

// mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI + 'TechForum', {
  useNewUrlParser: true
})
mongoose.connection.on('connected', function () {
  console.log('Connection Success');
})
mongoose.connection.on('error', function () {
  console.log('Error occurred');
})
mongoose.connection.on('disconnected', function () {
  console.log('Disconnected');
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})