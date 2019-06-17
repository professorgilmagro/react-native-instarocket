import axios from 'axios';
import conf from '../config/server';
const api = axios.create({
	baseURL: conf.getURL()
});

export default api;
