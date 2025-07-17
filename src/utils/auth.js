const baseUrl = "http://localhost:3001";

export const register = (name, avatar, email, password) => {
  return (fetch(``),
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return (fetch(``),
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const checkToken = (token) => {
  return (fetch(``),
{
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
  body:
})
}

//create check token http request - GET request

//then use checktone in app.js and use callback hook to check for token

//if token exists, then set isLoggedIn to true
