import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import QuickAccess from '../components/QuickAccess';
import Operations from '../components/Operations';
import History from '../components/History';
import Products from '../components/Products';
import Sustainability from '../components/Sustainability';
import CTA from '../components/CTA';

function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <QuickAccess />
      <Operations />
      <History />
      <Products />
      <Sustainability />
      <CTA />
    </>
  );
}

export default Home;
