import logo from './logo.svg';
import './App.css';
import PictureofToday from './components/PictureofToday.js';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayEventsPage from './components/DisplayEventsPage.js';


function App() {

  
  return (
    <div className="App">
        <div className="router-wrapper">
            <Navbar />
          </div>
        <PictureofToday />

        {/* <Router>
          <div className="router-wrapper">
            <Navbar />
          </div>
          <Routes>
            <Route path='/' exact component={PictureofToday} />
            <Route path='/calendar' component={DisplayEventsPage} />
            <Route path='/mars' componenet={PictureofToday} />
          </Routes>
        </Router> */}
    </div>
  );
}

export default App;
