import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import HeroSection from "../components/landing/HeroSection";
import CategoriesSection from "../components/landing/CategoriesSection";
import SlidesSection from "../components/landing/SlidesSection"; 
import HowItWorksSection from "../components/landing/HowItWorksSection";
import StatsSection from "../components/landing/StatsSection";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate("/map", { state: { query } });
  };

  const handleCategorySelect = (category) => {
    navigate("/map", { state: { category } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <Header/>
      {/* HERO */}
      <HeroSection onSearch={handleSearch} />

      {/* CATEGORIES */}
      <CategoriesSection onCategorySelect={handleCategorySelect} />

      {/* SLIDES */}
      <SlidesSection /> 

      {/* HOWITWORKS */}
      <HowItWorksSection/>

      {/* STATSSECTION */}
      <StatsSection/>

      {/* FAQ */}
      <FAQSection/>

      {/* FOOTER */}
      <Footer/>
    </div>
  );
};

export default LandingPage;



