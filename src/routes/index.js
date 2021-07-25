import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import store from '@/store'
import { Switch, Route, useLocation } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import history from './history'

import NavBar from '@/components/NavBar'
import DarkButton from '@/components/DarkButton'
import Home from '@/pages/Home'
import Works from '@/pages/Works'

const Routes = () => {

  const defaultLocation = useLocation()
  const location = useSelector(state => state.location.current)

  useEffect(() => {
    store.dispatch({ type: 'INIT_LOCATION', location: defaultLocation })
  }, [])

  useEffect(() => {
    store.dispatch({ type: 'SET_LOCATION_REQUEST', location: defaultLocation })
    document.body.classList.add("is-route-changing")
    console.log(location?.pathname, location?.pathname != '/')
    if (location?.pathname != '/') {
      setTimeout(
        () => store.dispatch({ type: 'SET_LOCATION' })
      , 400)
    }
  }, [defaultLocation])

  useEffect(() => {
    document.body.classList.remove("is-route-changing")
    if (location?.pathname == '/' || location?.pathname.includes('works') )
      document.body.classList.add("is-three-loading")
  }, [location])

  return (
    <Switch location={location?? defaultLocation}>
      <Route exact path="/" component={Home} />
      <Route path="/works" component={Works} />
    </Switch>
  )
}

export default function Router () {

  return (
    <ConnectedRouter history={history}>
      <Routes/>
      <NavBar/>
      <DarkButton/>
    </ConnectedRouter>
  )
}
