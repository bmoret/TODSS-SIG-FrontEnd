import {Router} from "@vaadin/router";
import {retrieveAccessToken, retrieveRefreshToken, storeAccessToken} from "./authorization-service";

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
    if (response.status >= 200 && response.status < 300) return response;
    if (response.status === 403) {
        refreshAccessTokenAndRetry()
    }
};
const refreshAccessTokenAndRetry = async () => {
    let bodyTokens = {
        refreshToken: retrieveRefreshToken(),
        accessToken: retrieveAccessToken().split("Bearer ")[1],
    };
    let response = await fetchRequest('POST', '/authenticate/refresh', bodyTokens)
    if (response.status === 200) {
        storeAccessToken(response.headers.get('Access-Token'))
        response = await fetchRequest(type, link, body);
        if (response.status >= 200 && response.status < 300) return response;
    }
    Router.go("/login");
}

const fetchRequest = (type, link, body) => {
    const fetchOptions = {
        method: type,
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(body)
    }
    let token = window.localStorage.getItem("access_token")
    token = token ? token : "";
    if (link !== "/authenticate/refresh") fetchOptions.headers['Access-Token'] = 'Bearer ' + token;

    return fetch(site + link, fetchOptions);
}
