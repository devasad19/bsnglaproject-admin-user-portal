"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { relative_image_path } from "../../../helper/index";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay, Grid } from "swiper/modules";

const AppSlider = () => {
  const [sliders, setSliders] = useState([
    {
      image_url: "2nd_slider_banner1.jpg",
    },
    {
      image_url: "2nd_slider_banner2.jpg",
    },
    {
      image_url: "2nd_slider_banner3.jpg",
    },
    {
      image_url: "2nd_slider_banner4.jpg",
    },
  ]);
  return (
    <>
      {sliders?.length > 0 ? (
        <Swiper
          className="2xl:container 2xl:mx-auto"
          slidesPerView={1}
          loop={true}
          grid={{
            rows: 1,
          }}
          // spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation, Grid]}
        >
          {sliders?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" duration-700 ease-in-out !w-full !h-[500px]">
                <img
                  className=""
                  src={relative_image_path(item?.image_url)}
                  alt="2nd Slider Image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full h-[18vh] lg:h-[70vh] bg-gray-400 animate-pulse"></div>
      )}
    </>
  );
};

export default AppSlider;
