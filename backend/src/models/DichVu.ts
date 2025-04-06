    import connection from '../config/db';  // Kết nối đến cơ sở dữ liệu
    import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

    // Hàm hiển thị tất cả dịch vụ
    export const hienThiTatCaDichVu = async (): Promise<RowDataPacket[]> => {
        const query = `SELECT * FROM dich_vu ORDER BY ngay_tao DESC`;

        try {
            const [rows] = await connection.execute<RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi hiển thị danh sách dịch vụ:', error.message);
            } else {
                console.error('Lỗi không xác định khi hiển thị danh sách dịch vụ:', error);
            }
            throw error; // Throw lại lỗi để đảm bảo hàm trả về Promise bị reject
        }
    };

    // Hàm tìm kiếm dịch vụ theo tên
    export const timKiemDichVu = async (tenDichVu: string): Promise<RowDataPacket[]> => {
        const query = `SELECT * FROM dich_vu WHERE ten_dich_vu LIKE ?`;
        const values = [`%${tenDichVu}%`];

        try {
            const [rows] = await connection.execute<RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi tìm kiếm dịch vụ:', error.message);
            } else {
                console.error('Lỗi không xác định khi tìm kiếm dịch vụ:', error);
            }
            throw error; // Throw lại lỗi để đảm bảo hàm trả về Promise bị reject
        }
    };

    // Hàm thêm dịch vụ mới
    export const themDichVu = async (tenDichVu: string, moTa: string, logo: string | null, gia: number): Promise<number> => {
        // Kiểm tra giá trị trước khi đưa vào truy vấn
        if (!tenDichVu || !moTa || gia === undefined) {
            throw new Error('Các tham số không hợp lệ. Vui lòng kiểm tra dữ liệu đầu vào.');
        }

        const query = `INSERT INTO dich_vu (ten_dich_vu, mo_ta, logo, gia) VALUES (?, ?, ?, ?)`;
        const values = [tenDichVu, moTa, logo, gia];

        try {
            const [result] = await connection.execute<ResultSetHeader>(query, values);
            return result.insertId; // Trả về ID của dịch vụ mới được thêm
        } catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi thêm dịch vụ:', error.message);
            } else {
                console.error('Lỗi không xác định khi thêm dịch vụ:', error);
            }
            throw error; // Throw lại lỗi để đảm bảo hàm trả về Promise bị reject
        }
    };

    export const suaDichVu = async (
        dichVuId: number,
        tenDichVu: string,
        moTa: string,
        logo: string | null,
        gia: number
    ): Promise<number> => {
        const query = `
            UPDATE dich_vu 
            SET ten_dich_vu = ?, mo_ta = ?, logo = ?, gia = ? 
            WHERE dich_vu_id = ?
        `;
        const values = [tenDichVu, moTa, logo, gia, dichVuId];
    
        try {
            const [result] = await connection.execute<ResultSetHeader>(query, values);
            return result.affectedRows; // Return the number of affected rows
        } catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi cập nhật dịch vụ:', error.message);
            } else {
                console.error('Lỗi không xác định khi cập nhật dịch vụ:', error);
            }
            throw error; // Throw the error to ensure the Promise is rejected properly
        }
    };

    // Hàm xóa dịch vụ
    export const xoaDichVu = async (dichVuId: number): Promise<number> => {
        const query = `DELETE FROM dich_vu WHERE dich_vu_id = ?`;
        const values = [dichVuId];

        try {
            const [result] = await connection.execute<ResultSetHeader>(query, values);
            return result.affectedRows; // Trả về số lượng hàng đã bị xóa
        } catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi xóa dịch vụ:', error.message);
            } else {
                console.error('Lỗi không xác định khi xóa dịch vụ:', error);
            }
            throw error; // Throw lại lỗi để đảm bảo hàm trả về Promise bị reject
        }
    };
