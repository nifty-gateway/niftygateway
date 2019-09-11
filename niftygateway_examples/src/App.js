import React, { Component } from 'react';
import './App.css';
import '../../NiftyGatewayJS';

import DemoPage from './DemoPage.js';
import Sandbox from './Sandbox.js';

import {
  Route,
  NavLink,
  HashRouter,
  Redirect
} from "react-router-dom";

function App() {

  return (
    <HashRouter>
    <div>
    
      <Route exact path='/' component={DemoPage} />
      <Route path="/Demo" component={DemoPage} />
      <Route path="/Sandbox" component={Sandbox} />

    </div>
    </HashRouter>


  );
}

export default App;
