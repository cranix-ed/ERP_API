const { sql, pool, poolConnect } = require('../../../config/dbKhachHang')

// Lấy tất cả khách hàng
const getAllKhachHang = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT MaKH, TenKH, GioiTinh, NgaySinh, SDT, DiaChi
    FROM KhachHang
    ORDER BY MaKH DESC
  `)
	return result.recordset
}

// Lấy khách hàng theo ID
const getKhachHangById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaKH', sql.Int, id)
		.query('SELECT * FROM KhachHang WHERE MaKH = @MaKH')
	return result.recordset[0]
}

// Thêm khách hàng mới
const createKhachHang = async (data) => {
	const { TenKH, GioiTinh, NgaySinh, SDT, DiaChi } = data
	await poolConnect
	const result = await pool
		.request()
		.input('TenKH', sql.NVarChar(100), TenKH)
		.input('GioiTinh', sql.NVarChar(10), GioiTinh)
		.input('NgaySinh', sql.Date, NgaySinh)
		.input('SDT', sql.VarChar(15), SDT)
		.input('DiaChi', sql.NVarChar(255), DiaChi).query(`
      INSERT INTO KhachHang (TenKH, GioiTinh, NgaySinh, SDT, DiaChi)
      VALUES (@TenKH, @GioiTinh, @NgaySinh, @SDT, @DiaChi);
      SELECT SCOPE_IDENTITY() AS MaKH;
    `)
	return result.recordset[0]
}

// Cập nhật khách hàng
const updateKhachHang = async (id, data) => {
	const { TenKH, GioiTinh, NgaySinh, SDT, DiaChi } = data
	await poolConnect
	await pool
		.request()
		.input('MaKH', sql.Int, id)
		.input('TenKH', sql.NVarChar(100), TenKH)
		.input('GioiTinh', sql.NVarChar(10), GioiTinh)
		.input('NgaySinh', sql.Date, NgaySinh)
		.input('SDT', sql.VarChar(15), SDT)
		.input('DiaChi', sql.NVarChar(255), DiaChi).query(`
      UPDATE KhachHang
      SET 
        TenKH = @TenKH,
        GioiTinh = @GioiTinh,
        NgaySinh = @NgaySinh,
        SDT = @SDT,
        DiaChi = @DiaChi
      WHERE MaKH = @MaKH
    `)
	return { message: 'Đã cập nhật thông tin khách hàng' }
}

// Xóa khách hàng
const deleteKhachHang = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaKH', sql.Int, id)
		.query('DELETE FROM KhachHang WHERE MaKH = @MaKH')
	return { message: 'Đã xóa khách hàng' }
}

module.exports = {
	getAllKhachHang,
	getKhachHangById,
	createKhachHang,
	updateKhachHang,
	deleteKhachHang,
}
