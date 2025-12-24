import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedCoffee from "./FeaturedCoffee";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCoffee/>
      <WhyChooseUs />
    </>
  );
};

export default Home;
