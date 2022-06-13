import './App.css';
import NavigationBar from './components/Navbars/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryEditor from './components/CategoryEditor/CategoryEditor';
import Editor from './components/Editor/AddShayari'
import Shayari from './components/Shayari/Shayari';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';
import ImageStatus from './components/Status/Status'
import StatusEditor from './components/ImageStatusEditor/ImageStatus'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className='wrapper'>
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/category-editor" element={<CategoryEditor />} />
          <Route path="/shayari" element={<Shayari />} />
          <Route path="/image-status" element={<ImageStatus />} />
          <Route path="/status-editor" element={<StatusEditor />} />
          <Route path="/editor" element={<Editor />}/>
        </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
