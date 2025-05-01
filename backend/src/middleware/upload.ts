  import multer, { FileFilterCallback } from 'multer';
  import path from 'path';
  import fs from 'fs';

  // Cấu hình nơi lưu ảnh
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/DoAnToNghiep01/backend/src/img');  // Đường dẫn lưu file
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const sanitizedFileName = file.originalname
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')  // Thay thế các ký tự đặc biệt bằng dấu '-'
          .replace(/-+/g, '-');         // Loại bỏ các dấu '-' thừa
      cb(null, `${uniqueSuffix}-${sanitizedFileName}`);
    }
  });


  // Kiểm tra file upload là ảnh
  const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  };

  // Sử dụng multer với cấu hình storage và fileFilter
  export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });

  // Hàm để kiểm tra và sử dụng lại ảnh
  export const handleImageUpload = (file: Express.Multer.File) => {
    const filePath = path.join('D:/DoAnToNghiep01/backend/src/img', file.originalname);

    // Kiểm tra xem file đã tồn tại chưa
    if (fs.existsSync(filePath)) {
      // Nếu file đã tồn tại, trả về đường dẫn của file cũ
      return file.originalname;
    } else {
      // Nếu file chưa tồn tại, lưu file và trả về đường dẫn của file mới
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const newFileName = uniqueSuffix + '-' + file.originalname;
      const newFilePath = path.join('D:/DoAnToNghiep01/backend/src/img', newFileName);
     
      return newFileName;
    }
  };
