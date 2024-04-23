import "../styles/global/layout.scss";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
