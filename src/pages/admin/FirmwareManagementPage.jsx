// src/pages/admin/FirmwareManagementPage.jsx
import React, { useEffect, useState } from "react";
import firmwareApi from "../../api/firmwareApi";

const FirmwareManagementPage = () => {
  const [firmwareList, setFirmwareList] = useState([]);
  const [file, setFile] = useState(null);
  const [version, setVersion] = useState("");

  const load = () => {
    firmwareApi.listFirmware().then((res) => setFirmwareList(res.data));
  };

  useEffect(load, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !version) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("version", version);
    await firmwareApi.uploadFirmware(fd);
    setFile(null);
    setVersion("");
    load();
  };

  return (
    <div>
      <h1>Quản lý Firmware</h1>

      <form onSubmit={handleUpload} className="form">
        <input
          placeholder="Phiên bản (ví dụ 1.0.3)"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Tải lên</button>
      </form>

      <h2>Các bản firmware</h2>
      <ul>
        {firmwareList.map((fw) => (
          <li key={fw._id}>
            {fw.version} - {fw.filePath}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirmwareManagementPage;
