export const baseUrl = "http://localhost:8080/";

type Config = {
    headers?: Object | null,
    noAuth?: boolean,
};

const request = (url: string, method: string, body: Object | null, config: Config) => {
    const token = localStorage['token'];
    let headers = (!config.noAuth && token) ? {"Content-Type": "application/json", Authorization: "Bearer " + token} : {"Content-Type": "application/json"};
    const configuration: Object = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
    };
    return fetch(baseUrl + url, configuration)
        .then(res => {
            if(!res.ok){
                throw {status: res.status};
            }
            return res.json()
        })
        .catch(error => {
            if (error.status === 403 && token) {
                console.error('Token has expired');
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                window.location.reload();
            }
            throw error;
        });
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);

export const deleteToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
}
