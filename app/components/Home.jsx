import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedCoffee from "./FeaturedCoffee";
import WhyChooseUs from "./WhyChooseUs";
import OurProcess from "./OurProcess";
import CustomerReviews from "./CustomerReviews";
import CoffeeGallery from "./CoffeeGallery";
import Footer from "./Footer";
import Contact from "./Contact";

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
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
