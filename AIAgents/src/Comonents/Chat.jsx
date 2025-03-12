import React, { useRef, useState } from "react";
import { MdOutlineAttachment } from "react-icons/md";

const Chat = () => {
  const [file, setFile] = useState();
  const inputRef = useRef(null);

  function handleInputFile(e) {
    e.preventDefault();
    inputRef.current.click();
  }
  function handleChange(e) {
    const data = e.target.files[0];
    setFile(data);
    console.log(data);
  }

  return (
    <div>
      <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-black ">
        <div className="w-[80vw] h-[80vh]  rounded-3xl flex  shadow-lg shadow-purple-400 flex-col  p-8">
          <div className=" flex mt-auto  gap-3 ">
          
            <div className=" flex items-center justify-center rounded-full w-10 h-10 border">
              <MdOutlineAttachment
                className="text-white"
                onClick={handleInputFile}
              />
              <input
                type="file"
                onChange={handleChange}
                className="hidden"
                ref={inputRef}
              />
            </div>
            <input
              placeholder=" Masages..."
              className=" w-[95%] bg-black h-10 border mt-auto justify-between rounded-full items-center flex pl-5 pr-5 text-slate-400"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
