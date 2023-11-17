import { useEffect, useState } from "react";
import CreateLive from "../components/CreateLive";
import {
  useGetPastLivesMutation,
  useGetUpcomingLivesMutation,
} from "../slices/userApiSlice";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("past");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pastLives, setPastLives] = useState([]);
  const [upcomingLives, setupcomingLives] = useState([]);

  const [getPastLives] = useGetPastLivesMutation();
  const [getUpcomingLives] = useGetUpcomingLivesMutation();

  // Function to toggle the modal state
  const toggleModal = () => {
    localStorage.removeItem("youtube_rtmp");
    localStorage.removeItem("facebook_rtmp");
    localStorage.removeItem("twitch_rtmp");
    localStorage.removeItem("fileName");
    localStorage.removeItem("youtubeLiveUrl");
    setIsModalOpen(!isModalOpen);
  };

  // Dummy data for upcoming and past live streams

  useEffect(() => {
    getPastLives()
      .unwrap()
      .then((res) => {
        // console.log(res);
        setPastLives(res);
      })
      .catch((e) => {
        console.log("error at getting pastlives: ", e);
      });
    getUpcomingLives()
      .unwrap()
      .then((res) => {
        setupcomingLives(res);
      })
      .catch((e) =>
        console.log("error at fetching upcoming lives: ", e.message)
      );
  }, [isModalOpen]);

  return (
    <div>
      {/* "Create Live" button */}
      <button
        className="bg-blue-500 text-white font-semibold my-5 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 mt-4"
        onClick={toggleModal}
      >
        Create Live
      </button>
      <h2 className="text-2xl font-semibold mb-4">Streams and Recordings</h2>

      {/* Tabs for "Upcoming" and "Past" */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`mr-4 ${
            activeTab === "upcoming" ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`${
            activeTab === "past" ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Past Lives
        </button>
      </div>

      {/* Content based on the selected tab */}
      {activeTab === "upcoming" ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Upcoming Lives</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100">Destination</th>
                <th className="px-6 py-3 bg-gray-100">Title</th>
                <th className="px-6 py-3 bg-gray-100">Link</th>
                <th className="px-6 py-3 bg-gray-100">Scheduled Date</th>
                <th className="px-6 py-3 bg-gray-100">Time Remaining</th>
                <th className="px-6 py-3 bg-gray-100">Broadcast Or Live</th>
              </tr>
            </thead>
            <tbody>
              {upcomingLives &&
                upcomingLives.slice(0, 5).map((live, index) => (
                  <tr
                    key={parseInt(index) + 100}
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
                      {live.youtube?.youtubeLiveUrl && (
                        <a
                          href={live.youtube?.youtubeLiveUrl}
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
                      {new Date(live.scheduledTime).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      {live.scheduledTime && (
                        <div>
                          {!calculateCountdown(live.scheduledTime).aproched ? (
                            <>
                              {calculateCountdown(live.scheduledTime).days}d{" "}
                              {calculateCountdown(live.scheduledTime).hours}h{" "}
                              {calculateCountdown(live.scheduledTime).minutes}m{" "}
                            </>
                          ) : (
                            "Delayed"
                          )}
                        </div>
                      )}
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
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">Past Lives</h3>

          <div className="p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-100">Destination</th>
                  <th className="px-6 py-3 bg-gray-100">Title</th>
                  <th className="px-6 py-3 bg-gray-100">Link</th>
                  <th className="px-6 py-3 bg-gray-100">Start Time</th>
                  <th className="px-6 py-3 bg-gray-100">Broadcast Or Live</th>
                </tr>
              </thead>
              <tbody>
                {pastLives.slice(0, 5).map((live, index) => (
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
                            className="fa fa-youtube-play mx-2"
                            aria-hidden="true"
                          ></i>
                        </a>
                      )}
                      {live.twithchLiveUrl && (
                        <a
                          href={live.twithchLiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-twitch mx-2"
                            aria-hidden="true"
                          ></i>
                        </a>
                      )}{" "}
                      {live.facebookLiveUrl && (
                        <a
                          href={live.facebookLiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-facebook mx-2"
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
          </div>
        </div>
      )}

      <CreateLive isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}

const calculateCountdown = (scheduledTime) => {
  const now = new Date();
  const scheduled = new Date(scheduledTime);
  const timeDifference = scheduled - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  if (days < 0) return { aproched: true };
  return { days, hours, minutes, seconds, aproched: false };
};
