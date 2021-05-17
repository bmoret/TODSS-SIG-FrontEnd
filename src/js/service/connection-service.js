const site = 'http://localhost:8080';

export default function request(type, link, body) {

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
            if (response.status >= 200 && response.status < 300) return response.json();
            throw "Error, something went wrong";
        })
        .then(function (myJson) {
            console.log(myJson);
            return myJson
        });
}