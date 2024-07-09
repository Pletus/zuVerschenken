import React, { useEffect } from "react";
import Herro from "../assets/Herro.png";
import Aos from "aos";
import "aos/dist/aos.css";
import Cards from "./Cards";
import "../components/CSS/Hero.css"

const Hero = ({ reload }) => {

  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <>
      <div className="w-full bg-white h-[800px]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-around">
          <div className="md:w-2/4 ">
            <h1
              className="heading text-blue-500 "
              data-aos="zoom-in-right"
            >
              Reduce, Reuse,
            </h1>
            <h1
              className="heading text-fuchsia-600"
              data-aos="zoom-in-left"
            >
              Rehome:
            </h1>

            <p className="heading-1 text-blue-500" data-aos="zoom-out">
              Give Your Goods a Second Life
            </p>
          </div>
          <div
            className="md:w-2/4"
            data-aos="fade-right"
            data-aos-offset="50"
            data-aos-easing="ease-in-sine"
          >
            <img
              src={Herro}
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
