import {Router} from "@vaadin/router";
import {retrieveAccessToken, retrieveRefreshToken, storeAccessToken} from "./authorization-service";

const site = process.env.SNOWPACK_PUBLIC_API_URL || 'http://localhost:8080';

export const request = (type, link, body) => {
    return fetchFullRequest(type, link, body)
    .then(response => {
      if (!response || response.headers.get("Content-Length") === "0") return {};
      return response.json();
    })
}

export const fetchFullRequest = async (type, link, body) => {
    let response = await fetchRequest(type, link, body);
    if (response.status >= 200 && response.status < 300) return response;
    if (response.status === 403) {
        return await refreshAccessTokenAndRetry(type, link, body)
    }
};
const refreshAccessTokenAndRetry = async (type, link, body) => {
    let accessToken = retrieveAccessToken().replace("Bearer ", "")
    let bodyTokens = {
        refreshToken: retrieveRefreshToken(),
        accessToken: accessToken,
    };
    let response = await fetchRequest('POST', '/authenticate/refresh', bodyTokens)
    if (response.status === 200) {
        storeAccessToken("Bearer " + response.headers.get('Access-Token'))
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
    if (link !== "/authenticate/refresh") fetchOptions.headers['Access-Token'] = token;

    return fetch(site + link, fetchOptions);
}
