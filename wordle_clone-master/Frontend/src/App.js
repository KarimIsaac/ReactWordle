import './App.css';
import Board  from "./components/Board.js"
import { createContext, useState } from 'react';
import { dictionary } from './components/variables';
import _ from 'lodash'
import Title from './components/Title';
import Timer from './components/Timer';


export const WordleContext = createContext()

 function App() {
  const [showPage, setShowPage] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const [completedRows, setCompletedRows] = useState([]);
  const [guessWord, setGuessWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [guessCount, setGuessCount] = useState(0); 
  const [startTime, setStartTime] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState(3);
const [word, setWord] = useState(""); 
function guessTheWord(char) {
  if (guessWord.length === selectedLetters) return;
  setGuessWord(guessWord.concat(char));
}

  async function pressEnter() {
    if (gameOver) return;

   
    if (guessWord === word) {
      setGameOver(true);
      const endTime = new Date(); 
      
      setEndTime(endTime); 
      const data = {
        name: playerName,
        guesses: guessCount,
        time: (endTime.getTime() - startTime.getTime()) / 1000, 
        selectedLetters: selectedLetters
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/highscore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        console.log(await response.json());
      } catch (error) {
        console.log(error);
        alert("An error occurred while sending your data.");
      }
  
      alert("You Won");
      window.location.href = "http://localhost:5080/highscore";
    }
   

    console.log("Pressed Enter" + currentRow);
    setCurrentRow(currentRow + 1);
    setCompletedRows([...completedRows, currentRow]);
    setGuessWord("");
    setGuessCount(guessCount + 1); 

    
  }

  function backspace() {
    setGuessWord(guessWord.slice(0, guessWord.length - 1));
  }

  function startGame() {
    if (playerName === "") {
      alert("Please enter your name to start the game.");
      return;
    }
    setShowPage(true);
    setStartTime(new Date());
    setWord(_.sample(dictionary.filter(word => word.length === selectedLetters)).toUpperCase());
  }
  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <>
      {!showPage && (
        <div className='start-game'>
          <h1>Hint:</h1>
          <p>The words : karim, david, johan</p>
          <label>
            Enter your name:
            <input className='start-label' type="text" value={playerName} onChange={handleNameChange} />
          </label>
          <select value={selectedLetters} onChange={(e) => setSelectedLetters(parseInt(e.target.value))}>
            <option value={3}>3 Letters</option>
            <option value={4}>4 Letters</option>
            <option value={5}>5 Letters</option>
          </select>
          <button className='start-button' onClick={startGame}>Start Game</button>
          

        </div>
      )}

      {showPage && (
        <WordleContext.Provider
          value={{
            guessTheWord,
            pressEnter,
            completedRows,
            currentRow,
            word,
            guessWord,
            backspace,
          }}
        >
          {!gameOver && <Timer />}
          <Board />
          <Title />
          <div className='guesses-counter'>Guesses: {guessCount}</div> {/* display the guess count */}
        </WordleContext.Provider>
      )}
    </>
  );
}
export default App;