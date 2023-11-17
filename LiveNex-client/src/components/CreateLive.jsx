import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SocialMediaProfileIcon from "./SocialMediaProfileIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { sendScheduleInfo } from "../helpers/broadcastDataUpdate";
import { useSentScheduleInfoMutation } from "../slices/userApiSlice";

const CreateLive = ({ isOpen, onClose }) => {
  const [isStudioSelected, setIsStudioSelected] = useState(false); // Default to Studio
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [uploadDone, setUploadDone] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [scheduleForLater, setScheduleForLater] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const [sendScheduleInfo] = useSentScheduleInfoMutation();

  let iso8601Date;

  // Function to handle file upload
  const handleFileUpload = async (file) => {
    try {
      console.log("file: ", file);
      const formData = new FormData();
      formData.append("file", file, file.name);
      for (var pair of formData.entries()) {
        console.log(pair);
      }
      // const boundary =
      //   "----" +
      //   Array(32)
      //     .fill(null)
      //     .map(() => Math.floor(Math.random() * 16).toString(16))
      //     .join("");
      const contentType = `multipart/form-data;`;

      const response = await axios.post(
        "http://localhost:8000/uploadvideo",
        formData,
        {
          headers: {
            "Content-Type": contentType,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
            setUploadDone(true);
          },
        }
      );

      if (response.status === 200) {
        console.log("Upload completed:", response.data);
        localStorage.setItem("fileName", response.data.fileName);
        localStorage.setItem("s3VideoUrl", response.data.videoUrl);
        toast.success("video uploaded!");
      }
    } catch (error) {
      // Handle error scenarios
      console.error("Error uploading file:", error);
      toast.error("Failed to upload the file");
    }
  };

  const handleUpload = () => {
    const fileInput = document.getElementById("videoInput");
    const file = fileInput.files[0];

    if (file) {
      handleFileUpload(file);
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const toggleStudio = () => {
    setIsStudioSelected(!isStudioSelected);
  };

  const navigate = useNavigate();

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };

  const options = [
    { label: "YouTube", icon: "fa fa-youtube" },
    { label: "Twitch", icon: "fa fa-twitch" },
    { label: "Facebook", icon: "fa fa-facebook" },
  ];

  const selectOption = (option) => {
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(
      (selectedHour % 12) + (selectedPeriod === "PM" ? 12 : 0),
      selectedMinute,
      0,
      0
    );
    iso8601Date = scheduleForLater && selectedDateTime?.toISOString();
    if (scheduleForLater && selectedDateTime < new Date()) {
      toast.error("enter a future date.");
      return;
    }

    if (!videoTitle || !videoDescription) {
      toast.error("Input Title and Description");
      return;
    }
    setSelectedOption(option);
    if (option.label === "YouTube") {
      youtubeAutherization(
        videoTitle,
        videoDescription,
        profiles,
        setProfiles,
        scheduleForLater && iso8601Date,
        scheduleForLater
      );
    }
    if (option.label === "Facebook") {
      facebookAutherization(
        videoTitle,
        videoDescription,
        profiles,
        setProfiles,
        scheduleForLater && iso8601Date,
        scheduleForLater
      );
    }
    if (option.label === "Twitch") {
      twitchAutherization(
        videoTitle,
        videoDescription,
        profiles,
        setProfiles,
        scheduleForLater && iso8601Date,
        scheduleForLater
      );
    }
    setIsOpenDropDown(false);
  };

  if (!isOpen) {
    return null;
  }

  function goLive() {
    if (scheduleForLater) {
      const youtube = {
        youtube_rtmp: localStorage.getItem("youtube_rtmp"),
        youtubeLiveUrl: localStorage.getItem("youtubeLiveUrl"),
        YT_liveChatId: localStorage.getItem("YT_liveChatId"),
      };
      const facebook = {
        facebook_rtmp: localStorage.getItem("facebook_rtmp"),
        facebook_liveVideoId: localStorage.getItem("facebook_liveVideoId"),
        facebook_accesstoken: localStorage.getItem("facebook_accesstoken"),
      };
      const twitch = {
        twitch_rtmp: localStorage.getItem("twitch_rtmp"),
      };
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(
        (selectedHour % 12) + (selectedPeriod === "PM" ? 12 : 0),
        selectedMinute,
        0,
        0
      );
      const title = videoTitle;
      const videoUrl = localStorage.getItem("s3VideoUrl");
      const destinations = [
        localStorage.getItem("youtube_rtmp") ? "youtube" : undefined,
        localStorage.getItem("facebook_rtmp") ? "facebook" : undefined,
        localStorage.getItem("twitch_rtmp") ? "twitch" : undefined,
      ].filter(Boolean);

      const ScheduledLive = true;
      iso8601Date = scheduleForLater && selectedDateTime?.toISOString();
      localStorage.setItem("scheduledTimeInIso", iso8601Date);
      localStorage.setItem("title", videoTitle);
      sendScheduleInfo({
        youtube,
        facebook,
        twitch,
        scheduledTime: iso8601Date,
        ScheduledLive,
        title,
        destinations,
        broadcast : isStudioSelected,
        videoUrl,
        fileName: videoTitle,
      }).unwrap();
      navigate("/schedulinglive");        
      return;
    }
    localStorage.setItem("title", videoTitle);
    if (!videoDescription || !videoTitle || !profiles) {
      toast.error("Enter the values first");
      return;
    } else if (!isStudioSelected) navigate("/stream");
    else {
      if (localStorage.getItem("fileName")) navigate("/broadcast");
      else toast.error("Upload the file first");
    }
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer"
                onClick={onClose} // Add the onClose function to handle the cancel action
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Create Live Stream
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Source
                    <span className="ml-1 inline-block text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zM11 14H9V8h2v6zm0-4H9v-2h2v2"
                        />
                      </svg>
                    </span>
                  </p>
                  <div className="flex flex-row items-center">
                    <em
                      className="text-sm text-gray-700 cursor-pointer"
                      htmlFor="toggle"
                    >
                      Studio
                    </em>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={isStudioSelected}
                        onChange={toggleStudio}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <em className="ml-2 text-sm text-gray-700">
                      Pre-recorded video
                    </em>
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-500"
                    htmlFor="video-title"
                  >
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="video-title"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
                    placeholder="Enter video title"
                    // Add a value and onChange handler to capture the input value
                    value={videoTitle}
                    streamsstreams      onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-500"
                    htmlFor="video-description"
                  >
                    Video Description
                  </label>
                  <textarea
                    id="video-description"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
                    placeholder="Enter video description"
                    // Add a value and onChange handler to capture the input value
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                  />
                </div>
                {isStudioSelected && (
                  <div className="mt-3">
                    <label
                      htmlFor="videoInput"
                      className="block text-sm text-gray-500"
                    >
                      Select Video
                    </label>
                    <input
                      type="file"
                      id="videoInput"
                      accept="video/*"
                      onClick={() => {
                        setUploadDone(false);
                      }}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {!uploadDone && (
                      <button
                        onClick={handleUpload}
                        className="mt-2 bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Upload
                      </button>
                    )}
                    {/* Progress bar */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-3">
                        <progress value={uploadProgress} max="100" />
                        <span>{uploadProgress}%</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-3 flex items-center">
                  <input
                    type="checkbox"
                    id="scheduleForLater"
                    checked={scheduleForLater}
                    onChange={() => setScheduleForLater(!scheduleForLater)}
                    className="mr-2 h-5 w-5 text-indigo-500"
                  />
                  <label
                    htmlFor="scheduleForLater"
                    className="text-lg text-gray-700"
                  >
                    Schedule for later
                  </label>
                </div>
                {scheduleForLater && (
                  <div className="mt-3">
                    <label
                      htmlFor="dateTimeInput"
                      className="block text-sm text-gray-500"
                    >
                      Select Date and Time (GMT+5:30)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="date"
                        id="dateTimeInput"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mr-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <input
                        type="number"
                        id="hourInput"
                        value={selectedHour}
                        onChange={(e) => setSelectedHour(e.target.value)}
                        min="0"
                        max="23"
                        className="mr-2 w-16 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <span className="mr-2">:</span>
                      <input
                        type="number"
                        id="minuteInput"
                        value={selectedMinute}
                        onChange={(e) => setSelectedMinute(e.target.value)}
                        min="0"
                        max="59"
                        className="mr-2 w-16 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <select
                        id="periodInput"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                )}
                <p className="mt-3 text-sm text-gray-500">
                  Select Destinations
                  <span className="ml-1 inline-block text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 9.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414 1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="relative inline-block">
                    <button
                      onClick={toggleDropdown}
                      className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
                    >
                      Add Destinations
                    </button>
                    {isOpenDropDown && (
                      <div className="relative mt-2 w-40 bg-white rounded-lg shadow-md">
                        <ul>
                          {options.map((option, index) => (
                            <>
                              {(scheduleForLater && option.label != "Twitch" )? (
                                <li
                                  key={index}
                                  onClick={() => selectOption(option)}
                                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  <i
                                    className={`${option.icon} text-blue-500 mr-2 text-xl`}
                                  ></i>
                                  {option.label}
                                </li>
                              ) : (
                                <li
                                  key={index}
                                  onClick={() => selectOption(option)}
                                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  <i
                                    className={`${option.icon} text-blue-500 mr-2 text-xl`}
                                  ></i>
                                  {option.label}
                                </li>
                              )}
                            </>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedOption && (
                      <div className="mt-2">
                        {profiles.map((profile, index) => (
                          <SocialMediaProfileIcon
                            key={index}
                            imageUrl={profile.profilePicture}
                            iconClassName={profile.icon}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={goLive}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {!scheduleForLater ? "Go Live" : "Schedule live"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function youtubeAutherization(
  videoTitle,
  videoDescription,
  profiles,
  setProfiles,
  selectedDateTime,
  scheduleForLater
) {
  try {
    console.log("selected time for scheduling: ", selectedDateTime);
    console.log(scheduleForLater);
    const params = {
      title: videoTitle,
      description: videoDescription,
      ...(scheduleForLater && { selectedDateTime }),
    };
    console.log(params);

    const paramString = new URLSearchParams(params).toString();
    const authWindow = window.open(
      `http://localhost:8000/user/auth/youtubeAuth?${paramString}`,
      "_blank"
    );

    const messageListener = (event) => {
      if (event.origin === "http://localhost:8000") {
        console.log("from event youtube:", event);
        if (!event.data) return;
        const {
          platform,
          profilePicture,
          youtube_rtmp,
          YT_liveChatId,
          youtubeLiveUrl,
        } = event.data;
        localStorage.setItem("youtube_rtmp", youtube_rtmp);
        localStorage.setItem("YT_liveChatId", YT_liveChatId);
        localStorage.setItem("youtubeLiveUrl", youtubeLiveUrl);

        switch (platform) {
          case "youtube":
            let newProfile = {
              profilePicture,
              icon: "fa fa-youtube",
            };
            setProfiles([...profiles, newProfile]);
            break;
        }

        window.removeEventListener("message", messageListener);
      }
    };
    window.addEventListener("message", messageListener);
  } catch (error) {
    if (error) throw error;
  }
}

function facebookAutherization(
  videoTitle,
  videoDescription,
  profiles,
  setProfiles,
  selectedDateTime,
  scheduleForLater
) {
  const params = {
    title: videoTitle,
    description: videoDescription,
    ...(scheduleForLater && { selectedDateTime }),
  };
  console.log(params);
  const paramString = new URLSearchParams(params).toString();

  const authWindow = window.open(
    `http://localhost:8000/user/auth/fbauuth?${paramString}`,
    "_blank"
  );
  console.log("message lisner facebook activated");
  const messageListener = (event) => {
    if (event.origin === "http://localhost:8000") {
      console.log("from event facebook:", event);
      if (!event.data) return;
      const {
        profilePicture,
        facebook_rtmp,
        facebook_liveVideoId,
        facebook_accesstoken,
      } = event.data;
      localStorage.setItem("facebook_rtmp", facebook_rtmp);
      localStorage.setItem("facebook_liveVideoId", facebook_liveVideoId);
      localStorage.setItem("facebook_accesstoken", facebook_accesstoken);
      console.log("facebook rtmp url:", facebook_rtmp);
      const newProfile = {
        profilePicture,
        icon: "fa fa-facebook",
      };
      setProfiles([...profiles, newProfile]);
      // switch (platform) {
      //   case "youtube":
      //     let newProfile = {
      //       profilePicture,
      //       icon: "fa fa-youtube",
      //     };
      //     setProfiles([...profiles, newProfile]);
      //     break;
      // }

      window.removeEventListener("message", messageListener);
    }
  };
  window.addEventListener("message", messageListener);
}

function twitchAutherization(
  videoTitle,
  videoDescription,
  profiles,
  setProfiles,
  selectedDateTime,
  scheduleForLater
) {
  console.log("selected time for scheduling: ", selectedDateTime);
  const params = {
    title: videoTitle,
    description: videoDescription,
    ...(scheduleForLater && selectedDateTime),
  };
  const paramString = new URLSearchParams(params).toString();

  const authWindow = window.open(
    `http://localhost:8000/user/auth/twitchauth?${paramString}`,
    "_blank"
  );
  console.log("message lisner facebook activated");
  const messageListener = (event) => {
    if (event.origin === "http://localhost:8000") {
      console.log("from event facebook:", event);
      if (!event.data) return;
      const { platform, profilePicture, twitch_rtmp, twitchLiveUrl } = event.data;
      localStorage.setItem("twitch_rtmp", twitch_rtmp);
      localStorage.setItem("twitchLiveUrl", twitchLiveUrl);
      console.log("twitch rtmp url:", twitch_rtmp);

      let newProfile = {
        profilePicture,
        icon: "fa fa-twitch",
      };
      setProfiles([...profiles, newProfile]);

      window.removeEventListener("message", messageListener);
    }
  };
  window.addEventListener("message", messageListener);
}

export default CreateLive;
