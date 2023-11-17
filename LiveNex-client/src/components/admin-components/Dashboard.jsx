import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersMutation,
} from "../../slices/userApiSlice";

const Dashboard = () => {
  const [getUsers] = useGetUsersMutation();
  const [users, setUsers] = useState([]);
  const [deleteUser] = useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);


  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  

  useEffect(() => {
    getUsers()
      .unwrap()
      .then((res) => {
        const transformedUsersData = res.map(transformUserData);
        setUsers(transformedUsersData);
      })
      .catch((e) => console.log(e));
  }, []);

  const transformUserData = (userData) => {
    console.log(userData);
    const {
      _id,
      name,
      youtube,
      createdAt,
      updatedAt,
      twitch,
      facebook,
      razorpayDetails,
      email,
    } = userData;

    let platform = [];
    if (youtube) platform.push("youtube");
    if (twitch) platform.push("twitch");
    if (facebook) platform.push("facebook");
    let sub;
    if (razorpayDetails) sub = razorpayDetails.plan;
    else sub = "No Plan";
    let formattedDate;
    if (razorpayDetails?.endDate) {
      const isoDateString = razorpayDetails?.endDate;
      const date = new Date(isoDateString);

      formattedDate = date.toLocaleDateString("en-Uk", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else formattedDate = "";

    console.log(formattedDate); // Output: 12/05/2023

    const user = {
      id: _id,
      name: name || "Unknown Name",
      subscription: sub,
      validity: formattedDate,
      platforms: platform,
      blocked: false,
      email,
    };

    return user;
  };

  const deleteUserHandle = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    deleteUser(userId).unwrap();
    // Make an API call to delete the user from the server
  };
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="p-2 rounded border outline-none w-full"
        />
      </div>
      <table className="w-full rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">Serial No</th>
            <th className="p-4">User</th>
            <th className="p-4">Subscription Plan</th>
            <th className="p-4">Validity</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, i) => (
            <tr key={user.id} className="text-left">
              <td className="p-4">{i + 1}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">
                <span
                  className={`p-2 bg-${
                    user.subscription === "Basic" ? "green" : "blue"
                  }-100 text-xs rounded-lg`}
                >
                  {user.subscription}
                </span>
              </td>
              <td className="p-4">{user.validity}</td>
              {/* <td className="p-4">
                <div className="flex items-center">
                  {user.platforms.includes("twitch") && (
                    <i className="fa fa-twitch text-purple-500 mr-2"></i>
                  )}
                  {user.platforms.includes("facebook") && (
                    <i className="fa fa-facebook text-blue-500 mr-2"></i>
                  )}
                  {user.platforms.includes("youtube") && (
                    <i className="fa fa-youtube text-red-500 mr-2"></i>
                  )}
                </div>
              </td> */}
              <td className="p-4">
                <button
                  onClick={() => deleteUserHandle(user.id)}
                  className="px-4 py-2 bg-red-500 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="mx-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Prev
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentUsers.length < usersPerPage}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="mx-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
