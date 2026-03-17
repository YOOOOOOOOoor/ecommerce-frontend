import axios from "axios";

// Centralized API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // frontend environment variable
  withCredentials: true, // needed if your backend uses cookies
});

export default API;
