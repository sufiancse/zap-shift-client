import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="relative">
          <img src={bannerImg1} />
          <div className="banner-btn-div">
            <div className="flex items-center">
              <button className="btn-primary ">Track Your Parcel</button>
              <button className="btn-arrow">
                <FaArrowRight />
              </button>
            </div>
            <button className="btn-outline">Be a Rider</button>
          </div>
        </div>
        <div>
          <img src={bannerImg2} />
          <div className="banner-btn-div">
            <div className="flex items-center">
              <button className="btn-primary ">Track Your Parcel</button>
              <button className="btn-arrow">
                <FaArrowRight  />
              </button>
            </div>
            <button className="btn-outline">Be a Rider</button>
          </div>
        </div>
        <div>
          <img src={bannerImg3} />
          <div className="banner-btn-div">
            <div className="flex items-center">
              <button className="btn-primary ">Track Your Parcel</button>
              <button className="btn-arrow">
                <FaArrowRight  />
              </button>
            </div>
            <button className="btn-outline">Be a Rider</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
