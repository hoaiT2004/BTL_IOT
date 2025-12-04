// src/api/deviceApi.js
import apiClient from "./apiClient";

// Mock data for devices
const mockDevices = [
  {
    _id: "device_001",
    deviceName: "Khóa Phòng Khách",
    mqttToken: "mqtt_token_001",
    status: "online",
    battery: 85,
    version: "v1.2.3",
    faces: [
      "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      "https://via.placeholder.com/120?text=Face2",
      "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870"
    ],
    lastSeen: new Date(),
  },
  {
    _id: "device_002",
    deviceName: "Khóa Cửa Chính",
    mqttToken: "mqtt_token_002",
    status: "online",
    battery: 92,
    version: "v1.2.5",
    faces: [
      "https://via.placeholder.com/120?text=FaceA"
    ],
    lastSeen: new Date(),
  },
  {
    _id: "device_003",
    deviceName: "Khóa Phòng Ngủ",
    mqttToken: "mqtt_token_003",
    status: "offline",
    battery: 45,
    version: "v1.2.1",
    faces: [],
    lastSeen: new Date(Date.now() - 3600000),
  },
];

const deviceApi = {
  // Admin
  // getAllDevices: () => apiClient.get("/admin/devices"),
  getAllDevices: () => Promise.resolve({data: mockDevices }),
  updateDeviceByAdmin: (id, data) => {
    const foundIndex = mockDevices.findIndex((d) => d._id === id);
    if (foundIndex > -1) {
      mockDevices[foundIndex] = { ...mockDevices[foundIndex], ...data };
      return Promise.resolve({ data: mockDevices[foundIndex] });
    }
    return apiClient.put(`/admin/devices/${id}`, data);
  },
  deleteDeviceByAdmin: (id) => {
    // const foundIndex = mockDevices.findIndex((d) => d._id === id);
    // if (foundIndex > -1) {
    //   const removed = mockDevices.splice(foundIndex, 1);
    //   return Promise.resolve({ data: removed[0] });
    // }
    return apiClient.delete(`/admin/devices/${id}`);
  },

  // User
  getMyDevices: () => 
    Promise.resolve({ data: mockDevices }),
  createDevice: (data) => apiClient.post("/users/me/devices", data),
  // getDeviceDetail: return device summary including faces (mock implementation)
  getDeviceDetail: (id) => {
    const found = mockDevices.find((d) => d._id === id);
    if (found) {
      return Promise.resolve({ data: found });
    }
    return apiClient.get(`/users/me/devices/${id}`);
  },
  // (faces are returned as part of getDeviceDetail)
  updateMyDevice: (id, data) =>
    apiClient.put(`/users/me/devices/${id}`, data),
  getDeviceLogs: (id, params) =>
    apiClient.get(`/users/me/devices/${id}/logs`, { params }),
};

export default deviceApi;
