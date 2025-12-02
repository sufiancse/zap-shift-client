import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <h1 className="text-5xl text-center font-bold ">Loading</h1>;
  }

  return (
    <div>
      <h2>
        Pay ${parcel.cost} for : {parcel.parcelName}
      </h2>
      <button
        onClick={handlePayment}
        className="btn bg-primary text-black font-semibold"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
