import React, { useState, useEffect } from "react";

const page = ({ data, fetchData }) => {
  const [gameName, setGameName] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [gameReleaseDate, setGameReleaseDate] = useState("");
  const [genreData, setGenreData] = useState([]);

  useEffect(() => {
    fetchGenre();
  }, []);

  function fetchGenre() {
    fetch("http://localhost:5083/genres")
      .then((res) => res.json())
      .then((data) => setGenreData(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log("fetch genre running", genreData);
  }

  function handleGenreChange(e) {
    console.log("game genre id", e.target.value);
    setGameGenre(e.target.value);
  }

  const handleSave = (e) => {
    fetch("http://localhost:5083/games", {
      method: "POST",
      body: JSON.stringify({
        name: gameName,
        genreId: parseInt(gameGenre),
        price: parseFloat(gamePrice),
        releaseDate: gameReleaseDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchData();
  };

  const handleCancel = () => {
    setGameName("");
    setGameGenre("");
    setGamePrice("");
    setGameReleaseDate("");
  };

  return (
    <div className=" max-w-lg mx-auto p-4 shadow-md rounded-tr-3xl rounded-bl-3xl text-gray-600 bg-gray-200 w-1/4 border-2 h-auto border-white ">
      <div className="pb-6">
        <span className="block mb-2 font-medium">Enter Game Name</span>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="mb-3 w-full p-2 border-2 shadow-2xl border-gray-400 rounded-tl-2xl rounded-br-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span className="block mb-2 font-medium">Enter Genre Name</span>

        <select
          onChange={(e) => handleGenreChange(e)}
          className=" w-full mb-3 p-3 border-2 shadow-2xl border-gray-400 rounded-tl-2xl rounded-br-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          {genreData.map((genre, index) => (
            <option
              className=" items-center flex justify-center text-gray-800"
              key={index}
              value={genre.id}
            >
              {genre.name}
            </option>
          ))}
        </select>

        <span className="block mb-2 font-medium">Enter Game Price</span>
        <input
          type="text"
          value={gamePrice}
          onChange={(e) => setGamePrice(e.target.value)}
          className="mb-3 w-full p-2 border-2 shadow-2xl border-gray-400 focus:outline-none rounded-tl-2xl rounded-br-2xl focus:ring-2 focus:ring-blue-500"
        />

        <span className="block mb-2 font-medium">Enter Game Release Date</span>
        <input
          type="date"
          value={gameReleaseDate}
          onChange={(e) => setGameReleaseDate(e.target.value)}
          className="w-full p-2 border-2 shadow-2xl border-gray-400 rounded-tl-2xl rounded-br-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className=" flex items-center justify-center gap-4">
        <button
          className=" border-2 bg-gray-500 hover:bg-gray-700 focus:ring focus:ring-gray-100 border-gray-300 p-2 px-4 text-gray-100 rounded-lg"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className="border-2 bg-blue-500 hover:bg-blue-700 focus:ring focus:ring-blue-300 p-2 px-4 text-gray-100 rounded-lg "
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default page;
