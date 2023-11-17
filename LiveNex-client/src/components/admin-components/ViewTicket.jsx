import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSentTicketReplyMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const ViewTicket = ({ ticket, goBack, setClicked }) => {
  const [adminReply, setAdminReply] = useState("");
  const navigate = useNavigate();
  const [sendTicketReply] = useSentTicketReplyMutation();

  const handleReplyChange = (e) => {
    setAdminReply(e.target.value);
  };

  const handleBack = () => {
    goBack();
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (adminReply.trim(" ") === "") {
      toast.error("Enter the reply first.");
      return;
    }
    const resolvedTicket = {
      ...ticket,
      status: true,
      reply: adminReply,
    };
    sendTicketReply(resolvedTicket)
      .unwrap()
      .then(() => {
        setClicked(false);
      })
      .catch((e) => console.log("Error while sending reply: ", e));

    setAdminReply("");
  };

  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Ticket Details</h3>
      <p>
        <span className="font-bold">User:</span> {ticket?.user}
      </p>
      <p>
        <span className="font-bold">Date:</span> {ticket?.date}
      </p>
      <p>
        <span className="font-bold">Subject:</span> {ticket?.subject}
      </p>
      <p>
        <span className="font-bold">Description:</span> {ticket?.description}
      </p>
      <p>
        <span className="font-bold">Status:</span>{" "}
        {!ticket.status ? "Pending" : "Resolved"}
      </p>
      <form onSubmit={handleReplySubmit}>
        {!ticket.reply ? (
          <div className="mt-4">
            <label htmlFor="adminReply" className="block font-bold mb-2">
              Admin Reply:
            </label>
            <textarea
              type="text"
              id="adminReply"
              value={adminReply}
              onChange={handleReplyChange}
              className="border p-2 w-full h-24"
            />
          </div>
        ) : (
          <p className="mt-4">
            <span className="font-bold">Reply:</span> {ticket.reply}
          </p>
        )}
        <div className="flex items-center mt-6 space-x-4">
          {!ticket.reply &&(<button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Submit Reply
          </button>)}
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewTicket;
