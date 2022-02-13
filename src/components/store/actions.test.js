import { authLoginRequest, advertsLoaded, authLogin } from './actions';
import {
  AUTH_LOGIN_REQUEST,
  ADVERTS_LOADED_SUCCESS,
} from './types';

describe('authLoginRequest', () => {

  test('should return an action with type  AUTH_LOGIN_REQUEST', () => {
    const expectedResult = {
      type: AUTH_LOGIN_REQUEST,
    };
    const result = authLoginRequest();
    expect(result).toEqual(expectedResult);
  }
  );

});

describe('advertLoaded', () => {
  test('should return an action with type ADVERTS_LOADED_SUCCESS', () => {
    const adverts = 'adverts';
    const expectedResult = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
    expect(advertsLoaded(adverts)).toEqual(expectedResult);
  });
});

// mockeando a una función a la acción 
describe('authLogin', () => {
  const credentials = 'credentials';
  const action = authLogin(credentials);
  describe('when login api resolves', () => {
    const api = { auth: { login: jest.fn().mockResolvedValue() } };
    const dispatch = jest.fn();
    const getState = () => { };
    const history = {
      location: {},
      replace: jest.fn(),
    };

    test('should dispatch an AUTH_LOGIN_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });
  });
});