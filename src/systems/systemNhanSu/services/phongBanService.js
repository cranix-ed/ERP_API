const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

const getAllPhongBan = async () => {
	await poolConnect
	const result = await pool.request().query('SELECT * FROM PhongBan')
	return result.recordset
}

const getPhongBanById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaPhongBan', sql.Int, id)
		.query('SELECT * FROM PhongBan WHERE MaPhongBan = @MaPhongBan')
	return result.recordset[0]
}

const createPhongBan = async (data) => {
	const { TenPhongBan, DiaChi, TrangThai } = data
	await poolConnect
	const result = await pool
		.request()
		.input('TenPhongBan', sql.NVarChar(100), TenPhongBan)
		.input('DiaChi', sql.NVarChar(200), DiaChi)
		.input('TrangThai', sql.NVarChar(20), TrangThai).query(`
      INSERT INTO PhongBan (TenPhongBan, DiaChi, TrangThai)
      VALUES (@TenPhongBan, @DiaChi, @TrangThai);
      SELECT SCOPE_IDENTITY() AS MaPhongBan;
    `)
	return result.recordset[0]
}

const updatePhongBan = async (id, data) => {
	const { TenPhongBan, DiaChi, TrangThai } = data
	await poolConnect
	await pool
		.request()
		.input('MaPhongBan', sql.Int, id)
		.input('TenPhongBan', sql.NVarChar(100), TenPhongBan)
		.input('DiaChi', sql.NVarChar(200), DiaChi)
		.input('TrangThai', sql.NVarChar(20), TrangThai).query(`
      UPDATE PhongBan
      SET TenPhongBan = @TenPhongBan,
          DiaChi = @DiaChi,
          TrangThai = @TrangThai
      WHERE MaPhongBan = @MaPhongBan
    `)
	return { message: 'Đã cập nhật phòng ban' }
}

const deletePhongBan = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaPhongBan', sql.Int, id)
		.query('DELETE FROM PhongBan WHERE MaPhongBan = @MaPhongBan')
	return { message: 'Đã xóa phòng ban' }
}

module.exports = {
	getAllPhongBan,
	getPhongBanById,
	createPhongBan,
	updatePhongBan,
	deletePhongBan,
}
