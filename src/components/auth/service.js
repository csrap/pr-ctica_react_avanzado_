import client, { removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client';
import storage, { session } from '../../utils/storage';

export const login = credentials => {
  return client.post('api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    session.set('auth', accessToken);
  });
};

export const loginSave = (credentials) => {
  return client
    .post('api/auth/login', credentials)
    .then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      storage.set("auth", accessToken);
    });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  })

