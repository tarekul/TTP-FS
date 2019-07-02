import React from 'react';
import {HashRouter, Route} from 'react-router-dom'

import Register from './containers/register'
import Nav from './containers/nav'

function App() {
  return (
    <HashRouter>
      <Route path='/' component={Nav}/>
      <Route path='/register' exact component={Register}/>
    </HashRouter>
  );
}

export default App;
