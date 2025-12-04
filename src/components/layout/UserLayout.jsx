// src/components/layout/UserLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/UserLayout.css";

const UserLayout = () => (
  <div className="layout">
    <aside className="sidebar">
      <h2>Smart Lock</h2>
      <nav>
        <Link to="/user/profile">Thông tin cá nhân</Link>
        <Link to="/user/devices">Khóa của tôi</Link>
        <Link to="/user/notifications">Thông báo</Link>
      </nav>
    </aside>
    <main className="content">
      <Outlet />
    </main>
  </div>
);

export default UserLayout;
