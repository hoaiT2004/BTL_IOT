// src/pages/admin/UserManagementPage.jsx
import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullname: "",
  });

  const load = () => {
    userApi.getAllUsers().then((res) => setUsers(res.data));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userApi.createUser(form);
    setForm({ username: "", password: "", fullname: "" });
    load();
  };

  return (
    <div>
      <h1>Thêm tài khoản chủ khóa</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm((f) => ({ ...f, username: e.target.value }))
          }
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((f) => ({ ...f, password: e.target.value }))
          }
        />
        <input
          placeholder="Họ tên"
          value={form.fullname}
          onChange={(e) =>
            setForm((f) => ({ ...f, fullname: e.target.value }))
          }
        />
        <button type="submit">Tạo</button>
      </form>

      <h2>Danh sách người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Họ tên</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.fullname}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
