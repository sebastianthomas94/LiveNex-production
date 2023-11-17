import React from "react";
import SocialMediaProfileIcon from "./SocialMediaProfileIcon";

const CommentTile = ({
  displayName,
  displayMessage,
  profileImageUrl,
  platform,
}) => {
  let iconClass;
  switch (platform) {
    case "youtube":
      iconClass = "fa fa-youtube";
      break;
    case "twitch":
      iconClass = "fa fa-twitch";
      break;
    case "facebook":
      iconClass = "fa fa-facebook";
      break;
  }
  return (
    <div className="flex p-4 border border-gray-200 rounded-lg mb-4">
      <div className="mr-4">
        <SocialMediaProfileIcon
          imageUrl={profileImageUrl}
          iconClassName={iconClass}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-lg">{displayName}</div>
        <div className="text-gray-600">{displayMessage}</div>
      </div>
    </div>
  );
};

export default CommentTile;
