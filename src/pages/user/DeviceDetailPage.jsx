// src/pages/user/DeviceDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import deviceApi from "../../api/deviceApi";

const DeviceDetailPage = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [form, setForm] = useState({ deviceName: "" });

  useEffect(() => {
    deviceApi.getDeviceDetail(deviceId).then((res) => {
      setDevice(res.data);
      setForm({ deviceName: res.data.deviceName });
    });
  }, [deviceId]);

  const handleSave = async (e) => {
    e.preventDefault();
    await deviceApi.updateMyDevice(deviceId, form);
    const res = await deviceApi.getDeviceDetail(deviceId);
    setDevice(res.data);
  };

  if (!device) return <div>Loading...</div>;

  return (
    <div>
      <h1>Thông tin khóa</h1>
      <form onSubmit={handleSave} className="form">
        <input
          placeholder="Tên khóa"
          value={form.deviceName}
          onChange={(e) =>
            setForm((f) => ({ ...f, deviceName: e.target.value }))
          }
        />
        <button type="submit">Lưu</button>
      </form>

      <p>Firmware: {device.firmwareVersion}</p>

      <Link to={`/user/devices/${deviceId}/logs`}>Xem log ra vào</Link>
      <br />
      <Link to={`/user/devices/${deviceId}/faces`}>
        Đăng ký khuôn mặt
      </Link>
    </div>
  );
};

export default DeviceDetailPage;
