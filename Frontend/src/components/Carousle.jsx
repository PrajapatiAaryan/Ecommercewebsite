import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const items = [
  { id: 1, text: "Casual", img: "/images/Casual.png", text2: "men" },
  { id: 2, text: "Ethic", img: "/images/ethic.png", text2: "women" },
  { id: 3, text: "Western", img: "/images/western.png", text2: "men" },
  { id: 4, text: "Kids", img: "/images/kids.png", text2: "men" },
  { id: 5, text: "Casual", img: "/images/western.png", text2: "shirt" },
];

const Carousel = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const renderSlides = () =>
    items.map((item, index) => (
      <SwiperSlide key={index}>
        <div className="bg-gray-50 min-h-[55vh] flex flex-col items-center py-2 relative ">
          <h1 className="text-gray-600 text-7xl opacity-30 absolute font-bold">
            {item.text}
          </h1>
          <img
            src={item.img}
            alt={item.text}
            className="h-[45vh] w-full z-10 object-contain"
          />
          <button
            className="flex justify-center items-center px-20 py-4 bg-white rounded-xl border border-black text-xl absolute mt-60 z-10 cursor-pointer"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/category/${item.text2}`);
            }}
          >
            {item.text2}
          </button>
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="w-full flex-col items-center lg:px-20 ">
      {/* Heading and Navigation */}
      <div className="flex justify-between items-center p-2 lg:p-10">
        <h1 className="text-2xl lg:text-4xl">Shop by Categories</h1>
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

      {/* Mobile View (1 slide) */}
      <div className="block sm:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {renderSlides()}
        </Swiper>
      </div>

      {/* Tablet View (2 slides) */}
      <div className="hidden sm:block lg:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={2}
          slidesPerGroup={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {renderSlides()}
        </Swiper>
      </div>

      {/* Laptop/Desktop View (4 slides) */}
      <div className="hidden lg:block">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          slidesPerGroup={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {renderSlides()}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
