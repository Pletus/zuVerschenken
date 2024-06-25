import React from "react";
import HeroImage from "../assets/Hero.jpg";
import Cards from "../components/Cards";

const Hero = () => {
  return (
    <>
      <div className="w-full h-lvh bg-white py-16 pt-32">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-left md:w-2/4">
            <h1 className="text-6xl font-bold text-blue-600 mb-2">
              Reduce, Reuse, Rehome:
            </h1>
            <p className="text-4xl text-blue-500">
              Give Your Goods a Second Life
            </p>
          </div>
          <div className="md:w-2/4">
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
