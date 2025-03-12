import React from "react";

const Agentcard = ({ name, task, image }) => {
  return (
    <div className="border h-[400px] w-[300px] bg-white p-3 hover:scale-110 duration-300 shadow-2xl shadow-purple-400  rounded-lg flex flex-col items-center text-black">
      <img
        src={`http://localhost:3000/uploads/${image}`}
        alt={name}
        className="h-[250px] w-full object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-3">{name}</h2>
      <p className="text-gray-600">{task}</p>
    </div>
  );
};

export default Agentcard;

