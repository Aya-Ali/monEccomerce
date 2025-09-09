'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductImageSlider({ images }: { images: string[] }) {
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
        <Slider {...settings} >


            {images.map((image) => {
                return <div key={image}>
                    <Image src={image} alt="img1" width={1000} height={500} className="w-full object-cover h-96 " />
                </div>
            })}


        </Slider>

    )
}
