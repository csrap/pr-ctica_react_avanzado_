import { areAdvertsLoaded, getAdvert } from './selector';

import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  UI_RESET_ERROR,
  CHECK_LOGIN,
  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILURE


} from './types';


export function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export function authLoginSuccess() {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
}

export function authLoginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
  };
}

export function authLogin(credentials) {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function authLogoutRequest() {
  return {
    type: AUTH_LOGOUT_REQUEST,
  };
}

export function authLogoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}

export function authLogoutFailure(error) {
  return {
    type: AUTH_LOGOUT_FAILURE,
    error: true,
    payload: error,
  };
}

export function authLogoutSession() {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.logout();
      dispatch(authLogout());
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLogoutFailure(error));
    }
  };
}

export function checkLogin() {
  return {
    type: CHECK_LOGIN,
  };
}

export function checkLoginRequest() {
  return {
    type: CHECK_LOGIN_REQUEST,
  };
}

export function checkLoginSuccess() {
  return {
    type: CHECK_LOGIN_SUCCESS,
  };
}

export function checkLoginFailure(error) {
  return {
    type: CHECK_LOGIN_FAILURE,
    error: true,
    payload: error,
  };
}

export function checkLoginRemember() {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.loginSave();
      dispatch(checkLogin());
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(checkLoginFailure(error));
    }
  };
}



export function advertsLoaded(adverts) {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
  };
}

export function loadAdverts() {
  return async function (dispatch, getState, { api }) {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    try {
      const adverts = await api.ads.getLastestdAds();
      dispatch(advertsLoaded(adverts));
    } catch (error) {
      // dispatch loadTweetsFailure
    }
  };
}

export function advertLoaded(advert) {
  return {
    type: ADVERT_LOADED_SUCCESS,
    payload: advert,
  };
}

export function loadAdvert(advertId) {
  return async function (dispatch, getState, { api, history }) {
    // const advert = getAdvert(getState(), advertId);
    // if (advert) {
    //   return;
    // }
    try {
      const advert = await api.adverts.getTweet(advertId);
      dispatch(advertLoaded(advert));
    } catch (error) {

    }
  };
}

export function advertCreated(advert) {
  return {
    type: ADVERT_CREATED_SUCCESS,
    payload: advert,
  };
}

export function createAdvert(advert) {
  return async function (dispatch, getState, { api, history }) {
    // dispatch createTweetRequest
    try {
      const newAdvert = await api.adverts.createTweet(advert);
      // this call is neede because the created tweet is incomplete (sparrest)
      const createdAdvert = await api.Adverts.getAdvert(newAdvert.id);
      dispatch(advertCreated(createdAdvert));
      history.push(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      // dispatch(createTweetFailure(error));
      // if (error.status === 401) {
      //   history.push('/login');
      // }
    }
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
