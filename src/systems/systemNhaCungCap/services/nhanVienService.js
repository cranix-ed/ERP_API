const axios = require('axios')
const { sql, pool, poolConnect } = require('../../../config/dbNhaCungCap')

// Lấy tất cả nhân viên
const getAllNhanVien = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT MaNV, HoTen, GioiTinh, NgaySinh, DiaChi, SoCMND, MaChucVu, MaPhong, STK, NganHang
    FROM NhanVien
  `)
	return result.recordset
}

// Lấy nhân viên theo ID
const getNhanVienById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaNV', sql.Int, id)
		.query('SELECT * FROM NhanVien WHERE MaNV = @MaNV')
	return result.recordset[0]
}

// Thêm nhân viên mới
const createNhanVien = async (data) => {
	const {
		HoTen,
		GioiTinh,
		NgaySinh,
		DiaChi,
		SoCMND,
		MaChucVu,
		MaPhong,
		STK,
		NganHang,
	} = data
	await poolConnect
	const result = await pool
		.request()
		.input('HoTen', sql.NVarChar(100), HoTen)
		.input('GioiTinh', sql.NVarChar(10), GioiTinh)
		.input('NgaySinh', sql.Date, NgaySinh)
		.input('DiaChi', sql.NVarChar(200), DiaChi)
		.input('SoCMND', sql.NVarChar(20), SoCMND)
		.input('MaChucVu', sql.Int, MaChucVu)
		.input('MaPhong', sql.Int, MaPhong)
		.input('STK', sql.NVarChar(50), STK)
		.input('NganHang', sql.NVarChar(100), NganHang).query(`
      INSERT INTO NhanVien (HoTen, GioiTinh, NgaySinh, DiaChi, SoCMND, MaChucVu, MaPhong, STK, NganHang)
      OUTPUT inserted.MaNV
      VALUES (@HoTen, @GioiTinh, @NgaySinh, @DiaChi, @SoCMND, @MaChucVu, @MaPhong, @STK, @NganHang)
    `)

	const newNhanVien = { ...data, MaNV: result.recordset[0].MaNV }

	// Gọi API đồng bộ sang Nhân Sự
	try {
		if (!data.fromSync) {
			await axios.post(
				'http://localhost:9717/systemNhanSu/nhanviensync/sync',
				{
					data: { ...newNhanVien, LoaiNV: 'nhacungcap' },
				}
			)
		}
		console.log('Sync thành công')
	} catch (error) {
		console.error('Sync Nhân Sự thất bại:', error.message)
	}

	return {
		message: 'Thêm nhân viên thành công',
		MaNV: newNhanVien.MaNV,
	}
}

// Cập nhật thông tin nhân viên
const updateNhanVien = async (id, data) => {
	const {
		HoTen,
		GioiTinh,
		NgaySinh,
		DiaChi,
		SoCMND,
		MaChucVu,
		MaPhong,
		STK,
		NganHang,
	} = data
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.input('HoTen', sql.NVarChar(100), HoTen)
		.input('GioiTinh', sql.NVarChar(10), GioiTinh)
		.input('NgaySinh', sql.Date, NgaySinh)
		.input('DiaChi', sql.NVarChar(200), DiaChi)
		.input('SoCMND', sql.NVarChar(20), SoCMND)
		.input('MaChucVu', sql.Int, MaChucVu)
		.input('MaPhong', sql.Int, MaPhong)
		.input('STK', sql.NVarChar(50), STK)
		.input('NganHang', sql.NVarChar(100), NganHang).query(`
      UPDATE NhanVien
      SET HoTen = @HoTen,
          GioiTinh = @GioiTinh,
          NgaySinh = @NgaySinh,
          DiaChi = @DiaChi,
          SoCMND = @SoCMND,
          MaChucVu = @MaChucVu,
          MaPhong = @MaPhong,
          STK = @STK,
          NganHang = @NganHang
      WHERE MaNV = @MaNV
    `)

	// 🔄 Gọi API sync
	try {
		if (!data.fromSync) {
			await axios.post(
				'http://localhost:9717/systemNhanSu/nhanviensync/sync',
				{
					data: { ...data, LoaiNV: 'nhacungcap' },
				}
			)
		}
		console.log('Sync thành công')
	} catch (error) {
		console.error('Sync Nhân Sự thất bại:', error.message)
	}

	return { message: 'Cập nhật nhân viên thành công' }
}

// Xóa nhân viên
const deleteNhanVien = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.query('DELETE FROM NhanVien WHERE MaNV = @MaNV')
	return { message: 'Xóa nhân viên thành công' }
}

module.exports = {
	getAllNhanVien,
	getNhanVienById,
	createNhanVien,
	updateNhanVien,
	deleteNhanVien,
}
