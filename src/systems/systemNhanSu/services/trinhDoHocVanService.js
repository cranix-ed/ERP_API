const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy toàn bộ trình độ học vấn
const getAllTrinhDoHocVan = async () => {
	await poolConnect
	const result = await pool.request().query('SELECT * FROM TrinhDoHocVan')
	return result.recordset
}

// Lấy theo ID
const getTrinhDoHocVanById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaTDHV', sql.Int, id)
		.query('SELECT * FROM TrinhDoHocVan WHERE MaTDHV = @MaTDHV')
	return result.recordset[0]
}

// Thêm mới
const createTrinhDoHocVan = async (data) => {
	const { LoaiTrinhDo, TenTrinhDo } = data
	await poolConnect
	const result = await pool
		.request()
		.input('LoaiTrinhDo', sql.NVarChar(50), LoaiTrinhDo)
		.input('TenTrinhDo', sql.NVarChar(100), TenTrinhDo).query(`
      INSERT INTO TrinhDoHocVan (LoaiTrinhDo, TenTrinhDo)
      VALUES (@LoaiTrinhDo, @TenTrinhDo);
      SELECT SCOPE_IDENTITY() AS MaTDHV;
    `)
	return result.recordset[0]
}

// Cập nhật
const updateTrinhDoHocVan = async (id, data) => {
	const { LoaiTrinhDo, TenTrinhDo } = data
	await poolConnect
	await pool
		.request()
		.input('MaTDHV', sql.Int, id)
		.input('LoaiTrinhDo', sql.NVarChar(50), LoaiTrinhDo)
		.input('TenTrinhDo', sql.NVarChar(100), TenTrinhDo).query(`
      UPDATE TrinhDoHocVan
      SET LoaiTrinhDo = @LoaiTrinhDo,
          TenTrinhDo = @TenTrinhDo
      WHERE MaTDHV = @MaTDHV
    `)
	return { message: 'Đã cập nhật trình độ học vấn' }
}

// Xóa
const deleteTrinhDoHocVan = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaTDHV', sql.Int, id)
		.query('DELETE FROM TrinhDoHocVan WHERE MaTDHV = @MaTDHV')
	return { message: 'Đã xóa trình độ học vấn' }
}

module.exports = {
	getAllTrinhDoHocVan,
	getTrinhDoHocVanById,
	createTrinhDoHocVan,
	updateTrinhDoHocVan,
	deleteTrinhDoHocVan,
}
