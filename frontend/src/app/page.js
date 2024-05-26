'use client'
import { useState, useEffect } from "react";
import Page from "./AddGame/page";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

  }, []);

  function fetchData() {
    fetch('http://localhost:5083/games')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
      console.log("fetch running")
  }

  
  const handleAddGame=()=>{


  }

  function handleDelete(id){
    fetch(`http://localhost:5083/games/${id}`,
      {
        method:"DELETE",
        headers:{
          "Content-Type" : "application/json" 
        }
      }
    );
    fetchData();
console.log("delete running")
  }

   
  

  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-8">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex bg-black">
        <div className=" p-8">

          <table className="text-lg table-auto  text-gray-300 border-gray-500 border-2 ">
            <thead className=" text-xl font-bold ">
              <tr className="">
                <th className="p-2">Id</th>
                <th>Name</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Release Date</th>
              </tr>
            </thead>
            <tbody>
            {data.map((game, index) => (

                <tr 
                  className=" even:bg-gray-800 text-center"                
                  key={index} value={game.td} >

                  <td className=" p-6 ">{game.id}</td>     
                  <td className=" p-6 ">{game.name}</td>
                  <td className=" p-6">{game.genre}</td>
                  <td className=" p-6 ">${game.price}</td>
                  <td className=" p-6 ">{game.releaseDate}</td>
                  <td><button className="p-2 mx-2 bg-blue-500 rounded-md">Edit</button></td>
                  <td>
                    <button className="p-2 bg-red-500 rounded-md"
                      onClick={()=>handleDelete(game.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
                
            ))}
            </tbody>
          </table>
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
