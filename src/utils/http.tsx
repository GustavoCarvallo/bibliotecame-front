import React from 'react';

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
            if(res.status !== 200){
                throw Error(res.statusText);
            }
            return res.json()
        })
        // .catch(error => {
        //     // if (error.response.status === 403 && token) {
        //     //     console.error('Token has expired');
        //     //     localStorage.removeItem('token');
        //     //     window.location.reload();
        //     // }
        //     throw error;
        // });
}

export const postAndGetStatus = (url: string, body:Object, config: Config) => { //el post solo no devuelve los status
    const token = localStorage['token'];
    let headers = {...config.headers};
    if (!config.noAuth && token){
        headers = {...config.headers, Authorization: "Bearer " + token};
    }
    const configuration: Object = {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
        ...config,
    };
    return fetch( baseUrl + url, configuration).then(res => res.status);
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);
