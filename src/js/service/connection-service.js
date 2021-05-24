const site = 'http://localhost:8080';

export const request = (type, link, body) => {
  return fetchFullRequest(type, link, body)
    .then(response => {
      if (response.headers.get("Content-Length") === 0) return {};
      return response.json();
    })
}

export const fetchFullRequest = (type, link, body) => {
  let token = window.localStorage.getItem("access_token")
  token = token? token : "";
  const fetchOptions = {
    method: type,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };

  return fetch(site + link, fetchOptions)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw "Error, something went wrong";
    });
}