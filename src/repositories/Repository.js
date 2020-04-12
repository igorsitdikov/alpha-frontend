import axios from 'axios';

const baseDomain = 'http://localhost:3000';
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accesss-Control-Allow-Origin': '*',
    'Accesss-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: localStorage.getItem('jwt'),
  },
});
