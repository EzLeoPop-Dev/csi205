import AppHeader from "../components/appHeader";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import "../assets/css/otherr.css";

export default function AppLayout() {
  return (
    <div className="background-main min-h-screen flex flex-col justify-between">
      {/* 🔹 ส่วนบน */}
      <div>
        <AppHeader />
        <Navbar />
        <Outlet />
      </div>

      {/* 🔹 ส่วนล่าง */}
      <Footer />
    </div>
  );
}