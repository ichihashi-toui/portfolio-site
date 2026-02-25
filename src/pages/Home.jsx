import Hero from '../components/Hero';
import Contents from '../components/Contents';
import Profile from '../components/Profile';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <Contents />
      <Profile />
      <Gallery />
      <Footer />
    </div>
  );
}