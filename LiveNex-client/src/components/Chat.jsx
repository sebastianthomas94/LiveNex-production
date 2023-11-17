import React, { useState } from "react";
import { useSharedContext } from "../context/SharedContext.js";
import CommentTile from "./CommentTile.jsx";
import { useSentReplyMutation } from "../slices/userApiSlice.js";

const Chat = () => {
  let {
    isLive,
    setIsLive,
    setComments,
    comments,
    newComment,
    setNewComment,
    sentCom,
    setSentCom,
  } = useSharedContext();

  const [sentReply] = useSentReplyMutation();

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const postComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          // Assuming setComments takes an array of comments
          id: Date.now(), // Assigning a temporary unique ID for the comment
          displayName: "Sebastian", // Add the appropriate display name
          displayMessage: newComment,
          profileImageUrl: "URL_to_your_profile_image", // Add the appropriate image URL
          platform: "LiveNex", // Specify the platform
        },
      ]);
      sentReply({ comment: newComment });
      setNewComment("");
    }
  };

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  return (
    <div className="chat-container flex flex-col h-full p-4 border border-gray-300 shadow-lg">
      <div className="live-button mb-4">
        <button
          onClick={toggleLive}
          className={`${
            isLive ? "bg-red-500" : "bg-green-500"
          } w-24 h-12 rounded-md text-white transition-colors duration-300`}
        >
          {isLive ? "End Live" : "Go Live"}
        </button>
      </div>
      <div className="chat flex-grow overflow-y-auto relative">
        {comments && comments.map((comment) => {
          return (
            <CommentTile
              key={comment.id} // Provide a unique key for each comment
              displayName={comment.displayName}
              displayMessage={comment.displayMessage}
              profileImageUrl={comment.profileImageUrl}
              platform={comment.platform}
            />
          );
        })}
      </div>
      <div className="input-container mt-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleNewComment}
        />
        <button
          onClick={postComment}
          className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
