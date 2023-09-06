import './assets/styles/index.scss';
import 'bootstrap/dist/css/bootstrap-grid.css';
import {Routes, Route} from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import MainPage from "./pages/MainPage";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <>
      <SearchComponent/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/books/:id' element={<BookPage/>}/>
      </Routes>
    </>
  );
}

export default App;
