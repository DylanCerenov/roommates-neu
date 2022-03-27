import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateProfilePage from './CreateProfilePage'
import SearchPage from './SearchPage'

function App() {
  return (
    <div className="app">
    <CreateProfilePage />
    <SearchPage />
    </div>
  );
}

export default App;
