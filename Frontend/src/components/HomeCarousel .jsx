import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Basic Swiper styles
import "swiper/css/navigation"; // Navigation buttons
import "swiper/css/pagination"; // Pagination dots
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const HomeCarousel = () => {
  return (
    <>
    
   
    <div className="h-[80vh] w-full px-5 py-4">
      <img src="/images/baner.png" alt="baner img" className="h-full w-full" />
    </div>
    </>
  );
};

export default HomeCarousel;
