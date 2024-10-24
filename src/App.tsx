import { BrowserRouter as BrowserRouter, Routes, Route} from 'react-router-dom';
import SignupPage from './components/SignupForm';
import LoginPage from './components/LoginForm';
import LandingPage from './components/LandingPage';
import AddProductsPage from './components/AddProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-products" element={<AddProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;