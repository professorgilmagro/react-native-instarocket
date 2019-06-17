import axios from 'axios';
import SrvConf from '../config/server';
const api = axios.create({
	baseURL: SrvConf.getURL()
});

export default api;
