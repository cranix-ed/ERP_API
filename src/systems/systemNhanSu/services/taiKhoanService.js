const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy tất cả tài khoản
const getAllTaiKhoan = async () => {
	await poolConnect
	const result = await pool.request().query(`
		SELECT 
			tk.MaNV, tk.Username, tk.QuyenTruyCap, 
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
				tk.MaNV, tk.Username, tk.QuyenTruyCap,
				nv.HoTen AS TenNhanVien
			FROM TaiKhoan tk
			LEFT JOIN NhanVien nv ON tk.MaNV = nv.MaNV
			WHERE tk.MaNV = @MaNV
		`)
	return result.recordset[0]
}

// Tạo mới tài khoản
const createTaiKhoan = async (data) => {
	const { MaNV, Username, Pass, QuyenTruyCap } = data
	await poolConnect

	// Kiểm tra xem nhân viên đã có tài khoản chưa
	const check = await pool
		.request()
		.input('MaNV', sql.Int, MaNV)
		.query('SELECT MaNV FROM TaiKhoan WHERE MaNV = @MaNV')

	if (check.recordset.length > 0) {
		throw new Error('Nhân viên này đã có tài khoản!')
	}

	await pool
		.request()
		.input('MaNV', sql.Int, MaNV)
		.input('Username', sql.VarChar(100), Username)
		.input('Pass', sql.NVarChar(100), Pass)
		.input('QuyenTruyCap', sql.NVarChar(50), QuyenTruyCap).query(`
			INSERT INTO TaiKhoan (MaNV, Username, Pass, QuyenTruyCap)
			VALUES (@MaNV, @Username, @Pass, @QuyenTruyCap)
		`)

	return { message: 'Tạo tài khoản thành công' }
}

// Cập nhật tài khoản
const updateTaiKhoan = async (id, data) => {
	const { Username, Pass, QuyenTruyCap } = data
	await poolConnect

	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.input('Username', sql.VarChar(100), Username)
		.input('Pass', sql.NVarChar(100), Pass)
		.input('QuyenTruyCap', sql.NVarChar(50), QuyenTruyCap).query(`
			UPDATE TaiKhoan
			SET Username = @Username,
				Pass = @Pass,
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
