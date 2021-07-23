import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import history from './history'

import NavBar from '@/components/NavBar'
import DarkButton from '@/components/DarkButton'
import Home from '@/pages/Home'
import Works from '@/pages/Works'

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/works" component={Works} />
    </Switch>
    <NavBar/>
    <DarkButton/>
  </ConnectedRouter>
);

export default Routes;
