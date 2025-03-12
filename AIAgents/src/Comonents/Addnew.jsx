import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Addnew = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { id } = useParams();  // Get `id` from URL
  const navigate = useNavigate();
  const [pic, setPic] = useState(null);
  const fileref = useRef(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing data if `id` is present
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/searchAgent/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("name", data.name);
          setValue("task", data.task);
          setValue("description", data.description);
          setPic(data.image);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [id, setValue]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileref.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPic(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("task", data.task);
    formData.append("description", data.description);
    if (pic instanceof File) {
      formData.append("image", pic);
    }

    if (id) {
      updateData(id, formData);
    } else {
      createData(formData);
    }
  };

  // Update existing data
  const updateData = async (id, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/updateAgent/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert('Agent updated successfully!')
         navigate('/Manage')
      } else {
        alert("Error updating agent!");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Create new agent
  const createData = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/createAgent", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert('Agent created successfuly!')
        // toast.success(' Agent created successfuly!')
       
      } else {
        toast.error("Error creating agent!");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] flex items-center justify-center h-[100vh] bg-black">
      <div className="shadow-lg shadow-purple-400 rounded-3xl w-[80vw] text-white p-10 h-[80vh] flex items-center justify-center">
        <form className="flex flex-col text-black w-full gap-5 h-full" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Agent's Name" {...register("name", { required: true })} className="p-3 rounded-2xl" />
          <input type="text" placeholder="Tasks" {...register("task", { required: true })} className="p-3 rounded-2xl" />
          <textarea rows={10} placeholder="Description" {...register("description", { required: true })} className="p-3 rounded-2xl"></textarea>

          <div className="flex gap-10">
            <button onClick={handleFileUpload} className="p-3 w-[100px] hover:scale-90 duration-300 rounded-3xl bg-purple-500">
              Upload
            </button>
            <input type="file" ref={fileref} onChange={handleFileChange} className="hidden" />
            <input type="submit" value={loading ? "Uploading..." : id ? "Update" : "Submit"} className="p-3 hover:scale-90 duration-300 rounded-3xl w-[100px] bg-purple-500" disabled={loading} />
          </div>

          {pic && <p className="text-white">Selected File: {pic.name || "Existing Image"}</p>}
        </form>
      </div>
    </div>
  );
};

export default Addnew;
