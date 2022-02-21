import './App.css';
import Posts from './component/Posts';
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
      </Routes>
    </Router>
  );
}

export default App;
