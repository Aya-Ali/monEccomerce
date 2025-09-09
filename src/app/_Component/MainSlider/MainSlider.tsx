'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  return (
    <div className="flex">
      <Slider {...settings} className="w-3/4">
        <div>
          <Image src={'/images/slider-image-1.jpeg'} alt="img1" width={1000} height={500} className="w-full object-cover h-96 " />
        </div>
        <div>
          <Image src={'/images/slider-image-2.jpeg'} alt="img1" width={1000} height={500} className="w-full object-cover h-96 " />
        </div>
        <div>
          <Image src={'/images/slider-image-3.jpeg'} alt="img1" width={1000} height={500} className="w-full object-cover h-96 " />
        </div>

      </Slider>

      <div className="w-1/4">

        <Image src={'/images/slider-image-1.jpeg'} alt="img1" width={1000} height={500} className="w-full object-cover h-48 " />
        <Image src={'/images/slider-image-2.jpeg'} alt="img1" width={1000} height={500} className="w-full object-cover h-48 " />


      </div>
    </div>
  );
}