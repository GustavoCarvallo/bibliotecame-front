import React from 'react';
const baseUrl = "http://localhost:8080/"

const request = (url: string, method: string, body: Object | null, config: Object) => {
    const configuration = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        ...config,
    }
    return fetch( baseUrl + url, configuration).then(res => res.json());
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);
