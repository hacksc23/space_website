import './App.css';
import PictureofToday from './components/PictureofToday.js';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <div className="router-wrapper">
        <Navbar />
      </div>
      <PictureofToday />

      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
