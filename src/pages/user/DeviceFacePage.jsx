// src/pages/user/DeviceFacePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import faceApi from "../../api/faceApi";
import "../../styles/DeviceFacePage.css";

const DeviceFacePage = () => {
  const { deviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // faces provided by navigation state from UserDeviceListPage
  const navFaces = location?.state?.faces || [];
  const navDevice = location?.state?.device;
  const faces = navFaces || [];
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const ok = window.confirm("Bạn có chắc muốn upload ảnh này?");
    if (!ok) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      await faceApi.registerFace(deviceId, fd);
      // after successful upload, navigate back to device list
      navigate("/user/devices");
    } catch (err) {
      console.error(err);
      window.alert("Upload thất bại, thử lại sau");
    }
  };

  const handleDelete = async (faceId) => {
    const ok = window.confirm("Bạn có chắc muốn xóa ảnh khuôn mặt này?");
    if (!ok) return;

    try {
      // encode faceId in case it's a URL
      const id = encodeURIComponent(faceId);
      await faceApi.deleteFace(deviceId, id);
      // after successful delete, navigate back to device detail
      navigate(`/user/devices/${deviceId}`);
    } catch (err) {
      console.error(err);
      window.alert("Xóa thất bại, thử lại sau");
    }
  };

  return (
    <div className="device-face-container">
      <h1>Quản lý khuôn mặt</h1>
      <p className="device-name">Thiết bị: {navDevice?.deviceName || deviceId}</p>

      <h2>Danh sách khuôn mặt</h2>
      <ul className="face-list">
        {faces && faces.length > 0 ? (
          faces.map((f, idx) => (
            <li key={idx} className="face-item">
              <a href={f} target="_blank" rel="noreferrer">
                <img src={f} alt={`face-${idx}`} className="face-thumb" />
              </a>
              <div className="face-meta">
                <div className="face-title" hidden>Ảnh {idx + 1}</div>
                <div className="face-url" hidden>{f}</div>
              </div>
                <button className="btn-delete" onClick={() => handleDelete(f)}>Xóa</button>
            </li>
          ))
        ) : (
          <li className="no-faces">Chưa có ảnh khuôn mặt</li>
        )}
      </ul>

      <h2>Thêm ảnh khuôn mặt</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DeviceFacePage;
