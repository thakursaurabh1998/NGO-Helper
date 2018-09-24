const backendAPI = "http://keralaflood-appreciative-panda.eu-gb.mybluemix.net/";

// const backendAPI = "http://localhost:5000/";

const headers = {
  Accept: "application/json"
};

export const postDistribute = data =>
  fetch(`${backendAPI}distribute`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const postValidate = data =>
  fetch(`${backendAPI}validate`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const getRequestList = () =>
  fetch(`${backendAPI}request`, { headers })
    .then(res => res.json())
    .catch(err => console.log(err));

export const getValidateList = () =>
  fetch(`${backendAPI}validate`, { headers })
    .then(res => res.json())
    .catch(err => console.log(err));