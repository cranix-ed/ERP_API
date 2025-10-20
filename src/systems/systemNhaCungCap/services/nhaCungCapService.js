const { sql, pool, poolConnect } = require('../../../config/dbNhaCungCap')

// Lấy tất cả nhà cung cấp
const getAllNhaCungCap = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT MaNCC, TenNCC, MaSoThue, SDT, Email, Fax, Website, DiaChi, TrangThai
    FROM NhaCC
  `)
	return result.recordset
}

// Lấy nhà cung cấp theo ID
const getNhaCungCapById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaNCC', sql.Int, id)
		.query('SELECT * FROM NhaCC WHERE MaNCC = @MaNCC')
	return result.recordset[0]
}

// Thêm mới nhà cung cấp
const createNhaCungCap = async (data) => {
	const { TenNCC, MaSoThue, SDT, Email, Fax, Website, DiaChi, TrangThai } =
		data
	await poolConnect
	const result = await pool
		.request()
		.input('TenNCC', sql.NVarChar(100), TenNCC)
		.input('MaSoThue', sql.NVarChar(50), MaSoThue)
		.input('SDT', sql.NVarChar(15), SDT)
		.input('Email', sql.NVarChar(100), Email)
		.input('Fax', sql.NVarChar(50), Fax)
		.input('Website', sql.NVarChar(100), Website)
		.input('DiaChi', sql.NVarChar(200), DiaChi)
		.input('TrangThai', sql.NVarChar(20), TrangThai).query(`
      INSERT INTO NhaCC (TenNCC, MaSoThue, SDT, Email, Fax, Website, DiaChi, TrangThai)
      OUTPUT inserted.MaNCC
      VALUES (@TenNCC, @MaSoThue, @SDT, @Email, @Fax, @Website, @DiaChi, @TrangThai)
    `)
	return {
		message: 'Thêm nhà cung cấp thành công',
		MaNCC: result.recordset[0].MaNCC,
	}
}

// Cập nhật nhà cung cấp
const updateNhaCungCap = async (id, data) => {
	const { TenNCC, MaSoThue, SDT, Email, Fax, Website, DiaChi, TrangThai } =
		data
	await poolConnect
	await pool
		.request()
		.input('MaNCC', sql.Int, id)
		.input('TenNCC', sql.NVarChar(100), TenNCC)
		.input('MaSoThue', sql.NVarChar(50), MaSoThue)
		.input('SDT', sql.NVarChar(15), SDT)
		.input('Email', sql.NVarChar(100), Email)
		.input('Fax', sql.NVarChar(50), Fax)
		.input('Website', sql.NVarChar(100), Website)
		.input('DiaChi', sql.NVarChar(200), DiaChi)
		.input('TrangThai', sql.NVarChar(20), TrangThai).query(`
      UPDATE NhaCC
      SET TenNCC = @TenNCC,
          MaSoThue = @MaSoThue,
          SDT = @SDT,
          Email = @Email,
          Fax = @Fax,
          Website = @Website,
          DiaChi = @DiaChi,
          TrangThai = @TrangThai
      WHERE MaNCC = @MaNCC
    `)
	return { message: 'Cập nhật nhà cung cấp thành công' }
}

// Xóa nhà cung cấp
const deleteNhaCungCap = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaNCC', sql.Int, id)
		.query('DELETE FROM NhaCC WHERE MaNCC = @MaNCC')
	return { message: 'Xóa nhà cung cấp thành công' }
}

module.exports = {
	getAllNhaCungCap,
	getNhaCungCapById,
	createNhaCungCap,
	updateNhaCungCap,
	deleteNhaCungCap,
}
