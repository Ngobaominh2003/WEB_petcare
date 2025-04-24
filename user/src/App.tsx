import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Trang chính ---
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Service from "./pages/Service";
import Price from "./pages/Price";
import Booking from "./pages/Booking";
import Blog from "./pages/Blog";
import Blog2 from "./pages/Blog2";
import BlogDetail from "./phanchinh/BlogDetail";
import Contact from "./pages/Contact";
import DSDichVu from "./pages/DSDichVu";
import DatLich1 from "./pages/DatLich1";
import DatDichVu from "./pages/DatDichVu/DatDichVu";
import ThongTinDatLich from "./pages/DatDichVu/ThongTinDatLich";


// --- Tài khoản ---
import Login from "./TaiKhoan/login";
import Register from "./TaiKhoan/register";
import NguoiDung from "./TaiKhoan/NguoiDung";
import NhaCC from "./TaiKhoan/NhaCC";
import QLTaiKhoan from "./TaiKhoan/QLTaiKhoan";
import QLNhaCC from "./TaiKhoan/QLNhaCC";
import DatLich from "./TaiKhoan/DatLich";
import ThuCung from "./TaiKhoan/ThuCung";
import ThuCungAdd from "./TaiKhoan/ThuCungAdd";
import ThuCungUpdate from "./TaiKhoan/ThuCungUpdate";

// --- Quản lý dịch vụ ---
import DichVuQL from "./TaiKhoan/DichVuQL";
import DichVuAdd from "./TaiKhoan/DichVuAdd";
import DichVuUpdate from "./TaiKhoan/DichVuUpdate";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* --- Trang chính --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Price" element={<Price />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Blog2/:id" element={<Blog2 />} />
        <Route path="/BlogDetail/:id" element={<BlogDetail />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/DSDichVu" element={<DSDichVu />} />
        <Route path="/DatLich1" element={<DatLich1 />} />
        <Route path="/DatDichVu" element={<DatDichVu />} />
      

        {/* --- Tài khoản --- */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/NguoiDung" element={<NguoiDung />} />
        <Route path="/NhaCC" element={<NhaCC />} />
        <Route path="/QLTaiKhoan" element={<QLTaiKhoan />} />
        <Route path="/QLNhaCC" element={<QLNhaCC />} />
        <Route path="/DatLich" element={<DatLich />} />
        <Route path="/ThuCung" element={<ThuCung />} />
        <Route path="/thu-cung/add" element={<ThuCungAdd />} />
        <Route path="/thu-cung/update/:id" element={<ThuCungUpdate />} />
       
        {/* --- Quản lý dịch vụ --- */}
        <Route path="/DichVuQL" element={<DichVuQL />} />
        <Route path="/DichVuAdd" element={<DichVuAdd />} />
        <Route path="/DichVuUpdate/:id" element={<DichVuUpdate />} />
      </Routes>

      {/* ✅ Hiển thị Toast ở cuối app */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
