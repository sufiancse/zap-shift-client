import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const [serviceCenter, setServiceCenter] = useState([]);
  const mapRef = useRef(null)

  useEffect(() => {
    fetch("./serviceCenter.json")
      .then((data) => data.json())
      .then((data) => setServiceCenter(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if(district){
        const coOrdinate = [district.latitude, district.longitude]

        // go to the location
        mapRef.current.flyTo(coOrdinate, 14)
        
    }
  };

  return (
    <div className="bg-white rounded-2xl p-10 mb-10 space-y-8">
      <h1 className="headings">We are available in 64 districts</h1>

      <div>
        <form onSubmit={handleSearch}>
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
              type="search"
              name="location"
              className="grow"
              placeholder="Search"
            />
          </label>
        </form>
      </div>

      <div className="divider"></div>

      <h1 className="content-title">We deliver almost all over Bangladesh</h1>

      <div className="w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenter.map((center, i) => (
            <Marker key={i} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
