import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import configureStore from './components/store/index';
import { createBrowserHistory } from 'history';
import Root from './components/Root';


// const render = () => console.log(store.getState());
// render();
// store.subscribe(render);
// store.dispatch(authLogin());
// store.dispatch(authLogout());
const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);
const history = createBrowserHistory();


const store = configureStore({ auth: !!accessToken }, { history });


ReactDOM.render(
  // <React.StrictMode>
  <Root store={store} history={history}>
    <App />
  </Root>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

