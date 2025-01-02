"use client";
import { EffectCards } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";
import { relative_image_path } from "@/helper";
// import "./swiper.css";

type SliderProps = {
  data: any;
};

const SwiperCard = ({ data }: SliderProps) => {
  return (
    <>
      <div className="w-full max-w-[300px] lg:max-w-[600px] overflow-hidden">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {data?.length > 0 ? (
            data?.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                className="!w-[500px] !h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg flex justify-center items-center p-4"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.img}
                    className="w-full h-full  rounded-lg shadow-md transform"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg bg-black bg-opacity-50 px-4 py-2 rounded-lg shadow">
                    Slide {index + 1}
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <>
              <div className="!w-[500px] !h-[300px] bg-gray-300  rounded-lg shadow-lg flex justify-center items-center p-4">
                <p>Internet Connection Slow....</p>
              </div>
            </>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default SwiperCard;
