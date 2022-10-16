import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

const responseBody = (response: AxiosResponse) => response.data;

function get<T>(url: string) {
    return instance.get<T>(url).then(responseBody);
}

const http = {
    get,
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    postRaw: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export default http;