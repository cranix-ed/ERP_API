const { pool, poolConnect, sql } = require('../config/dbKhachHang')

/**
 * Kiểm tra xem bản ghi có tồn tại không trước khi Update hoặc Delete
 * @param {string} tableName - Tên bảng trong SQL Server
 * @param {string} keyField - Tên cột ID (VD: MaNV, MaKH)
 */
const checkExists = (tableName, keyField) => {
	return async (req, res, next) => {
		try {
			await poolConnect
			const id = parseInt(req.params.id)
			if (isNaN(id))
				return res.status(400).json({
					success: false,
					message: `ID không hợp lệ`,
				})

			const result = await pool
				.request()
				.input('id', sql.Int, id)
				.query(`SELECT 1 FROM ${tableName} WHERE ${keyField} = @id`)

			if (result.recordset.length === 0) {
				return res.status(404).json({
					success: false,
					message: `${tableName} có ID = ${id} không tồn tại`,
				})
			}

			next()
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}
}

module.exports = checkExists
