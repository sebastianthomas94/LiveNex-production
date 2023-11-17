import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTicketsMutation } from "../slices/userApiSlice";
import ViewTicket from "./ViewTicket";

const TicketList = () => {
  const navigate = useNavigate();
  const [getTickets] = useGetTicketsMutation();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);
  const [clicked, setClicked] = useState(false);
  const[clickedTicket, setClickedTicket] = useState({});

  useEffect(() => {
    getTickets()
      .unwrap()
      .then((res) => {
        setTickets(res);
      })
      .catch((e) => {
        console.log("error at getTickets: ", e.message);
      });
  }, []);

  const handleCreateTicket = () => {
    navigate("/tickets/create");
    console.log("Create Ticket Clicked");
  };

  const handleClick = (ticket) => {
    setClickedTicket(ticket);
    setClicked(true);
  };

  // Logic for pagination
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tickets</h2>
        <button
          onClick={handleCreateTicket}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Ticket
        </button>
      </div>{" "}
      {!clicked ? (
        <>
          <div className="overflow-hidden rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="text-left"
                    onClick={() => handleClick(ticket)}
                  >
                    <td className="px-6 py-4">{ticket.date}</td>
                    <td className="px-6 py-4">{ticket.subject}</td>
                    <td className="px-6 py-4">{ticket.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.status
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ticket.status ? "Resolved" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="mx-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Prev
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentTickets.length < ticketsPerPage}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="mx-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </>
      ) : <ViewTicket ticket={clickedTicket} setClicked={setClicked}/>}
    </div>
  );
};

export default TicketList;
