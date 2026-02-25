import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ContentsList from './pages/ContentsList';
import ContentDetail from './pages/ContentDetail';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<ContentsList />} />
        <Route path="/contents/:id" element={<ContentDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;