export class Api {
  constructor(config) {
    this._url = config.url;
  }

  //проверка результа запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение данных пользователя с сервера
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  //замена данных пользователя на сервере
  setInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
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
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //получение начальных карточек с сервера
  getInitialsCards() {

    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
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
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
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
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  //запрос на постановку лайка
  isLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cardId: cardId,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //запрос на удаление лайка
  disLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
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
   url: "https://api.my-mesto.nomoreparties.co",
  //url: "http://localhost:3000",

});
