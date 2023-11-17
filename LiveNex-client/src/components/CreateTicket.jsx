import React, { useState } from "react";
import { useCreateTicketMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
    const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [createTicket] = useCreateTicketMutation();

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    // Functionality to handle submitting the form (to be implemented)
    if(!subject || !description) {
        toast.error("enter the subject and description!");
        return;
    }
    createTicket({ subject, description })
      .unwrap()
      .then((res) => {
        // console.log(res);
        if(res.data=="success")
        {
            toast.success("ticket created");
            navigate ("/tickets");
        }
      })
      .catch((e) => console.log("error while creating ticket: ", e.message));
    console.log("Subject:", subject);
    console.log("Description:", description);
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Ticket</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="subject"
        >
          Subject
        </label>
        <input
          className="border rounded-md w-full py-2 px-3 text-gray-700"
          id="subject"
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Enter subject"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="border rounded-md w-full py-2 px-3 text-gray-700 h-24"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
        />
      </div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateTicket;
