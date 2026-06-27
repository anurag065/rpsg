import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import QuickAccess from '../components/QuickAccess';
import Industries from '../components/Industries';
import Products from '../components/Products';
import Sustainability from '../components/Sustainability';
import GlobalPresence from '../components/GlobalPresence';
import CTA from '../components/CTA';

function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <QuickAccess />
      <Industries />
      <Products />
      <Sustainability />
      <GlobalPresence />
      <CTA />
    </>
  );
}

export default Home;
