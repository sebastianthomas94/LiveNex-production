import React from 'react';

const Destinations = () => {
  const destinations = [
    { name: 'Twitch', iconClass: 'fa fa-twitch' },
    { name: 'Facebook', iconClass: 'fa fa-facebook' },
    { name: 'YouTube', iconClass: 'fa fa-youtube' },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Streaming Destinations</h2>
      <p className="mb-4">We currently provide streaming to the following platforms:</p>
      <ul className="list-disc pl-6">
        {destinations.map(destination => (
          <li key={destination.name} className="mb-2 flex items-center">
            <i className={destination.iconClass}></i>
            <span className="ml-2">{destination.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
