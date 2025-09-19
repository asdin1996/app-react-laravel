import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Login from "./components/signin/login";
import Books from "./components/pages/Books";
import BookEdit from "./components/pages/BooksEdit";
import Contacts from "./components/pages/Contacts";
import './i18n/i18n';
import './App.css';

const queryClient = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/edit/:id" element={<BookEdit />}/>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}
