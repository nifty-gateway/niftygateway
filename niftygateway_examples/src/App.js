import React, { Component } from 'react';
import './App.css';
import '../../NiftyGatewayJS';

import DemoPage from './DemoPage.js';

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
    </div>
    </HashRouter>


  );
}

export default App;
