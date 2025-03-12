import React, { useEffect, useState } from "react";
import ManageCard from "./ManageCard";

const Manage = () => {
  const [manageData, setManageData] = useState([]);
  async function fetchData() {
    const response = await fetch("http://localhost:3000/displayData");
    const data = await response.json();
    setManageData(data);
  }
  useEffect(() => {
    fetchData();
  }, [manageData]);
  console.log(manageData)
  return (
    <div>
      <div className="w-[100vw]  items-center justify-center h-[100vh] flex  bg-black">
        <div className="w-[80vw] h-[80vh] overflow-y-scroll hide-scrollbar duration-300 scrollable gap-7 flex flex-col fixed shadow-purple-400 shadow-lg  p-8 rounded-3xl  ">
          {manageData.map((agent, index) => {
            return(
              <div key={index}>
              
               <ManageCard
                name={agent.name}
                description={agent.description}
                image={agent.image}
                id={agent._id}
              ></ManageCard>
            </div>
            );
            
          })}
        </div>
      </div>
    </div>
  );
};

export default Manage;
