import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import { Overview, Upload, Play } from './pages'
import './App.css';

function App() {
  return (
    <div className="App">
        <NavLink to="/"><h1>Stand App</h1></NavLink>
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/play">Play</NavLink>
        <Switch>
          <Route exact path="/" component={Overview}/>
          <Route path="/upload" component={Upload}/>
          <Route path="/play" component={Play}/>
        </Switch>
    </div>
  );
}

export default App;
