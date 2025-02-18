import { useEffect, useState } from "react";
import './Highscore.css';
function Highscore() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHighscores() {
      try {
        const response = await fetch("http://localhost:5000/api/highscore");
        if (!response.ok) {
          throw new Error("Failed to fetch high scores");
        }
        const data = await response.json();
        setScores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHighscores();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="highscore-box">
      <h2>High Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time (s)</th>
            <th>Guesses</th>
            <th>Letters</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.name}</td>
              <td>{score.time}</td>
              <td>{score.guesses}</td>
              <td>{score.selectedLetters}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Highscore;