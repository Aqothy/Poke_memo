import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./card";

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alreadyClicked, setAlreadyClicked] = useState([]);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=12";

  useEffect(() => {
    const pokeInfo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        getPokeData(res.data.results);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    pokeInfo();
  }, []);

  const getPokeData = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((currentPokeData) => {
        return [...currentPokeData, result.data];
      });
    });
  };

  const highScore = (extra) => {
    score > bestScore && setBestScore(score + extra);
  };

  const points = (id) => {
    alreadyClicked.includes(id)
      ? (highScore(0), setScore(0), setAlreadyClicked([]), alert("You lose!"))
      : setScore((currentScore) => currentScore + 1),
      setPokeData((currentPokeData) => {
        return shuffleArray(currentPokeData);
      });
    score + 1 === 12
      ? (highScore(1),
        alert("Congratulations! You win!"),
        setScore(0),
        setAlreadyClicked([]))
      : null;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      <main className="flex flex-col min-h-screen bg-[url('pokemon-bg.png')] bg-cover bg-center bg-no-repeat min-w-screen">
        <nav className="flex justify-between items-center px-3 mb-[0.5rem]">
          <div>
            <h1
              className="text-[2.5rem]"
              style={{ fontFamily: "'Pokemon Solid', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-red-500 to-red-800 text-transparent bg-clip-text">
                Pokemon{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text">
                memo{" "}
              </span>
              game
            </h1>
            <div>Get points by clicking on an image you haven't clicked on</div>
          </div>
          <div>
            <div>Score: {score}</div>
            <div>Best Score: {bestScore}</div>
          </div>
        </nav>
        <div className="grid grid-cols-4 grid-rows-3 gap-3 justify-center content-center flex-1">
          <Card
            loading={loading}
            points={points}
            setAlreadyClicked={setAlreadyClicked}
            pokeData={pokeData}
          />
        </div>
      </main>
    </>
  );
}
