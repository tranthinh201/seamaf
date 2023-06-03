// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slider.css";

const listSlider = [
  {
    id: 1,
    content: "BEADS",
    text: "We have a wide range of beads from hair beads, necklaces, bracelets etc",
    image: "https://seamaf.com/storage/uploads/slides/Z9yoVM0xegWVum.webp",
    // button: ['BUY NOW', 'INQUIRE']
  },
  {
    id: 2,
    content: "Event planning and Management",
    text: "Event planning and Management",
    image: "https://seamaf.com/storage/uploads/slides/Z9yoVM0xegWVum.webp",
    // button: ['BUY NOW', 'INQUIRE']
  },
  {
    id: 3,
    content: "BEADS",
    text: "We do  event planning management for all different types of events from weddings, birthdays ,coopera...",
    image: "https://seamaf.com/storage/uploads/slides/Z9yoVM0xegWVum.webp",
    // button: ['BUY NOW', 'INQUIRE']
  },
];

const Slider: React.FC = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{ delay: 5000 }}
        loop={true}
        pagination={{
          el: "swiper-pagination-clone",
          type: "fraction",
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {listSlider.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-[url('https://seamaf.com/storage/uploads/slides/Z9yoVM0xegWVum.webp')] h-[300px] bg-no-repeat bg-cover fadeIn">
              <div className=" text-white container ssm:p-10 lg:m-auto flex flex-col justify-center h-full">
                <h1 className="text-[18px] font-bold mb-[5px]">
                  {item.content}
                </h1>
                <p className="text-[18px] font-[300] mb-[28px] text-animation">
                  {item.text}
                </p>
                <div className="flex text-animation">
                  <button className="border rounded-[8px] font-bold mr-2 px-12 pt-[10px] pb-2">
                    BUY NOW
                  </button>
                  <button className="border bg-white text-black rounded-[4px] font-bold px-12 pt-[10px] pb-2">
                    INQUIRE
                  </button>
                </div>
              </div>
              <div className="swiper-pagination-clone"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
