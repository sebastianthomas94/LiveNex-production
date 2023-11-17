import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Make sure to import the FontAwesome library

const SocialMediaProfileIcon = ({ imageUrl, iconClassName }) => {
  return (
    <div className="relative inline-block m-2">
      {" "}
      {/* Use 'inline-block' to make it size to the content */}
      <img
        src={imageUrl}
        alt="Profile"
        className="rounded-full w-12 h-12 object-cover"
      />
      <div
        className={`${iconClassName} text-white-500 mr-0 absolute bottom-0 right-0`}
        style={{ background: "white", borderRadius: "50%" }}
      ></div>
    </div>
  );
};

export default SocialMediaProfileIcon;
