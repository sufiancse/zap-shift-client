import React from "react";
import { NavLink } from "react-router";

const AboutUs = () => {
  const links = (
    <>
      <li>
        <NavLink>Story</NavLink>
      </li>
      <li>
        <NavLink>Mission</NavLink>
      </li>
      <li>
        <NavLink>Success</NavLink>
      </li>
      <li>
        <NavLink>Team & Others</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-white p-10 rounded-2xl my-10">
      <h1 className="headings">About Us</h1>
      <p className="description max-w-2xl mt-5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="divider"></div>

      <ul className="flex gap-3 sm:gap-6 md:gap-9  lg:gap-10 font-bold">{links}</ul>
      <div className="space-y-5 mt-6">
        <p className="description">
          We started with a simple promise — to make parcel delivery fast,
          reliable, and stress-free. Over the years, our commitment to real-time
          tracking, efficient logistics, and customer-first service has made us
          a trusted partner for thousands. Whether it's a personal gift or a
          time-sensitive business delivery, we ensure it reaches its destination
          — on time, every time.
        </p>
        <p className="description">
          We started with a simple promise — to make parcel delivery fast,
          reliable, and stress-free. Over the years, our commitment to real-time
          tracking, efficient logistics, and customer-first service has made us
          a trusted partner for thousands. Whether it's a personal gift or a
          time-sensitive business delivery, we ensure it reaches its destination
          — on time, every time.
        </p>
        <p className="description">
          We started with a simple promise — to make parcel delivery fast,
          reliable, and stress-free. Over the years, our commitment to real-time
          tracking, efficient logistics, and customer-first service has made us
          a trusted partner for thousands. Whether it's a personal gift or a
          time-sensitive business delivery, we ensure it reaches its destination
          — on time, every time.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
