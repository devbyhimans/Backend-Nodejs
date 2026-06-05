import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlobBackground from './components/BlobBackground';
import Navbar from './components/Navbar';
import PostPage from './pages/PostPage';
import FeedPage from './pages/FeedPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Animated blob background — always rendered */}
      <BlobBackground />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/feed" element={<FeedPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
