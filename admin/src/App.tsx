import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import UserAdd from './pages/UserAdd';
import UserUpdate from './pages/UserUpdate';
import BaiViet from './pages/BaiViet';

import LichHen from './pages/LichHen';
import DichVu from './pages/DichVu';
import DichVuUpdate from './pages/DichVuUpdate';
import DichVuAdd from './pages/DichVuAdd';
import HoaDon from './pages/HoaDon';
import GoiDichVu from './pages/GoiDichVu';
import GoiDichVuAdd from './pages/GoiDichVuAdd';
import GoiDichVuUpdate from './pages/GoiDichVuUpdate';
import ThuCung from './pages/ThuCung';
import Phong from './pages/Phong';
import DatPhong from './pages/DatPhong';
import ThongKe from './pages/ThongKe';


const App: React.FC = () => {
  // State for managing selected entities
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGoiDichVu, setSelectedGoiDichVu] = useState(null);
  const [dichVuChon, setDichVuChon] = useState(null); // Corrected state declaration

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<User />} />
          <Route path="/Admin" element={<User />} />
          <Route path="/UserAdd" element={<UserAdd />} />
          <Route path="/UserUpdate" element={<UserUpdate user={selectedUser} />} />
          <Route path="/BaiViet" element={<BaiViet />} />
         
          <Route path="/LichHen" element={<LichHen />} />
          <Route path="/DichVu" element={<DichVu />} />
          <Route path="/DichVuUpdate" element={<DichVuUpdate dichVuChon={dichVuChon} />} />
          <Route path="/DichVuAdd" element={<DichVuAdd />} />
          <Route path="/HoaDon" element={<HoaDon />} />
          <Route path="/GoiDichVu" element={<GoiDichVu />} />
          <Route path="/GoiDichVuAdd" element={<GoiDichVuAdd />} />
          <Route path="/GoiDichVuUpdate" element={<GoiDichVuUpdate selectedGoiDichVu={selectedGoiDichVu} />} />
          <Route path="/ThuCung" element={<ThuCung />} />
          <Route path="/Phong" element={<Phong />} />
          <Route path="/DatPhong" element={<DatPhong />} />
          <Route path="/ThongKe" element={<ThongKe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
