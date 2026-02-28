import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ContentsList from './pages/ContentsList';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import ProjectDetail from './pages/ProjectDetail'; // これが正しくインポートされているか確認！

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<ContentsList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* URLを /contents/fomo などに対応させる */}
        <Route path="/contents/:id" element={<ProjectDetail />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;