const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy toàn bộ ngạch lương
const getAllNgachLuong = async () => {
	await poolConnect
	const result = await pool.request().query('SELECT * FROM NgachLuong')
	return result.recordset
}

// Lấy theo ID
const getNgachLuongById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaNgach', sql.Int, id)
		.query('SELECT * FROM NgachLuong WHERE MaNgach = @MaNgach')
	return result.recordset[0]
}

// Thêm mới
const createNgachLuong = async (data) => {
	const { TenNgach, NgachLuong } = data
	await poolConnect
	const result = await pool
		.request()
		.input('TenNgach', sql.NVarChar(100), TenNgach)
		.input('NgachLuong', sql.Decimal(10, 2), NgachLuong).query(`
      INSERT INTO NgachLuong (TenNgach, NgachLuong)
      VALUES (@TenNgach, @NgachLuong);
      SELECT SCOPE_IDENTITY() AS MaNgach;
    `)
	return result.recordset[0]
}

// Cập nhật
const updateNgachLuong = async (id, data) => {
	const { TenNgach, NgachLuong } = data
	await poolConnect
	await pool
		.request()
		.input('MaNgach', sql.Int, id)
		.input('TenNgach', sql.NVarChar(100), TenNgach)
		.input('NgachLuong', sql.Decimal(10, 2), NgachLuong).query(`
      UPDATE NgachLuong
      SET TenNgach = @TenNgach, NgachLuong = @NgachLuong
      WHERE MaNgach = @MaNgach
    `)
	return { message: 'Đã cập nhật ngạch lương' }
}

// Xóa
const deleteNgachLuong = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaNgach', sql.Int, id)
		.query('DELETE FROM NgachLuong WHERE MaNgach = @MaNgach')
	return { message: 'Đã xóa ngạch lương' }
}

module.exports = {
	getAllNgachLuong,
	getNgachLuongById,
	createNgachLuong,
	updateNgachLuong,
	deleteNgachLuong,
}
