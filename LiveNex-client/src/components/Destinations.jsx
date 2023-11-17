import React from 'react';

const Destinations = () => {
  return (
    <div className=" m-5 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Streaming Platform</h1>
        <p className="text-lg mb-6">Stream your content to multiple platforms simultaneously:</p>
        <div className="flex justify-center space-x-4">
          <div className="bg-blue-500 p-4 rounded-md text-white flex items-center space-x-4">
            <i className="fa fa-facebook text-2xl"></i>
            <span className="font-semibold">Facebook</span>
          </div>
          <div className="bg-purple-600 p-4 rounded-md text-white flex items-center space-x-4">
            <i className="fa fa-twitch text-2xl"></i>
            <span className="font-semibold">Twitch</span>
          </div>
          <div className="bg-red-600 p-4 rounded-md text-white flex items-center space-x-4">
            <i className="fa fa-youtube text-2xl"></i>
            <span className="font-semibold">YouTube</span>
          </div>
        </div>
        <p className="text-lg mt-6">Join the leading streaming service now!</p>
      </div>
    </div>
  );
};

export default Destinations;
