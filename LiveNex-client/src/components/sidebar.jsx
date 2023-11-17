import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="h-screen bg-gray-100 w-1/6 p-4 border-r border-gray-300">
      <ul>
        <li className="mb-2">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-800 font-normal text-lg leading-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45.5 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
            </svg>
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/tickets"
            className="flex items-center text-gray-600 hover:text-gray-800 font-normal text-lg leading-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21l-7-5 1.5-8 6.5 3 6.5-3 1.5 8-7 5z"
              />
            </svg>
            Tickets
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/destinations"
            className="flex items-center text-gray-600 hover:text-gray-800 font-normal text-lg leading-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.70s-.04-.47-.09-.70l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.70L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
            </svg>
            Destinations
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/pastlives"
            className="flex items-center text-gray-600 hover:text-gray-800 font-normal text-lg leading-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
            </svg>
            Past Lives
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/upcominglives"
            className="flex items-center text-gray-600 hover:text-gray-800 font-normal text-lg leading-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
            </svg>
            Upcoming Lives
          </Link>
        </li>
      </ul>
    </div>
  );
}
