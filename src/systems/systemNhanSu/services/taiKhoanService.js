const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy tất cả tài khoản
const getAllTaiKhoan = async () => {
	await poolConnect
	const result = await pool.request().query(`
		SELECT 
			tk.MaNV, tk.Username, tk.HoTen, tk.QuyenTruyCap, 
			nv.HoTen AS TenNhanVien
		FROM TaiKhoan tk
		LEFT JOIN NhanVien nv ON tk.MaNV = nv.MaNV
	`)
	return result.recordset
}

// Lấy tài khoản theo Mã NV
const getTaiKhoanById = async (id) => {
	await poolConnect
	const result = await pool.request().input('MaNV', sql.Int, id).query(`
			SELECT 
				tk.MaNV, tk.Username, tk.HoTen, tk.QuyenTruyCap,
				nv.HoTen AS TenNhanVien
			FROM TaiKhoan tk
			LEFT JOIN NhanVien nv ON tk.MaNV = nv.MaNV
			WHERE tk.MaNV = @MaNV
		`)
	return result.recordset[0]
}

// Tạo mới tài khoản
const createTaiKhoan = async (data) => {
	const { MaNV, Username, Pass, HoTen, QuyenTruyCap } = data
	await poolConnect
	const result = await pool
		.request()
		.input('MaNV', sql.Int, MaNV)
		.input('Username', sql.VarChar(100), Username)
		.input('Pass', sql.NVarChar(100), Pass)
		.input('HoTen', sql.NVarChar(100), HoTen)
		.input('QuyenTruyCap', sql.NVarChar(50), QuyenTruyCap).query(`
			INSERT INTO TaiKhoan (MaNV, Username, Pass, HoTen, QuyenTruyCap)
			VALUES (@MaNV, @Username, @Pass, @HoTen, @QuyenTruyCap)
		`)
	return { message: 'Tạo tài khoản thành công' }
}

// Cập nhật tài khoản
const updateTaiKhoan = async (id, data) => {
	const { Username, Pass, HoTen, QuyenTruyCap } = data
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.input('Username', sql.VarChar(100), Username)
		.input('Pass', sql.NVarChar(100), Pass)
		.input('HoTen', sql.NVarChar(100), HoTen)
		.input('QuyenTruyCap', sql.NVarChar(50), QuyenTruyCap).query(`
			UPDATE TaiKhoan
			SET Username = @Username,
				Pass = @Pass,
				HoTen = @HoTen,
				QuyenTruyCap = @QuyenTruyCap
			WHERE MaNV = @MaNV
		`)
	return { message: 'Cập nhật tài khoản thành công' }
}

// Xóa tài khoản
const deleteTaiKhoan = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.query('DELETE FROM TaiKhoan WHERE MaNV = @MaNV')
	return { message: 'Đã xóa tài khoản' }
}

module.exports = {
	getAllTaiKhoan,
	getTaiKhoanById,
	createTaiKhoan,
	updateTaiKhoan,
	deleteTaiKhoan,
}
