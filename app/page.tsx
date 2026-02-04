import HeroSlider from "../components/HeroSlider";
import PropertySearch from "../components/PropertySearch";
import InfoSections from "../components/InfoSections";
import IntroBlurb from "../components/IntroBlurb";
import RecentlyListed from "../components/RecentlyListed";
import Benefits from "../components/Benefits";
import AboutSplit from "../components/AboutSplit";
import FinalCTA from "../components/FinalCTA";


export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <PropertySearch />
      <InfoSections />
      <IntroBlurb />
      <RecentlyListed />
      <AboutSplit />
      <Benefits />
      <FinalCTA />
      {/* Next sections will go here (featured listings, about, etc.) */}
    </>
  );
}
