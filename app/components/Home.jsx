import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedCoffee from "./FeaturedCoffee";
import WhyChooseUs from "./WhyChooseUs";
import OurProcess from "./OurProcess";
import CustomerReviews from "./CustomerReviews";
import CoffeeGallery from "./CoffeeGallery";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCoffee />
      <WhyChooseUs />
      <OurProcess />
      <CustomerReviews />
      <CoffeeGallery />
    </>
  );
};

export default Home;
