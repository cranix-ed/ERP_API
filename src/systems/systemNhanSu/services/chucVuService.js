const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy tất cả chức vụ
const getAllChucVu = async () => {
	await poolConnect
	const result = await pool.request().query('SELECT * FROM ChucVu')
	return result.recordset
}

// Lấy 1 chức vụ theo ID
const getChucVuById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaChucVu', sql.Int, id)
		.query('SELECT * FROM ChucVu WHERE MaChucVu = @MaChucVu')
	return result.recordset[0]
}

// Tạo mới chức vụ
const createChucVu = async (data) => {
	const { TenChucVu, TrangThai } = data
	await poolConnect
	const result = await pool
		.request()
		.input('TenChucVu', sql.NVarChar(100), TenChucVu)
		.input('TrangThai', sql.NVarChar(20), TrangThai).query(`
      INSERT INTO ChucVu (TenChucVu, TrangThai)
      VALUES (@TenChucVu, @TrangThai);
      SELECT SCOPE_IDENTITY() AS MaChucVu;
    `)
	return result.recordset[0]
}

// Cập nhật chức vụ
const updateChucVu = async (id, data) => {
	const { TenChucVu, TrangThai } = data
	await poolConnect
	await pool
		.request()
		.input('MaChucVu', sql.Int, id)
		.input('TenChucVu', sql.NVarChar(100), TenChucVu)
		.input('TrangThai', sql.NVarChar(20), TrangThai).query(`
      UPDATE ChucVu
      SET TenChucVu = @TenChucVu,
          TrangThai = @TrangThai
      WHERE MaChucVu = @MaChucVu
    `)
	return { message: 'Đã cập nhật chức vụ' }
}

// Xóa chức vụ
const deleteChucVu = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaChucVu', sql.Int, id)
		.query('DELETE FROM ChucVu WHERE MaChucVu = @MaChucVu')
	return { message: 'Đã xóa chức vụ' }
}

module.exports = {
	getAllChucVu,
	getChucVuById,
	createChucVu,
	updateChucVu,
	deleteChucVu,
}
