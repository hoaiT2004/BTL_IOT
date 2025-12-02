// src/pages/user/UserDeviceListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import deviceApi from "../../api/deviceApi";

const UserDeviceListPage = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ deviceName: "", mqttToken: "" });

  const loadDevices = () => {
    deviceApi.getMyDevices().then((res) => setDevices(res.data));
  };

  useEffect(loadDevices, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await deviceApi.createDevice(newDevice);
    setNewDevice({ deviceName: "", mqttToken: "" });
    loadDevices();
  };

  return (
    <div>
      <h1>Khóa của tôi</h1>

      <form onSubmit={handleCreate} className="form">
        <input
          placeholder="Tên khóa"
          value={newDevice.deviceName}
          onChange={(e) =>
            setNewDevice((d) => ({ ...d, deviceName: e.target.value }))
          }
        />
        <input
          placeholder="MQTT Token"
          value={newDevice.mqttToken}
          onChange={(e) =>
            setNewDevice((d) => ({ ...d, mqttToken: e.target.value }))
          }
        />
        <button type="submit">Thêm khóa mới</button>
      </form>

      <ul>
        {devices.map((d) => (
          <li key={d._id}>
            <Link to={`/user/devices/${d._id}`}>{d.deviceName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDeviceListPage;
