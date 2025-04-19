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
      <div className="lg:h-[80vh] w-full px-3 py-4  ">
        <img
          src="/images/baner2.png"
          // src="/images/baner.png"
          alt="baner img"
          // loading="lazy"
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
