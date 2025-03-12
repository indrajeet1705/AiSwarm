import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageCard = ({ name, description, image, id }) => {
  const navigate = useNavigate();

  async function Terminationcall(id) {
    try {
      const response = await fetch(`http://localhost:3000/deleteAgent/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Agent Terminated Successfully!");
      } else {
        toast.error("Server Error!");
      }
    } catch (error) {
      alert("Error in code, check console");
      console.error(error);
    }
  }

  return (
    <div>
      <div className="w-full h-[200px] p-5 flex justify-evenly text-white rounded-3xl">
        <div className="overflow-hidden rounded-3xl w-[150px] object-cover justify-center items-center h-[150px]">
          <img src={`http://localhost:3000/uploads/${image}`} alt="" />
        </div>
        <div className="w-[250px] flex items-center">{description}</div>
        <div className="w-[400px] h-[150px] flex items-center justify-evenly">
          {/* Navigate to Addnew page with id */}
          <button
            onClick={() => navigate(`/addnew/${id}`)}
            className="p-3 w-[100px] hover:scale-90 duration-300 rounded-3xl bg-purple-500"
          >
            Update
          </button>

          {/* Call delete function */}
          <button
            onClick={() => Terminationcall(id)}
            className="p-3 w-[100px] hover:scale-90 duration-300 rounded-3xl bg-purple-500"
          >
            Terminate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCard;
