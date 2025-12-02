// src/pages/admin/AdminDeviceListPage.jsx
import React, { useEffect, useState } from "react";
import deviceApi from "../../api/deviceApi";

const AdminDeviceListPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    deviceApi.getAllDevices().then((res) => setDevices(res.data));
  }, []);

  return (
    <div>
      <h1>Quản lý khóa hệ thống</h1>
      <table>
        <thead>
          <tr>
            <th>Tên khóa</th>
            <th>Chủ sở hữu</th>
            <th>Firmware</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d._id}>
              <td>{d.deviceName}</td>
              <td>{d.owner?.username}</td>
              <td>{d.firmwareVersion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDeviceListPage;
