// src/pages/user/DeviceFacePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import faceApi from "../../api/faceApi";

const DeviceFacePage = () => {
  const { deviceId } = useParams();
  const [faces, setFaces] = useState([]);
  const [file, setFile] = useState(null);

  const loadFaces = () => {
    faceApi.listFaces(deviceId).then((res) => setFaces(res.data));
  };

  useEffect(loadFaces, [deviceId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    await faceApi.registerFace(deviceId, fd);
    setFile(null);
    loadFaces();
  };

  return (
    <div>
      <h1>Đăng ký khuôn mặt</h1>
      <form onSubmit={handleUpload} className="form">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      <h2>Danh sách khuôn mặt</h2>
      <ul>
        {faces.map((f) => (
          <li key={f._id}>
            {f.userName || f._id}
            <button
              onClick={() =>
                faceApi.deleteFace(deviceId, f._id).then(loadFaces)
              }
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceFacePage;
