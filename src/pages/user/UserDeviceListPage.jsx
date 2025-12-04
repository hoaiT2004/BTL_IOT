// src/pages/user/UserDeviceListPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import deviceApi from "../../api/deviceApi";

const UserDeviceListPage = () => {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  const loadDevices = () => {
    deviceApi.getMyDevices().then((res) => setDevices(res.data));
  };

  useEffect(loadDevices, []);

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge status-${status}`}>
        {status === "online" ? "Online" : "Offline"}
      </span>
    );
  };

  return (
    <div className="device-list-container">
      <div className="device-list-header">
        <h1>Danh sách khóa của tôi</h1>
        <button
          className="btn-add-device"
          onClick={() => navigate("/user/devices/add")}
        >
          + Thêm khóa mới
        </button>
      </div>

      <div className="device-table">
        <div className="table-header">
          <div className="col-id">ID</div>
          <div className="col-name">Tên khóa</div>
          <div className="col-status">Trạng thái</div>
          <div className="col-version">Phiên bản</div>
          <div className="col-actions">Hành động</div>
        </div>
        {devices.length > 0 ? (
          devices.map((device) => (
            <div key={device._id} className="table-row">
              <div className="col-id">{device._id}</div>
              <div className="col-name">{device.deviceName}</div>
              <div className="col-status">{getStatusBadge(device.status)}</div>
              <div className="col-version">{device.version}</div>
              <div className="col-actions">
                <Link
                  to={`/user/devices/${device._id}`}
                  state={{ device }}
                  className="btn-view"
                >
                  Xem chi tiết
                </Link>
                {/* faces link removed: face management is available on device detail page */}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Chưa có khóa nào. Hãy thêm khóa mới để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDeviceListPage;
