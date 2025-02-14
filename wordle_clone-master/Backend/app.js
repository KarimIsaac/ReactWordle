import express from "express";
import { engine } from "express-handlebars";
import highscore from "./DB/Highscore.js";
import { marked } from 'marked';
import path from 'path';
import cors from 'cors';
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://karim:dany1500@cluster1.tyihr.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB Atlas.')
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas: ', err);
  });
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const apiRoute = express.Router();

app.use(express.json());
app.use(cors());
app.use('/api', apiRoute);

app.engine("handlebars", engine({
  helpers: {
    markdown: md => marked(md)
  },
}));

app.set("view engine", "handlebars");
app.set("views", "../frame");

apiRoute.get('/highscore', async (req, res) => {
  const scores = await highscore.find();
  res.json(scores);
});

apiRoute.post('/highscore', async (req, res) => {
  const { name, time, guesses } = req.body;

  try {
    const score = await highscore.create({
      name,
      time,
      guesses,
      selectedLetters: req.body.selectedLetters
    });
    res.status(201).json(score);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});



app.get("/highscore", async (req, res) => {
  try {
    const response = await fetch('http://localhost:5000/api/highscore');
    const scores = await response.json();
    res.render("./partials/highscore", { scores });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});



app.get("/home", async (req, res) => {
  res.render("./partials/home");
});


app.get("/info", async (req, res) => {
  res.render("./partials/info");
});

export default app;
