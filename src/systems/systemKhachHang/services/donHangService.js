const { sql, pool, poolConnect } = require('../../../config/dbKhachHang')

// Lấy tất cả đơn hàng
const getAllDonHang = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT MaDonHang, MaKH, TenKH, SDT, NgayMua, SoLuong, ThanhTien, UuDai, MaNV
    FROM DonHang
    ORDER BY MaDonHang DESC
  `)
	return result.recordset
}

// Lấy đơn hàng theo ID
const getDonHangById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaDonHang', sql.Int, id)
		.query('SELECT * FROM DonHang WHERE MaDonHang = @MaDonHang')
	return result.recordset[0]
}

// Thêm đơn hàng mới
const createDonHang = async (data) => {
	const { MaKH, TenKH, SDT, NgayMua, SoLuong, ThanhTien, UuDai, MaNV } = data
	await poolConnect
	const result = await pool
		.request()
		.input('MaKH', sql.Int, MaKH)
		.input('TenKH', sql.NVarChar(100), TenKH)
		.input('SDT', sql.VarChar(15), SDT)
		.input('NgayMua', sql.Date, NgayMua)
		.input('SoLuong', sql.Int, SoLuong)
		.input('ThanhTien', sql.Decimal(18, 2), ThanhTien)
		.input('UuDai', sql.NVarChar(100), UuDai)
		.input('MaNV', sql.Int, MaNV).query(`
      INSERT INTO DonHang (MaKH, TenKH, SDT, NgayMua, SoLuong, ThanhTien, UuDai, MaNV)
      VALUES (@MaKH, @TenKH, @SDT, @NgayMua, @SoLuong, @ThanhTien, @UuDai, @MaNV);
      SELECT SCOPE_IDENTITY() AS MaDonHang;
    `)
	return result.recordset[0]
}

// Cập nhật đơn hàng
const updateDonHang = async (id, data) => {
	const { MaKH, TenKH, SDT, NgayMua, SoLuong, ThanhTien, UuDai, MaNV } = data
	await poolConnect
	await pool
		.request()
		.input('MaDonHang', sql.Int, id)
		.input('MaKH', sql.Int, MaKH)
		.input('TenKH', sql.NVarChar(100), TenKH)
		.input('SDT', sql.VarChar(15), SDT)
		.input('NgayMua', sql.Date, NgayMua)
		.input('SoLuong', sql.Int, SoLuong)
		.input('ThanhTien', sql.Decimal(18, 2), ThanhTien)
		.input('UuDai', sql.NVarChar(100), UuDai)
		.input('MaNV', sql.Int, MaNV).query(`
      UPDATE DonHang
      SET 
        MaKH = @MaKH,
        TenKH = @TenKH,
        SDT = @SDT,
        NgayMua = @NgayMua,
        SoLuong = @SoLuong,
        ThanhTien = @ThanhTien,
        UuDai = @UuDai,
        MaNV = @MaNV
      WHERE MaDonHang = @MaDonHang
    `)
	return { message: 'Đã cập nhật thông tin đơn hàng' }
}

// Xóa đơn hàng
const deleteDonHang = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaDonHang', sql.Int, id)
		.query('DELETE FROM DonHang WHERE MaDonHang = @MaDonHang')
	return { message: 'Đã xóa đơn hàng' }
}

module.exports = {
	getAllDonHang,
	getDonHangById,
	createDonHang,
	updateDonHang,
	deleteDonHang,
}
