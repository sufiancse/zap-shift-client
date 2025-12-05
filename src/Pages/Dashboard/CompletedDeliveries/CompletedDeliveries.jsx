import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {

    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold">
        Completed Deliveries: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Parcel Name</th>
              <th>Create At</th>
              <th>Pickup Location</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.parcelName}</td>
                <td>{p.createdAt}</td>
                <td>
                  <div>
                    <p>
                      {p.senderAddress}, <br></br>
                      {p.senderDistrict}.
                    </p>
                  </div>
                </td>
                <td>{p.cost}</td>
                <td>{calculatePayout(p)}</td>
                <td>
                  <button className="p-2 rounded-sm bg-primary text-medium">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
