class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(Error);
  }

  getCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        method: 'GET',
      },
    }).then((res) => this._checkResponse(res));
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  updateUserId(data, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addCard({ name, link, jwt }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addLike(id, jwt) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  removeLike(id, jwt) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  removeCard(id, jwt) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  changeProfilePic(newAvatar, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.pep.students.nomoreparties.sbs',
});
export default api;
