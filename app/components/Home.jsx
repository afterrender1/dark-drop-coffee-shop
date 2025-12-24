import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedCoffee from "./FeaturedCoffee";
import WhyChooseUs from "./WhyChooseUs";
import OurProcess from "./OurProcess";
import CustomerReviews from "./CustomerReviews";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCoffee/>
      <WhyChooseUs />
      <OurProcess />
      <CustomerReviews />
    </>
  );
};

export default Home;
