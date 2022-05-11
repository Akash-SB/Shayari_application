import './App.css';
import NavigationBar from './components/Navbars/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from './components/Category/Category';
import Editor from './components/Editor/AddShayari'
import Writer from './components/Writer/Writer';
import Shayari from './components/Shayari/Shayari';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className='wrapper'>
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/shayari" element={<Shayari />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="/editor" element={<Editor />}/>
        </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
