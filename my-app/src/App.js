<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import PictureofToday from './Component/PictureofToday.js';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

=======
import DisplayEventsPage from './components/DisplayEventsPage';
>>>>>>> cd74b89 (date range search and display events)

function App() {

  
  return (
<<<<<<< HEAD
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
=======
    <>
      <DisplayEventsPage />
    </>
>>>>>>> cd74b89 (date range search and display events)
  );
}

export default App;
