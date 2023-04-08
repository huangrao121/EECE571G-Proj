<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 80d21e10c899037b1056427bbf0c1f977665f05a
import './App.css';
import Navigator from './components/navigator/navigator'
import Create from './components/create/create'
import Display from './components/display/display'
import { Route,Switch } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Navigator/>
      <Switch>
        <Route path="/createNewProj" component={Create}/>
        <Route path="/" component={Display}/>
      </Switch>
<<<<<<< HEAD
=======
import logo from "./logo.svg";
import "./App.css";
import Navigator from "./components/navigator/navigator";
function App() {
  return (
    <div className="App">
      <Navigator />
>>>>>>> hj
=======
>>>>>>> 80d21e10c899037b1056427bbf0c1f977665f05a
    </div>
  );
}

export default App;
