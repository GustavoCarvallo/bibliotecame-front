export const baseUrl = "http://localhost:8080/";

type Config = {
    headers?: Object | null,
    noAuth?: boolean,
};

const request = (url: string, method: string, body: Object | null, config: Config) => {
    const token = localStorage['token'];
    let headers = {...config.headers};
    if (!config.noAuth && token){
        headers = {...config.headers, Authorization: "Bearer " + token};
    }
    const configuration: Object = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
        ...config,
    };
    return fetch(baseUrl + url, configuration)
        .then(res => {
            if(!res.ok){
                throw {status: res.status};
            }
            return res.json()
        })
        .catch(status => {
            if (status === 403 && token) {
                console.error('Token has expired');
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                window.location.reload();
            }
            throw status;
        });
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);