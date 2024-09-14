'use client'
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { relative_image_path } from "@/helper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay, Grid } from "swiper/modules";
import { type SliderType } from "@/types/SliderType";
import Image from "next/image";

export default function Slider({sliders}: SliderType): React.JSX.Element {
  return (
    <>
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
        {sliders?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <div className=" duration-700 ease-in-out !w-full !h-[25vh] lg:!h-[79vh]">
              <Image
                className=""
                src={relative_image_path(item?.image_url)}
                width={1920}
                height={1080}
                alt="Slider Image"
                loading="eager"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
