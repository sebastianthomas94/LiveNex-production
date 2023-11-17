// SharedContext.js
import React, { createContext, useContext, useState } from "react";

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isLive, setIsLive] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sentCom, setSentCom] = useState("");

  return (
    <SharedContext.Provider
      value={{
        isLive,
        setIsLive,
        comments,
        setComments,

        newComment,
        setNewComment,
        sentCom,
        setSentCom,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
