import axios from "axios";

const apiUrl = 'http://localhost:3001/api';

const api = axios.create({ baseURL: apiUrl });

export default api;