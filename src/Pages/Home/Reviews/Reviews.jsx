import { useEffect, useState } from "react";

import icon from "../../../assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("./reviews.json")
      .then((data) => data.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="my-20">
      <div className="space-y-4 mb-10">
        <img src={icon} alt="" className="mx-auto" />
        <h1 className="headings text-center ">
          What our customers are sayings
        </h1>
        <p className="description max-w-3xl mx-auto text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <Swiper
        loop:true
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
