const baseUrl = "http://localhost:3001";
const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(checkServerResponse);
};

const postItems = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkServerResponse);
};

const deleteItems = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};

const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};

const editProfile = (profileData, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  }).then(checkServerResponse);
};

const addCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};

const removeCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};

module.exports = {
  checkServerResponse,
  getItems,
  postItems,
  deleteItems,
  getUserInfo,
  editProfile,
  addCardLike,
  removeCardLike,
};
