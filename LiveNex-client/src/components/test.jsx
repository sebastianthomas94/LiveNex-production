import React from 'react';

const Test = ({ boardingTime, boardingPlace, destination, profileImage, rating, price }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:translate-y-1 ">
      {/* Left side - Boarding time, place, and destination */}
      <div className="px-4 py-4">
        <p className="text-sm text-gray-600">Boarding Time: {boardingTime}</p>
        <p className="text-sm text-gray-600">Boarding Place: {boardingPlace}</p>
        <p className="text-sm text-gray-600">Destination: {destination}</p>
      </div>

      {/* Profile picture, verified icon, and rating */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img src={profileImage} alt="Profile" className="h-10 w-10 rounded-full" />
          <div className="ml-2">
            <p className="text-sm font-semibold">User Rating: {rating}</p>
            <div className="flex items-center">
              <img src="verified_icon.png" alt="Verified" className="h-4 w-4 mr-1" />
              <p className="text-xs text-gray-500">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right top corner - Ride price */}
      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full">
        <p className="text-xs font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default Test;
