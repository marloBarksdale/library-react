import './App.css';
import Book from './pages/book/Book';
import Footer from './components/Footer';
import Search from './pages/search/Search';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />
        <div className='content-wrap'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='create' element={<Create />} />
            <Route path='search' element={<Search />} />
            <Route path='books/:id' element={<Book />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
