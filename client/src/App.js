import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from "./components/exercisescomponent"
import CreateExercise from "./components/createexercise"
import EditExercise from "./components/editexercise"
import CreateUser from "./components/createuser"
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
   <Route path="/" exact component={ExercisesList}/>
   <Route path="/edit/:id" exact component={EditExercise}/>
   <Route path="/create" exact component={CreateExercise}/>
   <Route path="/about" exact component={About}/>
   <Route path="/user" exact component={CreateUser}/>
  
    </Router>
  );
}

export default App;
