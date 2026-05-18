"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/assets/startup-1.jpg",
    title: "Turn Your Ideas Into Reality",
    description:
      "Share innovative startup ideas, inspire others, and bring creativity to life with IdeaVault.",
  },
  {
    image: "/assets/startup-2.jpg",
    title: "Explore Innovative Startups",
    description:
      "Discover unique ideas from entrepreneurs around the world and engage with a growing community of innovators.",
  },
  {
    image: "/assets/startup-3.jpeg",
    title: "Collaborate & Validate Ideas",
    description:
      "Join discussions, share feedback, and help shape the future of promising startup concepts through community interaction.",
  },
];

const Hero = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="lg:h-226 h-screen"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-screen bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center text-white px-5 max-w-5xl">
              <h1 className="text-5xl lg:text-7xl font-bold">{slide.title}</h1>

              <p className="mt-6 text-lg md:text-2xl">{slide.description}</p>

              <div className="flex gap-5 justify-center mt-8 flex-wrap">
                <button className="bg-[#1A6FBF]  px-6 py-3 rounded-3xl uppercase font-semibold hover:bg-[#3FA9D4] hover:cursor-pointer transition">
                  Explore Now
                </button>

                <button className="bg-white/20 backdrop-blur px-6 py-3 rounded-3xl uppercase font-semibold hover:bg-white/30 hover:cursor-pointer transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
