import React, { useEffect, useState } from "react";
import Agentcard from "./Agentcard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 

  async function fetchHomeData() {
    const response = await fetch("http://localhost:3000/displayData");
    const data = await response.json();
    setHomeData(data);
  }

  useEffect(() => {
    fetchHomeData();
  }, []); 

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % homeData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? homeData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-black">
      <div className=" flex justify-evenly items-center w-[90vw] h-[80vh]">
        <div className=" w-[500px] text-white h-[500px] flex flex-col justify-evenly p-3">
          <h1 className="text-5xl font-bold">Empowering AI, Transforming Futures . . .</h1>
          <p className="text-white">
            Unlock the power of AI with our intelligent solutions. Automate tasks, enhance decision-making, and drive innovation effortlessly.
            Experience the future of smart technology today.
          </p>
        </div>
        
        <div className=" w-[600px] h-[500px] flex items-center justify-center text-white">
          <button onClick={prevCard} className="bg-slate-700 hover:bg-slate-400 w-[40px] h-[40px] rounded-full flex items-center justify-center">
            <FaArrowLeft />
          </button>

          <div className="w-[480px]  h-[450px] duration-300 flex items-center justify-center">
            {homeData.length > 0 && (
              <Agentcard
                name={homeData[currentIndex].name}
                task={homeData[currentIndex].task}
                image={homeData[currentIndex].image}
              />
            )}
          </div>

          <button onClick={nextCard} className="bg-slate-700 w-[40px] hover:bg-slate-400 h-[40px] rounded-full flex items-center justify-center">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
