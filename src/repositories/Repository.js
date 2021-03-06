import axios from 'axios';
// import store from '../store/modules/login';

const baseDomain = 'http://localhost:3000/api';
const baseURL = `${baseDomain}`;
// const { token } = store.state;
export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accesss-Control-Allow-Origin': '*',
    'Accesss-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: localStorage.getItem('jwt'),
  },
});
