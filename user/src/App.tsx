import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Service from "./pages/Service";
import Price from "./pages/Price";
import Booking from "./pages/Booking";
import Blog from "./pages/Blog";
import Blog2 from "./pages/Blog2";
import BlogDetail from "./phanchinh/BlogDetail";
import Contact from "./pages/Contact";

import DatLich1 from "./pages/DatLich1";
import ThanhToan from "./pages/ThanhToan";
import Login from "./TaiKhoan/login";
import Register from "./TaiKhoan/register";
import NguoiDung from "./TaiKhoan/NguoiDung";
import NhaCC from "./TaiKhoan/NhaCC";
import QLTaiKhoan from "./TaiKhoan/QLTaiKhoan";
import QLNhaCC from "./TaiKhoan/QLNhaCC";
import DatLich from "./TaiKhoan/DatLich";
import ThuCung from "./TaiKhoan/ThuCung";
import QLDichVu from "./TaiKhoan/QLDichVu";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Price" element={<Price />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Blog2/:id" element={<Blog2 />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/DatLich1" element={<DatLich1 />} />
          <Route path="/ThanhToan" element={<ThanhToan />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/NguoiDung" element={<NguoiDung />} />
          <Route path="/NhaCC" element={<NhaCC />} />
          <Route path="/QLTaiKhoan" element={<QLTaiKhoan />} />
          <Route path="/QLNhaCC" element={<QLNhaCC />} />
          <Route path="/DatLich" element={<DatLich />} />
          <Route path="/ThuCung" element={<ThuCung />} />
          <Route path="/QLDichVu" element={<QLDichVu />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
