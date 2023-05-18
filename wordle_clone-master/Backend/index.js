// index.js

import mongoose from "mongoose";
import app from "./app.js";
import Highscore from "./DB/Highscore.js";
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster55.vvrmnzh.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to MongoDB Atlas.');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas: ', err);
  });
  



