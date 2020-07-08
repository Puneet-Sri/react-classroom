import React from 'react';
import './App.css';
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import WorkArea from "./components/WorkArea";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Problem</Link>
                  </li>
                  <li>
                    <Link to="/workarea">WorkArea</Link>
                  </li>
                  <li>
                    <Link to="/solution">Solution</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <Switch>
              <Route path="/" exact component={Problem}/>
              <Route path="/workarea" exact component={WorkArea}/>
              <Route path="/solution" exact component={Solution}/>
            </Switch>
          </div>
        </Router>
    )
  }
}

export default App;
