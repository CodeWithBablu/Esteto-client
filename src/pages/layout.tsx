import "../styles/global/layout.scss";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { Toaster } from "react-hot-toast";
import { Theme, ThemePanel } from "@radix-ui/themes";

export default function Layout() {
  return (
    <Theme>
      <div className="layout">
        <Navbar />
        <Toaster />
        <div className="content">
          <Outlet />
        </div>
      </div >
      <ThemePanel />
    </Theme>
  );
}
