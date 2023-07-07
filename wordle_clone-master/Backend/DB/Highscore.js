import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    guesses: Number,
    time: Number,
    selectedLetters: Number 
  });

export default mongoose.model("Highscore", highscoreSchema)