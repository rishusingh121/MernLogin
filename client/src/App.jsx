import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../public/font-awesome.min.css";
import "../public/responsive.css";
import "../public/style.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from '../components/Home';
import Contact from '../components/Contact';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Error from '../components/Error';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
