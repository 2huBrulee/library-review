import axios from 'axios';

export const v1 = axios.create({
  baseURL: `https://matilda.whooosreading.org/api/v1/`,
  auth: {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  },
});
