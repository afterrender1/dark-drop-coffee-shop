import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedCoffee from "./FeaturedCoffee";
import WhyChooseUs from "./WhyChooseUs";
import OurProcess from "./OurProcess";
import CustomerReviews from "./CustomerReviews";
import CoffeeGallery from "./CoffeeGallery";
import Footer from "./Footer";

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
      <Footer />
    </>
  );
};

export default Home;
