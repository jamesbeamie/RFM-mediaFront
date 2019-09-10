import axios from 'axios';
// import { BASE_URL } from '.';

const token = localStorage.getItem('token');
const urlPath = axios.create({
	baseURL: `http://127.0.0.1:8000/photography/royalframesmedia/`,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `${token}`
	}
});

export default urlPath;
