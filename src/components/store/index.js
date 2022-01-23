import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import * as reducers from './reducer';
import * as auth from '../auth/service';
import * as ads from '../../components/ads/service'

const api = {
  auth, ads
}


function logger(store) {
  return function (next) {
    return function (action) {
      console.log('****dispatching action****', action);
      const result = next(action);
      console.log('****new state****', store.getState());
      return result;
    };
  };
}

const configureStore = (preloadedState, { history }) => {
  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument({ api, history }),
    logger,
  ];

  const store = createStore(
    combineReducers({ ...reducers, router: connectRouter(history) }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
};

export default configureStore;