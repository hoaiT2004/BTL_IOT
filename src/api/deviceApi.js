// src/api/deviceApi.js
import apiClient from "./apiClient";

const deviceApi = {
  // Admin
  getAllDevices: () => apiClient.get("/admin/devices"),
  updateDeviceByAdmin: (id, data) => apiClient.put(`/admin/devices/${id}`, data),

  // User
  getMyDevices: () => apiClient.get("/users/me/devices"),
  createDevice: (data) => apiClient.post("/users/me/devices", data),
  getDeviceDetail: (id) => apiClient.get(`/users/me/devices/${id}`),
  updateMyDevice: (id, data) =>
    apiClient.put(`/users/me/devices/${id}`, data),
  getDeviceLogs: (id, params) =>
    apiClient.get(`/users/me/devices/${id}/logs`, { params }),
};

export default deviceApi;
