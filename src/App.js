import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
    
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          {/* <Route exact path="/" element={<News country="in" pageSize="7" category="general" setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />}></Route> */}
        </Routes>
        
        
      </Router>
    </>
  );
}

export default App;
