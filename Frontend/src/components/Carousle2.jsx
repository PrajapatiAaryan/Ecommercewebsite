import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const items = [
  {
    id: 1,
    img: "/images/u1.jpeg",
    para: `Absolutely love shopping here! The website is easy to navigate and the product quality is top-notch. Fast delivery and helpful customer support make it my go-to platform.`,
    name: "Virat Kohli",
  },
  {
    id: 2,
    img: "/images/u2.jpeg",
    para: `The variety of products available is impressive. I ordered shoes and they fit perfectly. Delivery was quick and hassle-free. Totally worth it!`,
    name: "Chris Gayle",
  },
  {
    id: 3,
    img: "/images/u3.jpeg",
    para: `I've had a great experience every time I shop here. Products arrive on time, in perfect condition. Their return policy is fair and smooth too.`,
    name: "Ab De Villiers",
  },
  {
    id: 4,
    img: "/images/u4.webp",
    para: `Absolutely love shopping here! The website is easy to navigate and the product quality is top-notch. Fast delivery make it my go-to platform.`,
    name: "Rohit Sharma",
  },
  {
    id: 5,
    img: "/images/u5.webp",
    para: `I've had a great experience every time I shop here. Products arrive on time, in perfect condition. Their return policy is fair and smooth too.`,
    name: "Ms Dhoni",
  },
  {
    id: 6,
    img: "/images/u6.avif",
    para: `This site never disappoints. The user experience, quality of items, and delivery speed are always top class. Highly recommended for anyone shopping online.`,
    name: "Sachin Tendulkar",
  },
];


const Carousle2 = () => {
  const swiperDesktopRef = useRef(null);
  const swiperMobileRef = useRef(null);

  const goNext = () => {
    console.log("go next button is pressed");
    if (window.innerWidth >= 1024 && swiperDesktopRef.current) {
      swiperDesktopRef.current.slideNext();
    } else if (swiperMobileRef.current) {
      swiperMobileRef.current.slideNext();
    }
  };

  const goPrev = () => {
    console.log("go prev button is pressed");
    if (window.innerWidth >= 1024 && swiperDesktopRef.current) {
      swiperDesktopRef.current.slidePrev();
    } else if (swiperMobileRef.current) {
      swiperMobileRef.current.slidePrev();
    }
  };

  return (
    <div className="w-full flex-col items-center px-2 lg:px-20 pt-10 overflow-hidden ">
      {/* Heading and Navigation Buttons */}
      <div className="flex justify-between items-center px-3 lg:pb-10">
        <h1 className="text-2xl lg:text-3xl font-semibold">
          What Our Customer Say's
        </h1>
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

      {/* Swiper Carousel for laptop */}
      <div className="hidden lg:block">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          slidesPerGroup={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => (swiperDesktopRef.current = swiper)}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-center gap-3 bg-white rounded-2xl px-3 py-3 h-fit shadow-xl shadow-gray-100">
                <h1>⭐⭐⭐⭐⭐</h1>
                <p>{item.para}</p>
                <div className="flex gap-5 pt-5">
                  <img src={item.img} alt="" className="w-12 rounded-full" />
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

      {/* Swiper Carousel for phone */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          slidesPerGroup={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => (swiperMobileRef.current = swiper)}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-center gap-3 bg-white rounded-2xl px-3 py-3 h-fit">
                <h1>⭐⭐⭐⭐</h1>
                <p>{item.para}</p>
                <div className="flex gap-5 pt-5">
                  <img src={item.img} alt="" className="w-12 rounded-full" />
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
