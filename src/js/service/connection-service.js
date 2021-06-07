import {Router} from "@vaadin/router";

const site = 'http://localhost:8080';

export const request = (type, link, body) => {
    return fetchFullRequest(type, link, body)
    .then(response => {
      if (response.headers.get("Content-Length") === "0") return {};
      return response.json();
    })
}

export const fetchFullRequest = async (type, link, body) => {
    let response = await fetchRequest(type, link, body);
    console.log(response)
    if (response.status >= 200 && response.status < 300) return response;
    if (response.status === 403) {
        let bodyTokens = {
            refreshToken: window.localStorage.getItem("refresh_token"),
            accessToken: window.localStorage.getItem("access_token"),
        };
        response = await fetchRequest('POST', 'authenticate/refresh', bodyTokens)

        console.log("fucker")
        if (response.status !== 200) {
            Router.go("/login");
            return;
        }
        response = await fetchRequest(type, link, body);
        if (response.status >= 200 && response.status < 300) return response;
    }
    // throw "error fetching";
};

const fetchRequest = async (type, link, body) => {
    let token = window.localStorage.getItem("access_token")
    token = token ? token : "";
    const fetchOptions = {
        method: type,
        headers: {
            'Access-Token': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
    return fetch(site + link, fetchOptions)
}
