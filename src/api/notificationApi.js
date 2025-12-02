// src/api/notificationApi.js
import apiClient from "./apiClient";

const notificationApi = {
  getMyNotifications: () => apiClient.get("/users/me/notifications"),
};

export default notificationApi;
