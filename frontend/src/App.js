import React from 'react';
import {HashRouter, Route} from 'react-router-dom'

import Register from './containers/register'
import Nav from './containers/nav'
import Portfolio from './containers/portfolio'

function App() {
  return (
    <HashRouter>
      <Route path='/' component={Nav}/>
      <Route path='/register' exact component={Register}/>
      <Route path='/portfolio' exact component={Portfolio}/>
    </HashRouter>
  );
}

export default App;
