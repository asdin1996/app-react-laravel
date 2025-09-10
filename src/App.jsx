import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Login from "./components/signin/login";
import Books from "./components/pages/Books";
import Contacts from "./components/pages/Contacts";
import './App.css'
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Login />} />
        </Routes>
         <Footer />
      </BrowserRouter>
    </div>
  );
}
