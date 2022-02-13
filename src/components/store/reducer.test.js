import { auth, adverts, defaultState } from './reducer';
import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADVERTS_LOADED_SUCCESS,
} from './types';

describe('auth', () => {
  test('should manage AUTH_LOGIN_SUCCESS action', () => {
    const action = {
      type: AUTH_LOGIN_SUCCESS,
    };
    expect(auth(undefined, action)).toBe(true);
  });



  test('should manage AUTH_LOGOUT action', () => {
    const action = {
      type: AUTH_LOGOUT,
    };
    expect(auth(undefined, action)).toBe(false);
  });


});


describe('adverts', () => {
  test('should manage ADVERTS_LOADED_SUCCESS action', () => {
    const payload = ['advert1'];
    const action = {
      type: ADVERTS_LOADED_SUCCESS,
      payload,
    };
    const expectedState = {
      loaded: true,
      data: payload,
    };
    expect(adverts(defaultState.adverts, action)).toEqual(expectedState);
  });
});




