import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [riderData, setRiderData] = useState([]);

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status set to ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then(() => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Rider has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  const handleViewDetails = (rider) => {
    setRiderData(rider);

    document.getElementById("my_modal_5").showModal();
  };

  const {
    name,
    drivingLicense,
    email,
    region,
    district,
    nid,
    phoneNo,
    bikeDetails,
    bikeRegistrationNo,
    aboutYourself,
  } = riderData || {};

  return (
    <div>
      <h2 className="text-4xl font-bold">
        Approve Pending Riders: {riders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((r, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{r.name} </td>
                <td>{r.email}</td>
                <td>{r.district}</td>

                <td>
                  <span
                    className={`font-medium ${
                      r.status === "approved"
                        ? "text-green-500"
                        : r.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td>{r.workStatus}</td>

                <td>
                  <button
                    onClick={() => handleViewDetails(r)}
                    className="p-2 rounded-sm hover:bg-primary cursor-pointer"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(r)}
                    className="p-2 rounded-sm hover:bg-primary cursor-pointer"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(r)}
                    className="p-2 rounded-sm hover:bg-primary cursor-pointer"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-2 rounded-sm hover:bg-primary cursor-pointer"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* rider details modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rider Details</h3>

          <section className="py-4 space">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNo}</p>
            <p>NID Number: {nid}</p>
            <p>Region: {region}</p>
            <p>District: {district}</p>
            <p>Email: {email}</p>
            <p>Bike Details: {bikeDetails}</p>
            <p>Driving License: {drivingLicense}</p>
            <p>Bike Registration Number: {bikeRegistrationNo}</p>
            <p>About Rider: {aboutYourself}</p>
            <p>Status: {riderData.status}</p>
          </section>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRiders;
