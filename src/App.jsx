import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CodeScreenshot from './components/CodeScreenshot/CodeScreenshot';
import TweetScreenshot from './components/TweetScreenshot/TweetScreenshot';
import BrowserMockup from './components/BrowserMockup/BrowserMockup';
import PhoneMockup from './components/PhoneMockup/PhoneMockup';
import ComparisonSlider from './components/ComparisonSlider/ComparisonSlider';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-darker">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code" element={<CodeScreenshot />} />
            <Route path="/tweet" element={<TweetScreenshot />} />
            <Route path="/browser" element={<BrowserMockup />} />
            <Route path="/phone" element={<PhoneMockup />} />
            <Route path="/compare" element={<ComparisonSlider />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
