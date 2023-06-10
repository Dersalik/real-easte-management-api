const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDB = require('./config/db');
const app = express();
const users = require('./routes/users');
const properties = require('./routes/properties');
connectDB();
app.use(express.json());

app.use('/api/users', users);
app.use('/api/properties', properties);


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);


