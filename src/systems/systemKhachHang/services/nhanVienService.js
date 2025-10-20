const { sql, pool, poolConnect } = require('../../../config/dbKhachHang')
const axios = require('axios')

// Lấy tất cả nhân viên
const getAllNhanVien = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT MaNV, HoTen, GioiTinh, SDT, Email
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
		.query(
			'SELECT MaNV, HoTen, GioiTinh, SDT, Email FROM NhanVien WHERE MaNV = @MaNV'
		)
	return result.recordset[0]
}

// Thêm mới nhân viên
const createNhanVien = async (data) => {
	const { HoTen, GioiTinh, SDT, Email } = data
	await poolConnect
	const result = await pool
		.request()
		.input('HoTen', sql.NVarChar(100), HoTen)
		.input('GioiTinh', sql.NVarChar(10), GioiTinh)
		.input('SDT', sql.VarChar(15), SDT)
		.input('Email', sql.VarChar(100), Email).query(`
      INSERT INTO NhanVien (HoTen, GioiTinh, SDT, Email)
      OUTPUT inserted.MaNV
      VALUES (@HoTen, @GioiTinh, @SDT, @Email)
    `)

	const newNhanVien = { ...data, MaNV: result.recordset[0].MaNV }

	// Gọi API đồng bộ sang Nhân Sự
	try {
		if (!data.fromSync) {
			await axios.post(
				'http://localhost:9717/systemNhanSu/nhanviensync/sync',
				{
					data: { ...newNhanVien, LoaiNV: 'khachhang' },
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

// Cập nhật nhân viên
const updateNhanVien = async (id, data) => {
	const { HoTen, GioiTinh, SDT, Email } = data
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.input('HoTen', sql.NVarChar(100), HoTen)
		.input('GioiTinh', sql.NVarChar(10), GioiTinh)
		.input('SDT', sql.VarChar(15), SDT)
		.input('Email', sql.VarChar(100), Email).query(`
      UPDATE NhanVien
      SET HoTen = @HoTen,
          GioiTinh = @GioiTinh,
          SDT = @SDT,
          Email = @Email
      WHERE MaNV = @MaNV
    `)

	// 🔄 Gọi API sync
	try {
		if (!data.fromSync) {
			await axios.post(
				'http://localhost:9717/systemNhanSu/nhanviensync/sync',
				{
					data: { ...data, LoaiNV: 'khachhang' },
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
