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
 const navigate = useNavigate()
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
    <div className="w-full flex-col items-center px-20 overflow-hidden">
      {/* Heading and Navigation Buttons */}
      <div className="flex justify-between items-center p-10">
        <h1 className="text-4xl">Shop by Categories</h1>
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

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4} // Show 4 slides at a time
        slidesPerGroup={1} // Move 1 slide at a time
        loop={true} // Enables infinite looping Prevents empty spaces
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 min-h-[50vh] flex flex-col items-center py-2 relative">
              <h1 className="text-gray-600 text-7xl opacity-30 absolute font-bold">
                {item.text}
              </h1>
              <img
                src={item.img}
                alt={item.text}
                className="h-[45vh] w-full z-10 object-contain"
              />
              <button className="flex justify-center items-center px-20 py-4 bg-white rounded-xl border border-black text-xl absolute mt-60 z-10 cursor-pointer"
              onClick={()=>{
                navigate(`/category/${item.text2}`)
              }}
              >
                {item.text2}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
