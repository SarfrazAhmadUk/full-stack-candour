import axios, { Method } from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export function sendRequest(url: string, method: Method = 'GET', data: any = {}) {
  return axios.request({
    url,
    method,
    baseURL: process.env.BASE_URL || BASE_URL,
    data
  });
}
