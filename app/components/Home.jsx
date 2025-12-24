import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedCoffee from "./FeaturedCoffee";
import WhyChooseUs from "./WhyChooseUs";
import OurProcess from "./OurProcess";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCoffee/>
      <WhyChooseUs />
      <OurProcess />
    </>
  );
};

export default Home;
