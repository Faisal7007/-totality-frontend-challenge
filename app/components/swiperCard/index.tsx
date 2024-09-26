"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import Image from "next/image";
const SwiperCard = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className=" w-full h-screen flex items-center justify-center"
      >
        <SwiperSlide className="first-swiper w-full  bg-center bg-no-repeat bg-cover flex items-center justify-center relative">
        <Image
          src={`/images/img4.jpg`}
          alt={`Image`}
          width={1000}
          height={1000}
         objectFit="contain" // Ensures the entire image fits without cropping
    className="w-full h-full"
        />
        </SwiperSlide>

        <SwiperSlide className="first-swiper w-full bg-center bg-no-repeat bg-cover flex items-center justify-center relative">
        <Image
          src={`/images/img2.jpg`}
          alt={`Image`}
          width={1000}
          height={1000}
       objectFit="contain" // Ensures the entire image fits without cropping
    className="w-full h-full"
        />
        </SwiperSlide>
        <SwiperSlide className="first-swiper w-full bg-center bg-no-repeat bg-cover flex items-center justify-center relative">
        <Image
          src={`/images/img7.jpg`}
          alt={`Image`}
          width={1000}
          height={1000}
          objectFit="contain" // Ensures the entire image fits without cropping
    className="w-full h-full"
        />
        </SwiperSlide>
        <SwiperSlide className="first-swiper w-full bg-center bg-no-repeat bg-cover flex items-center justify-center relative">
        <Image
          src={`/images/img3.jpg`}
          alt={`Image`}
          width={1000}
          height={1000}
         objectFit="contain" // Ensures the entire image fits without cropping
    className="w-full h-full"
        />
        </SwiperSlide>
        <SwiperSlide className="first-swiper w-full bg-center bg-no-repeat bg-cover flex items-center justify-center relative">
        <Image
          src={`/images/img1.webp`}
          alt={`Image`}
          width={1000}
          height={1000}
          objectFit="contain" // Ensures the entire image fits without cropping
    className="w-full h-full"
        />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwiperCard;
