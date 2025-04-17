import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

const items = [
  {
    id: 1,
    img: "/images/u1.jpeg",
    para: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum officiis inesciunt consequuntur excepturi, expedita facilis harum, quos molestias culpa itaque alias. Illo,voluptate!`,
    name:"Virat Kohli",
  },
  {
    id: 2,
    img: "/images/u2.jpeg",
    para: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum officiis inesciunt consequuntur excepturi, expedita facilis harum, quos molestias culpa itaque alias. Illo,voluptate!`,
    name:"Chris Gayle",
  },
  {
    id: 3,
    img: "/images/u3.jpeg",
    para: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum officiis inesciunt consequuntur excepturi, expedita facilis harum, quos molestias culpa itaque alias. Illo,voluptate!`,
    name:"Ab De villiers",

  },
  {
    id: 4,
    img: "/images/u1.jpeg",
    para: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum officiis inesciunt consequuntur excepturi, expedita facilis harum, quos molestias culpa itaque alias. Illo,voluptate!`,
    name:"Virat Kohli",
  },
  
];

const Carousle2 = () => {
  const swiperRef = useRef(null);

  // Function to go to next slide
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Function to go to previous slide
  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="w-full flex-col items-center px-2 lg:px-20 pt-10 overflow-hidden">
      {/* Heading and Navigation Buttons */}
      <div className="flex justify-between items-center px-3 lg:pb-10">
        <h1 className="text-2xl lg:text-3xl font-semibold">What Our Customer Say's</h1>
        <div className="flex gap-2 items-center">
          <button
            className="flex justify-center items-center p-4 border border-white bg-gray-50 rounded-md"
            onClick={goPrev}
          >
            <span className="material-icons-outlined">west</span>
          </button>
          <button
            className="flex justify-center items-center p-4 border border-white bg-gray-800 rounded-md text-white"
            onClick={goNext}
          >
            <span className="material-icons-outlined">east</span>
          </button>
        </div>
      </div>

      {/* Swiper Carousel for laptop*/}
      <div className="hidden lg:block">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3} // Show 4 slides at a time
        slidesPerGroup={1} // Move 1 slide at a time
        loop={true} // Enables infinite looping Prevents empty spaces
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-center gap-3 bg-white  rounded-2xl px-3 py-3 h-fit">
              <h1>⭐⭐⭐⭐</h1> 
              <p>
               {item.para}
              </p>
              <div className="flex gap-5 pt-5">
                <img
                  src={item.img}
                  alt=""
                  className="w-12 rounded-full"
                />
                <div>
                  <h1 className="text-xl text-black font-semibold">
                    {item.name}
                  </h1>
                  <h1 className="text-gray-600">Cricketer</h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      {/* Swiper Carousel for phone*/}
      <div className="block lg:hidden">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1} // Show 4 slides at a time
        slidesPerGroup={1} // Move 1 slide at a time
        loop={true} // Enables infinite looping Prevents empty spaces
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-center gap-3 bg-white  rounded-2xl px-3 py-3 h-fit">
              <h1>⭐⭐⭐⭐</h1> 
              <p>
               {item.para}
              </p>
              <div className="flex gap-5 pt-5">
                <img
                  src={item.img}
                  alt=""
                  className="w-12 rounded-full"
                />
                <div>
                  <h1 className="text-xl text-black font-semibold">
                    {item.name}
                  </h1>
                  <h1 className="text-gray-600">Cricketer</h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default Carousle2;
