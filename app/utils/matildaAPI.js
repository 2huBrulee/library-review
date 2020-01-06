import axios from 'axios';

export const v1 = axios.create({
  baseURL: `https://matilda.whooosreading.org/api/v1/`,
});
