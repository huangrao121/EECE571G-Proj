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
    </div>
  );
}

export default App;
