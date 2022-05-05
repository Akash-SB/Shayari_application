import './App.css';
import AddShayari from './components/Shayari/AddShayari';
import NavigationBar from './components/Navbars/NavigationBar';
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="wrapper">        
        <AddShayari />
      </div>
    </div>
  );
}

export default App;
