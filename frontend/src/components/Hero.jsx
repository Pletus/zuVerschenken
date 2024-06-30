import React, { useEffect } from "react";
import HeroImage from "../assets/Hero.jpg";
import Cards from "../components/Cards";
import Aos from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <>
      <div className="w-full h-lvh bg-whit  py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-around">
          <div className="text-left md:w-2/4">
            <h1
              className="text-7xl font-bold text-blue-600 mb-2"
              data-aos="zoom-in-right"
            >
              Reduce, Reuse,
            </h1>
            <h1 className=" text-fuchsia-600 text-7xl font-bold" data-aos="zoom-in-left">
              Rehome:
            </h1>

            <p className="text-5xl pt-10 text-blue-500" data-aos="zoom-out">
              Give Your Goods a Second Life
            </p>
          </div>
          <div
            className="md:w-2/4"
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            <img
              src={HeroImage}
              alt="People rehoming items"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Cards />
    </>
  );
};

export default Hero;
