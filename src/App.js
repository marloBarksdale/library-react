import './App.css';
import Book from './pages/book/Book';
import Signup from './pages/signup/Signup';
import Footer from './components/Footer';
import Search from './pages/search/Search';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

import { useAuth } from './hooks/useAuth';

function App() {
  const { mode } = useTheme();
  const { user, ready } = useAuth();
  return (
    <div className={`App ${mode}`}>
      {ready && (
        <Router>
          <Navbar />
          <ThemeSelector />
          <div className='content-wrap'>
            <Routes>
              <Route
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />}
              />
              <Route
                path='create'
                element={user ? <Create /> : <Navigate to='/login' />}
              />
              <Route
                path='search'
                element={user ? <Search /> : <Navigate to='/login' />}
              />
              <Route
                path='books/:id'
                element={user ? <Book /> : <Navigate to='/login' />}
              />
              <Route
                path='login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='signup'
                element={!user ? <Signup /> : <Navigate to='/' />}
              />
            </Routes>
          </div>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
