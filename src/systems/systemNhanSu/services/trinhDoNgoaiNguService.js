const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy toàn bộ trình độ ngoại ngữ
const getAllTrinhDoNgoaiNgu = async () => {
	await poolConnect
	const result = await pool.request().query('SELECT * FROM TrinhDoNgoaiNgu')
	return result.recordset
}

// Lấy theo ID
const getTrinhDoNgoaiNguById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaTDNN', sql.Int, id)
		.query('SELECT * FROM TrinhDoNgoaiNgu WHERE MaTDNN = @MaTDNN')
	return result.recordset[0]
}

// Thêm mới
const createTrinhDoNgoaiNgu = async (data) => {
	const { LoaiNgoaiNgu, CapDoNgoaiNgu } = data
	await poolConnect
	const result = await pool
		.request()
		.input('LoaiNgoaiNgu', sql.NVarChar(50), LoaiNgoaiNgu)
		.input('CapDoNgoaiNgu', sql.NVarChar(50), CapDoNgoaiNgu).query(`
      INSERT INTO TrinhDoNgoaiNgu (LoaiNgoaiNgu, CapDoNgoaiNgu)
      VALUES (@LoaiNgoaiNgu, @CapDoNgoaiNgu);
      SELECT SCOPE_IDENTITY() AS MaTDNN;
    `)
	return result.recordset[0]
}

// Cập nhật
const updateTrinhDoNgoaiNgu = async (id, data) => {
	const { LoaiNgoaiNgu, CapDoNgoaiNgu } = data
	await poolConnect
	await pool
		.request()
		.input('MaTDNN', sql.Int, id)
		.input('LoaiNgoaiNgu', sql.NVarChar(50), LoaiNgoaiNgu)
		.input('CapDoNgoaiNgu', sql.NVarChar(50), CapDoNgoaiNgu).query(`
      UPDATE TrinhDoNgoaiNgu
      SET LoaiNgoaiNgu = @LoaiNgoaiNgu,
          CapDoNgoaiNgu = @CapDoNgoaiNgu
      WHERE MaTDNN = @MaTDNN
    `)
	return { message: 'Đã cập nhật trình độ ngoại ngữ' }
}

// Xóa
const deleteTrinhDoNgoaiNgu = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaTDNN', sql.Int, id)
		.query('DELETE FROM TrinhDoNgoaiNgu WHERE MaTDNN = @MaTDNN')
	return { message: 'Đã xóa trình độ ngoại ngữ' }
}

module.exports = {
	getAllTrinhDoNgoaiNgu,
	getTrinhDoNgoaiNguById,
	createTrinhDoNgoaiNgu,
	updateTrinhDoNgoaiNgu,
	deleteTrinhDoNgoaiNgu,
}
