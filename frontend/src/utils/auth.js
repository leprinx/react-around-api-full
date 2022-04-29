const BASE_URL = 'https://api.pep.students.nomoreparties.sbs';
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(Error);
};

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => checkResponse(res))
  .then((res) => res);

export const login = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => checkResponse(res))
  .then((res) => {
    if (res.token) {
      localStorage.setItem('jwt', res.token);
      localStorage.setItem('email', email);
      return res;
    } return Promise.reject(Error);
  });

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => checkResponse(res))
  .then((data) => data);
