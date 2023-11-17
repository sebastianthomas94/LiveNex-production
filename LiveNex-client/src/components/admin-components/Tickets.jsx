import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewTicket from "./ViewTicket";
import { useGetAllTicketsMutation } from "../../slices/userApiSlice";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [clicked, setClicked] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [getAllTickets] = useGetAllTicketsMutation();



  useEffect(() => {
    getAllTickets().unwrap().then((tickets)=>{
      setTickets(tickets);
    });
  }, [clicked]); 

  // Function to get arrow direction based on sorting config
  const getArrowDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return null;
  };

  // Sorting logic
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = sortedTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const handleClick = (ticket) => {
    setSelectedTicket(ticket);
    setClicked(true);
  };

  const goBack = ()=>{
    setClicked(false);
  }

  return (
    <>
     
        <div className="p-4 m-5 w-full">
          <h2 className="text-2xl font-bold mb-4">Tickets</h2>
          {!clicked ? (
          <div>
            <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3" onClick={() => requestSort("user")}>
                  <span>User</span>
                  <span>{getArrowDirection("user")}</span>
                </th>
                <th className="px-6 py-3" onClick={() => requestSort("date")}>
                  <span>Date</span>
                  <span>{getArrowDirection("date")}</span>
                </th>
                <th
                  className="px-6 py-3"
                  onClick={() => requestSort("subject")}
                >
                  <span>Subject</span>
                  <span>{getArrowDirection("subject")}</span>
                </th>
                <th className="px-6 py-3" onClick={() => requestSort("status")}>
                  <span>Status</span>
                  <span>{getArrowDirection("status")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleClick(ticket)}
                >
                  <td className="border px-6 py-4">{ticket.user}</td>
                  <td className="border px-6 py-4">{ticket.date}</td>
                  <td className="border px-6 py-4">{ticket.subject}</td>
                  <td
                    className={`border px-6 py-4 ${
                      !ticket.status 
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {ticket.status ? "Resolved": "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4">
            <button
              className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded transition duration-200"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded transition duration-200"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentTickets.length < ticketsPerPage}
            >
              Next
            </button>
            
          </div>
          </div>
          ):<ViewTicket ticket={selectedTicket} goBack={goBack} setClicked={setClicked}/>}
        </div>
      
    </>
  );
};

export default Tickets;
