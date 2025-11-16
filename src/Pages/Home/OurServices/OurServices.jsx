import { useEffect, useState } from "react";

import serviceIcon from "../../../assets/service.png";

const OurServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("./ourServices.json")
      .then((data) => data.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="bg-secondary rounded-2xl p-10 my-10">
      <div className="text-center mb-6">
        <h1 className="text-white headings mb-3">Our Services</h1>
        <p className="description max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white hover:bg-primary rounded-2xl  flex flex-col items-center p-6 transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            <div className="bg-linear-to-b from-[#EEEDFC] to-[#EEEDFC00] p-2 rounded-full">
              <img src={serviceIcon} alt="service icon" className="w-10" />
            </div>
            <h1 className="content-title my-4 text-center">
              {service.title}
            </h1>
            <p className="text-center description">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
