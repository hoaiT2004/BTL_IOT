// src/api/faceApi.js
import apiClient from "./apiClient";

const faceApi = {
  registerFace: (deviceId, formData) =>
    apiClient.post(
      `/users/me/devices/${deviceId}/faces`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    ),
  deleteFace: (deviceId, faceId) =>
    apiClient.delete(`/users/me/devices/${deviceId}/faces/${faceId}`),
};

export default faceApi;
