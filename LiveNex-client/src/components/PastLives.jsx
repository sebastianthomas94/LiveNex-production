import React, { useEffect, useState } from "react";
import { useGetPastLivesMutation } from "../slices/userApiSlice";

function PastLives() {
  const [getPastLives] = useGetPastLivesMutation();
  const [pastLives, setPastLives] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pastLivesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    getPastLives()
      .unwrap()
      .then((res) => {
        setPastLives(res);
      })
      .catch((e) => {
        console.log("error at getting pastlives: ", e);
      });
  }, []);

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

  const sortedPastLives = [...pastLives].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const indexOfLastPastlive = currentPage * pastLivesPerPage;
  const indexOfFirstPastlive = indexOfLastPastlive - pastLivesPerPage;
  const currentPastLives = sortedPastLives.slice(
    indexOfFirstPastlive,
    indexOfLastPastlive
  );

  return (
    <div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Past Lives</h3>

        <div className="p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 bg-gray-100 cursor-pointer"
                  onClick={() => requestSort("destination")}
                >
                  <span>Destination</span>
                  <span>{getArrowDirection("destination")}</span>
                </th>
                <th
                  className="px-6 py-3 bg-gray-100 cursor-pointer"
                  onClick={() => requestSort("title")}
                >
                  <span>Title</span>
                  <span>{getArrowDirection("title")}</span>
                </th>
                <th
                  className="px-6 py-3 bg-gray-100 cursor-pointer"
                  onClick={() => requestSort("link")}
                >
                  <span>Link</span>
                  <span>{getArrowDirection("link")}</span>
                </th>
                <th
                  className="px-6 py-3 bg-gray-100 cursor-pointer"
                  onClick={() => requestSort("startTime")}
                >
                  <span>Start Time</span>
                  <span>{getArrowDirection("startTime")}</span>
                </th>
                <th
                  className="px-6 py-3 bg-gray-100 cursor-pointer"
                  onClick={() => requestSort("broadcastOrLive")}
                >
                  <span>Broadcast Or Live</span>
                  <span>{getArrowDirection("broadcastOrLive")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPastLives.map((live, index) => (
                  <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4">
                    {live.destinations.map((dest, i) => {
                      if (dest === "youtube")
                        return <i className="fa fa-youtube mr-2" />;
                      if (dest === "facebook")
                        return <i className="fa fa-facebook mr-2" />;
                      if (dest === "twitch")
                        return <i className="fa fa-twitch mr-2" />;
                    })}
                  </td>
                  <td className="px-6 py-4">{live.title}</td>
                  <td className="px-6 py-4">
                    {live.youtubeLiveUrl && (
                      <a
                        href={live.youtubeLiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fa fa-youtube-play"
                          aria-hidden="true"
                        ></i>
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(live.startTime).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-block py-1 px-2 uppercase rounded font-semibold text-xs ${
                        live.broadcast
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-gray-100"
                      }`}
                    >
                      {live.broadcast ? (
                        <>
                          Broadcast{" "}
                          <a
                            href={live.videoUrl} // Replace 'videoUrl' with the actual property name in your 'live' object
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "orange" }} // Replace 'orange' with the desired color
                            className="cursor-pointer"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        "Live"
                      )}
                    </span>
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
              disabled={currentPastLives.length < pastLivesPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastLives;
