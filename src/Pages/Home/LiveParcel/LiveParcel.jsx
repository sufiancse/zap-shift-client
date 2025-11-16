import React from "react";
import image1 from "../../../assets/live-tracking.png";
import image2 from "../../../assets/safe-delivery.png";

const LiveParcel = () => {
  return (
    <div className="md:mx-10">
      <div className="border-t-2 border-dashed border-gray-300 pb-10"></div>

      <div className="space-y-5 pb-10">
        <div className="flex bg-white p-6 rounded-2xl">
          <img
            src={image1}
            alt="live tracking icon"
            className="max-w-[100px]"
          />
          <div className="border-r-2 border-dashed border-gray-300 mx-10"></div>
          <div className="">
            <h1 className="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">
              Live Parcel Tracking
            </h1>
            <p className="description">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
        <div className="flex bg-white p-6 rounded-2xl">
          <img
            src={image2}
            alt="live tracking icon"
            className="max-w-[100px]"
          />
          <div className="border-r-2 border-dashed border-gray-300 mx-10"></div>
          <div className="">
            <h1 className="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">
              100% Safe Delivery
            </h1>
            <p className="description">
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>
        <div className="flex bg-white p-6 rounded-2xl">
          <img
            src={image2}
            alt="live tracking icon"
            className="max-w-[100px]"
          />
          <div className="border-r-2 border-dashed border-gray-300 mx-10"></div>
          <div className="">
            <h1 className="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">
              24/7 Call Center Support
            </h1>
            <p className="description">
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 pb-10"></div>
    </div>
  );
};

export default LiveParcel;
