import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, user_photoURL, review: testimonial } = review;
  return (
    <div>
      <div className="card w-full max-w-md bg-base-100 shadow-md p-6 rounded-2xl ">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-4xl text-primary mb-3 opacity-60" />

        {/* Testimonial Text */}
        <p className="text-gray-600 leading-relaxed mb-4 description">
         {testimonial}
        </p>

        {/* Divider */}
        <div className="border-t border-dashed my-4">
           
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary">
             <img src={user_photoURL} alt={userName} className="rounded-full" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">{userName}</h2>
            <p className="text-sm text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
