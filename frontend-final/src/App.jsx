// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// Sets axios default values
// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BookList />} />
        <Route path="/create-book" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App