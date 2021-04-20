const site = 'http://localhost:8080';

export default function request(type, link, body) {

    var fetchOptions = {
        method: type
        , headers : {
            // 'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")
            'Content-Type' : 'application/json',
        }
        , body : JSON.stringify(body)
    }

    return fetch(site + link, fetchOptions)
        .then(response => response.json())
        .then(function (myJson) {
            console.log(myJson);
            return myJson
        });
}