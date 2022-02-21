import './App.css';
import Posts from './component/Posts';
import Awards from './component/awards'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Posts />}/>
        <Route exact path="/actors/get-awards" element={<Awards />}/>
      </Routes>
    </Router>
  );
}

export default App;
