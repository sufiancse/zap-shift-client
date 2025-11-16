import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import LiveParcel from "../LiveParcel/LiveParcel";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <OurServices />
      <Brands />
      <LiveParcel />
      <Reviews />
    </div>
  );
};

export default Home;
