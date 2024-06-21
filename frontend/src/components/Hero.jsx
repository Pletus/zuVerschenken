import React from 'react';
import HeroImage from '../assets/Hero.jpg'

const Hero = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Reduce, Reuse, Rehome:</h1>
          <p className="text-xl text-blue-500">Give Your Goods a Second Life</p>
        </div>
        <div className="md:w-1/2">
          <img src={HeroImage} alt="People rehoming items" className="w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Hero;