// src/api/userApi.js (dùng cho admin tạo chủ khóa)
import apiClient from "./apiClient";

const userApi = {
  getAllUsers: () => apiClient.get("/admin/users"),
  createUser: (data) => apiClient.post("/admin/users", data),
};

export default userApi;
