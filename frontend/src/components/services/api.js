import axios from "axios";

const api = axios.create({
  baseURL: "https://lifebridge-ai-backend.onrender.com",
});

export default api;