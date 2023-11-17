import React from "react";

const ViewTicket = ({ ticket, setClicked }) => {
  const onBackClick = () => {
    setClicked(false);
  };
  return (
    <div className="max-w-lg mx-auto bg-white rounded-md p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
      <div>
        <p className="font-bold">Subject: {ticket.subject}</p>
        <p className="mt-2 mb-4">Date: {ticket.date}</p>
        <p className="font-bold">Description:</p>
        <p>{ticket.description}</p>
        <p className="mt-4 font-bold">
          Status: {ticket.status ? "Resolved" : "Pending"}
        </p>
        {ticket.reply && (
          <div className="mt-4 border-t pt-4">
            <p className="font-bold">Admin Reply:</p>
            <p>{ticket.reply}</p>
          </div>
        )}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        onClick={onBackClick}
      >
        Back
      </button>
    </div>
  );
};

export default ViewTicket;
