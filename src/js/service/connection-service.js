const site = process.env.server || 'http://localhost:8080';

export default function request(type, link, body) {
    console.log(site)
    var fetchOptions = {
        method: type
        , headers : {
            // 'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")
            'Content-Type' : 'application/json',
        }
        , body : JSON.stringify(body)
    }

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