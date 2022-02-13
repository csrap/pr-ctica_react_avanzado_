import { areAdvertsLoaded, getAdvert } from './selector';

import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_SUCCESS,
  UI_RESET_ERROR,
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

export function authLoginSave(credentials) {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.loginSave(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: "/" } };
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
    try {
      const advert = await api.ads.getAd(advertId);
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
      const newAdvert = await api.ads.createAdvert(advert);
      // this call is neede because the created tweet is incomplete (sparrest)
      const createdAdvert = await api.ads.getAd(newAdvert.id);
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

export function advertDeleted() {
  return {
    type: ADVERT_DELETED_SUCCESS,
  };
}

export function deleteAdvert(advert) {
  return async function (dispatch, getState, { api, history }) {
    // dispatch createTweetRequest
    try {
      await api.ads.deleteAdvert(advert);
      // this call is neede because the created tweet is incomplete (sparrest)
      // const deletedAdvert = await api.service.getAdvert(advert.id);
      dispatch(advertDeleted());
      history.push(`/adverts/`);
    } catch (error) {
      // dispatch(createTweetFailure(error));
      // if (error.status === 401) {
      //   history.push('/login');
      // }
    }
  };
}