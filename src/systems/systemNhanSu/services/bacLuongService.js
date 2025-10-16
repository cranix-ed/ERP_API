const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy tất cả bậc lương
const getAllBacLuong = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT b.*, n.TenNgach
    FROM BacLuong b
    LEFT JOIN NgachLuong n ON b.MaNgach = n.MaNgach
  `)
	return result.recordset
}

// Lấy bậc lương theo ID
const getBacLuongById = async (id) => {
	await poolConnect
	const result = await pool.request().input('MaBac', sql.Int, id).query(`
      SELECT b.*, n.TenNgach
      FROM BacLuong b
      LEFT JOIN NgachLuong n ON b.MaNgach = n.MaNgach
      WHERE b.MaBac = @MaBac
    `)
	return result.recordset[0]
}

// Thêm mới bậc lương
const createBacLuong = async (data) => {
	const { TenBac, BacLuong, MaNgach } = data
	await poolConnect
	const result = await pool
		.request()
		.input('TenBac', sql.NVarChar(50), TenBac)
		.input('BacLuong', sql.Decimal(10, 2), BacLuong)
		.input('MaNgach', sql.Int, MaNgach).query(`
      INSERT INTO BacLuong (TenBac, BacLuong, MaNgach)
      VALUES (@TenBac, @BacLuong, @MaNgach);
      SELECT SCOPE_IDENTITY() AS MaBac;
    `)
	return result.recordset[0]
}

// Cập nhật bậc lương
const updateBacLuong = async (id, data) => {
	const { TenBac, BacLuong, MaNgach } = data
	await poolConnect
	await pool
		.request()
		.input('MaBac', sql.Int, id)
		.input('TenBac', sql.NVarChar(50), TenBac)
		.input('BacLuong', sql.Decimal(10, 2), BacLuong)
		.input('MaNgach', sql.Int, MaNgach).query(`
      UPDATE BacLuong
      SET TenBac = @TenBac,
          BacLuong = @BacLuong,
          MaNgach = @MaNgach
      WHERE MaBac = @MaBac
    `)
	return { message: 'Đã cập nhật bậc lương' }
}

// Xóa bậc lương
const deleteBacLuong = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaBac', sql.Int, id)
		.query('DELETE FROM BacLuong WHERE MaBac = @MaBac')
	return { message: 'Đã xóa bậc lương' }
}

module.exports = {
	getAllBacLuong,
	getBacLuongById,
	createBacLuong,
	updateBacLuong,
	deleteBacLuong,
}
