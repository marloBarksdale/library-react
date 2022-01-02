import './App.css';
import Book from './pages/book/Book';
import Search from './pages/search/Search';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='create' element={<Create />} />
          <Route path='search' element={<Search />} />
          <Route path='books/:id' element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
