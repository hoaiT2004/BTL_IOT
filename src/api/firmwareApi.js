// src/api/firmwareApi.js
import apiClient from "./apiClient";

const firmwareApi = {
  listFirmware: () => apiClient.get("/admin/firmware"),
  uploadFirmware: (formData) =>
    apiClient.post("/admin/firmware", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default firmwareApi;
