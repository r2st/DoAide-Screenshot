import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CodeScreenshot from './components/CodeScreenshot/CodeScreenshot';
import TweetScreenshot from './components/TweetScreenshot/TweetScreenshot';
import BrowserMockup from './components/BrowserMockup/BrowserMockup';
import PhoneMockup from './components/PhoneMockup/PhoneMockup';
import ComparisonSlider from './components/ComparisonSlider/ComparisonSlider';
import WebsiteCapture from './components/WebsiteCapture/WebsiteCapture';
import ImageAnnotator from './components/ImageAnnotator/ImageAnnotator';
import ImageCropper from './components/ImageCropper/ImageCropper';
import ScreenshotToPdf from './components/ScreenshotToPdf/ScreenshotToPdf';
import Blog from './pages/Blog';
import CodeScreenshotGuide from './pages/blog/CodeScreenshotGuide';
import AnnotationGuide from './pages/blog/AnnotationGuide';
import FreeScreenshotTools2025 from './pages/blog/FreeScreenshotTools2025';
import ScreenCaptureGuide from './pages/blog/ScreenCaptureGuide';
import WebsiteScreenshotSEO from './pages/blog/WebsiteScreenshotSEO';
import ImageAnnotationRemoteTeams from './pages/blog/ImageAnnotationRemoteTeams';

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
            <Route path="/capture" element={<WebsiteCapture />} />
            <Route path="/annotate" element={<ImageAnnotator />} />
            <Route path="/crop" element={<ImageCropper />} />
            <Route path="/pdf" element={<ScreenshotToPdf />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/how-to-create-beautiful-code-screenshots" element={<CodeScreenshotGuide />} />
            <Route path="/blog/screenshot-annotation-complete-guide" element={<AnnotationGuide />} />
            <Route path="/blog/free-screenshot-tools-for-designers-2025" element={<FreeScreenshotTools2025 />} />
            <Route path="/blog/screen-capture-guide-windows-mac-linux" element={<ScreenCaptureGuide />} />
            <Route path="/blog/website-screenshot-seo-audit-guide" element={<WebsiteScreenshotSEO />} />
            <Route path="/blog/image-annotation-remote-teams-guide" element={<ImageAnnotationRemoteTeams />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
