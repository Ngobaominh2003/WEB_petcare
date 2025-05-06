import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Trang chính ---
import HomePage from "./pages/HomePage";
import About from "./pages/About";

import Price from "./pages/Price";

import Blog from "./pages/Blog";

import BlogDetail from "./phanchinh/BlogDetail";
import Contact from "./pages/Contact";
import DichVuDS from "./pages/DichVu/DichVuDS";

import DatDichVu from "./pages/DatDichVu/DatDichVu";
import DichVuChiTiet from "./pages/DichVu/DichVuChiTiet";

// --- Tài khoản ---
import Login from "./TaiKhoan/login";
import Register from "./TaiKhoan/register";
import NguoiDung from "./TaiKhoan/QLTaiKhoan/NguoiDung";
import NhaCC from "./TaiKhoan/QLNhaCC/NhaCC";
import QLTaiKhoan from "./TaiKhoan/QLTaiKhoan/QLTaiKhoan";
import QLNhaCC from "./TaiKhoan/QLNhaCC/QLNhaCC";
import ThongKe from "./TaiKhoan/QLNhaCC/ThongKe";
import DatLich from "./TaiKhoan/QLTaiKhoan/DatLich";
import NhaCCYeuThich from "./TaiKhoan/QLTaiKhoan/NhaCCYeuThich";
import ThongBao from "./TaiKhoan/ThongBao";

import ThuCung from "./TaiKhoan/QLTaiKhoan/ThuCung";
import ThuCungAdd from "./TaiKhoan/QLTaiKhoan/ThuCungAdd";
import ThuCungUpdate from "./TaiKhoan/QLTaiKhoan/ThuCungUpdate";
import CachThanhToan from "./TaiKhoan/QLTaiKhoan/CachThanhToan";
// --- Quản lý dịch vụ ---
import DichVuQL from "./TaiKhoan/QLNhaCC/DichVuQL";
import DichVuAdd from "./TaiKhoan/QLNhaCC/DichVuAdd";
import DichVuUpdate from "./TaiKhoan/QLNhaCC/DichVuUpdate";
import DSLichDat from "./TaiKhoan/QLNhaCC/DSLichDat";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* --- Trang chính --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/About" element={<About />} />

        <Route path="/Price" element={<Price />} />

        <Route path="/Blog" element={<Blog />} />

        <Route path="/BlogDetail/:id" element={<BlogDetail />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/DichVuDS" element={<DichVuDS />} />

        <Route path="/DatDichVu" element={<DatDichVu />} />
        <Route path="/DichVuChiTiet/:id" element={<DichVuChiTiet />} />

        {/* --- Tài khoản --- */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/NguoiDung" element={<NguoiDung />} />
        <Route path="/NhaCC" element={<NhaCC />} />
        <Route path="/ThongKe" element={<ThongKe />} />
        <Route path="/QLTaiKhoan" element={<QLTaiKhoan />} />
        <Route path="/QLNhaCC" element={<QLNhaCC />} />
        <Route path="/DatLich" element={<DatLich />} />
        <Route path="/CachThanhToan" element={<CachThanhToan />} />
        <Route path="/NhaCCYeuThich" element={<NhaCCYeuThich />} />
        <Route path="/ThuCung" element={<ThuCung />} />
        <Route path="/ThongBao" element={<ThongBao />} />
        <Route path="/thu-cung/add" element={<ThuCungAdd />} />
        <Route path="/thu-cung/update/:id" element={<ThuCungUpdate />} />

        {/* --- Quản lý dịch vụ --- */}
        <Route path="/DichVuQL" element={<DichVuQL />} />
        <Route path="/DichVuAdd" element={<DichVuAdd />} />
        <Route path="/DichVuUpdate/:id" element={<DichVuUpdate />} />
        <Route path="/DSLichDat" element={<DSLichDat />} />
      </Routes>

      {/* ✅ Hiển thị Toast ở cuối app */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
