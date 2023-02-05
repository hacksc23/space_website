import logo from './logo.svg';
import './App.css';
import PictureofToday from './Component/PictureofToday.js';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  
  return (
    <div className="App">
        <PictureofToday />
        <div className="router-wrapper">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact component={PictureofToday} />
            <Route path='/Calendar' component={PictureofToday} />
            <Route path='/Mars' componenet={PictureofToday} />
          </Routes>
        </Router>

        </div>

    </div>
  );
}

export default App;
