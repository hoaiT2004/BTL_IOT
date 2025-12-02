// src/api/authApi.js
import apiClient from "./apiClient";

const authApi = {
  login: (username, password) =>
    apiClient.post("/auth/login", { username, password }),
  getMe: () => apiClient.get("/auth/me"),
  updateProfile: (data) => apiClient.put("/users/me", data),
};

export default authApi;
