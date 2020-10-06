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
            // if an error occurs on the server return the error as text (because we are returning plain text errors)
            return response.text().then(error => {
                throw (error)
            })
        })
        // Catch connection errors and the error throw above.
        .catch(error => {
            throw(error)
        })
}

export const checkStatus = (response: any) => {
    const hasError = (response.status < 200 || response.status > 300)
    if(response.status===403 && localStorage['token']) {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            window.location.reload();
        }
    if(hasError) {
        throw response.text()
    }
    return response;
}

export const parseJSON = (response: any) => response.json()

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);

export const deleteToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
}
