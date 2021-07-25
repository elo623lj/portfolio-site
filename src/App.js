import React, { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import { useProgress } from "@react-three/drei"

import store from './store'
import Routes from './routes'

import GlobalStyled from './styles/global'

document.body.classList.add("not-ready")

function App() {

  useEffect(async () => {
    const response = await fetch('/works.json')
    const works = await response.json()
    store.dispatch({ type: 'INIT_WORKS', data: works })
    
    setTimeout(
      () => document.body.classList.remove("not-ready")
    , 500)
  }, [])

  return (
    <Provider store={store}>
      <GlobalStyled/>
      <Routes/>
      <ThreeLoader/>
    </Provider>
  )
}

const ThreeLoader = () => {
  const darkMode = useSelector(state => state.darkMode)
  const location = useSelector(state => state.location.current)
  const { active, progress } = useProgress()

  // location load next scene
  let timeoutRef = useRef(null)
  useEffect(() => {
    if (!active && document.body.classList.contains("is-three-loading") ) {
      if (timeoutRef.current != null) 
        clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(
        () => {
          document.body.classList.remove("is-three-loading")
        }
      , 500)
    }
  }, [active, location])

  // dark mode load next scene
  let darkModeTimeoutRef = useRef(null)
  useEffect(() => {
    if (darkMode.isLoading && !active) {
      if (darkModeTimeoutRef.current != null) 
        clearTimeout(darkModeTimeoutRef.current)

      darkModeTimeoutRef.current = setTimeout(
        () => store.dispatch({ type: 'DARK_MODE_LOADING_FINISH' })
      , 1400)
    }
  }, [darkMode.isLoading, active])
  

  return null
}

export default App
