import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    let message = `Parcel status is update with ${status}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message.split("_").join(" "),
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Pending Pickup: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <div>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn p-2 bg-primary rounded-sm font-medium"
                      >
                        Accept
                      </button>
                      <button className="btn p-2 bg-warning rounded-sm font-medium ms-1">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="font-bold text-green-500">Accepted</p>
                  )}
                </td>
                <td>
                  <div>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn p-2 bg-primary rounded-sm font-medium"
                    >
                      Picked Up
                    </button>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn p-2 bg-primary rounded-sm font-medium"
                    >
                      Delivered
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
