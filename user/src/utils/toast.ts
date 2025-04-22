// src/utils/toast.ts
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Cấu hình toast mặc định hiển thị trong 3 giây
const defaultOptions: ToastOptions = {
  position: "top-center",   // ✅ Hiển thị ở giữa trên
  autoClose: 3000,          // ✅ Tự động đóng sau 3 giây
  hideProgressBar: false,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// Các hàm gọi thông báo tái sử dụng
export const showSuccess = (msg: string) => toast.success(msg, defaultOptions);
export const showError = (msg: string) => toast.error(msg, defaultOptions);
export const showInfo = (msg: string) => toast.info(msg, defaultOptions);
export const showWarn = (msg: string) => toast.warn(msg, defaultOptions);
