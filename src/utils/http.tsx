export const baseUrl = "http://localhost:8080/";

type Config = {
    headers?: Object | null,
    noAuth?: boolean,
};

const request = (url: string, method: string, body: Object | null, config: Config) => {
    const token = localStorage['token'];
    let headers = (!config.noAuth && token) ? {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
    } : {"Content-Type": "application/json"};
    const configuration: Object = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
    };
    return fetch(baseUrl + url, configuration)
        .then(response => {
            if(response.ok) return response.json();
            // if the token has expired log out the user
            else if(response.status === 403 && localStorage['token']) {
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                window.location.reload();
            }

            // if an error occurs on the server return the errorMessage in case we intentionally threw that error, or a generic one in case an unexpected exception rises.
            return response.json().then(error => {
                if(error.hasOwnProperty('message')) {
                    throw (error.message)
                } else throw new Error("¡Error inesperado del servidor!")
            })
        })
        // Catch connection errors and the error throw above.
        .catch(error => {
            throw(error)
        })
}


const clear = (isAdmin: boolean, config: Config) => {
    const token = localStorage['token'];
    let headers = (!config.noAuth && token) ? {"Content-Type": "application/json", Authorization: "Bearer " + token} : {"Content-Type": "application/json"};
    const configuration: Object = {
        method: "DELETE",
        body: undefined,
        headers: headers,
    };
    return fetch(baseUrl + `loan/${isAdmin? "admin" : "user"}/clear`, configuration)
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const getWithBody = (url: string, body: Object, config = {}) => request(url, "GET", body, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);
export const clearLoans = (isAdmin: boolean, config = {}) => clear(isAdmin, config);

export const deleteToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('fullName');
}
