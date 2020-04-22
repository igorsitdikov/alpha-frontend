import axios from 'axios';

const baseDomain = 'http://ec2-3-249-124-139.eu-west-1.compute.amazonaws.com:3000/api';
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
