import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaShield, FaTrashCan } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import { FaEye, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users",searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const riderInfo = { role: "admin" };

    Swal.fire({
      title: `${user.displayName} make as admin?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirmed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, riderInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} marked as an admin.`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const riderInfo = { role: "user" };

    Swal.fire({
      title: `${user.displayName} removed from admin?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Removed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, riderInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} removed from admin.`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Total Users: {users.length}</h2>

      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search users"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="p-2 rounded-sm bg-red-500 cursor-pointer"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="p-2 rounded-sm bg-green-500 cursor-pointer"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>
                  {user.role !== "admin" ? (
                    <>
                      <button className="hover:bg-primary p-2 rounded-sm">
                        <FaTrashCan />
                      </button>
                      <button className="hover:bg-primary p-2 rounded-sm">
                        <FaEye />
                      </button>
                    </>
                  ) : (
                    <button className="hover:bg-primary p-2 rounded-sm">
                      <FaEye />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
