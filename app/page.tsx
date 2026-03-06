import { Suspense } from "react";

import HeroSlider from "../components/HeroSlider";
import PropertySearch from "../components/PropertySearch";
import InfoSections from "../components/InfoSections";
import IntroBlurb from "../components/IntroBlurb";
import RecentlyListed from "../components/RecentlyListed";
import Benefits from "../components/Benefits";
import AboutSplit from "../components/AboutSplit";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";



export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <Suspense fallback={null}>
        <PropertySearch />
      </Suspense>
      <InfoSections />
      <IntroBlurb />
      <RecentlyListed />
      <AboutSplit />
      <FinalCTA />
      <Footer />
      {/* Next sections will go here (featured listings, about, etc.) */}
    </>
  );
}
