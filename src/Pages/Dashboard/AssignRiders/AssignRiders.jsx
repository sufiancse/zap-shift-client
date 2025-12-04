import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  const openRiderModalRef = (parcel) => {
    riderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  const handleAssignRider = (rider) => {
    console.log(rider)
    const assignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
    };

    axiosSecure.patch(``, assignInfo);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Assign Riders: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Create At</th>
              <th>Pickup Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.parcelName}</td>
                <td>{p.cost}</td>
                <td>{p.createdAt}</td>
                <td>
                  <div>
                    <p>
                      {p.senderAddress}, <br></br>
                      {p.senderDistrict}.
                    </p>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => openRiderModalRef(p)}
                    className="btn btn-primary"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Available Riders: {riders.length}
          </h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Rider Name</th>
                  <th>Rider Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((r, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(r)}
                        className="p-2 rounded-sm bg-primary text-medium"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default AssignRiders;
