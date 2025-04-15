import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Basic Swiper styles
import "swiper/css/navigation"; // Navigation buttons
import "swiper/css/pagination"; // Pagination dots
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const HomeCarousel = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[80vh] w-full px-1 py-1">
        <img
          src="/images/website baner.jpg"
          // src="/images/baner.png"
          alt="baner img"
          className="h-full w-full "
          onClick={() => {
            navigate(`/category/women`);
          }}
        />
      </div>
    </>
  );
};

export default HomeCarousel;
