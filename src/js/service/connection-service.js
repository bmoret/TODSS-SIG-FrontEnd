const site = 'http://localhost:8080';

export const request = (type, link, body) => {
  return fetchFullRequest(type, link, body)
    .then(response => {
      if (response.getHeader("Content-Length") === 0) return {};
      return response.json();
    })
}

export const fetchFullRequest = (type, link, body) => {
  const fetchOptions = {
    method: type,
    headers: {
      'Authorization': 'Bearer ' + window.localStorage.getItem("access_token"),
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