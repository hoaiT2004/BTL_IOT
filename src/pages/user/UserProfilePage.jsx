// src/pages/user/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import authApi from "../../api/authApi";

const UserProfilePage = () => {
  const [profile, setProfile] = useState({ username: "", fullname: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    authApi.getMe().then((res) => setProfile(res.data));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await authApi.updateProfile(profile);
    setMessage("Đã lưu thay đổi");
  };

  return (
    <div>
      <h1>Thông tin cá nhân</h1>
      <form onSubmit={handleSave} className="form">
        <input value={profile.username} disabled />
        <input
          placeholder="Họ tên"
          value={profile.fullname || ""}
          onChange={(e) =>
            setProfile((p) => ({ ...p, fullname: e.target.value }))
          }
        />
        <button type="submit">Lưu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserProfilePage;
