import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import Login from './pages/login';
import Signup from './pages/Signup';
import './styles/global.css';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Navbar />
            <SearchBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;