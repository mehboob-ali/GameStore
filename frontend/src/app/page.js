'use client'
import { useState, useEffect } from "react";
import Page from "./AddGame/page";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [data]);

  function fetchData() {
    fetch('http://localhost:5083/games')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }

  const handleAddGame=()=>{


  }

  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-8">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <ul className="text-lg text-red-500">
            {data.map((game, index) => (
              <li key={index} value={game.id}>
                {game.name}
              </li>
            ))}
          </ul>
          <div className="p-8">
            <button className="bg-blue-600 text-lg text-white p-2 rounded-lg"
              onClick={handleAddGame()}>Add Game</button>
          </div>

        </div>
      </div>
      <Page data={data} fetchData={fetchData}/>

    </main>
  );
}
