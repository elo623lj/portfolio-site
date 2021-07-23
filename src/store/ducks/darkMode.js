import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  changeDarkMode: [],
  darkModeLoadingFinish: [],
  darkModeTransitionStart: [],
  darkModeTransitionFinish: [],
})

export const DarkModeTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  isOn: false,
  isEnded: true,
  isLoading: false,
  isTransitioning: false,
})

/* Reducers */

const changeDarkMode = (state) => state.merge({
  ...state,
  isEnded: false,
  isLoading: true
})

const darkModeLoadingFinish = (state) => state.merge({
  ...state,
  isLoading: false,
})

const darkModeTransitionStart = (state) => state.merge({
  ...state,
  isTransitioning: true
})

const darkModeTransitionFinish = (state) => state.merge({
  isOn: !state.isOn,
  isEnded: true,
  isTransitioning: false
})

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_DARK_MODE]: changeDarkMode,
  [Types.DARK_MODE_LOADING_FINISH]: darkModeLoadingFinish,
  [Types.DARK_MODE_TRANSITION_START]: darkModeTransitionStart,
  [Types.DARK_MODE_TRANSITION_FINISH]: darkModeTransitionFinish,
})
