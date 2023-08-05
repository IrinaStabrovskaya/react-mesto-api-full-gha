export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //проверка результа запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res.json);
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение данных пользователя с сервера
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //замена данных пользователя на сервере
  setInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //замена аватара пользователя
  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //получение начальных карточек с сервера
  getInitialsCards() {

    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //получение всех нужных данных для отрисовки первоначального состояния страницы
  getAllInitialData() {
    return Promise.all([this.getInfo(), this.getInitialsCards()]);
  }

  //добавить карточку
  setNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //запрос на постановку лайка
  isLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        cardId: cardId,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //запрос на удаление лайка
  disLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        cardId: cardId,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //запрос на удаление или постановку лайка, с проверкой наличия моего лайка
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.isLikeCard(cardId) : this.disLikeCard(cardId);
  }
}
export const api = new Api({

  url: "http://localhost:3000",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "content-type": "application/json",
  },
});
