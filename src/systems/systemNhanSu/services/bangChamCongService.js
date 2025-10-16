const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

// Lấy toàn bộ bảng chấm công
const getAllBangChamCong = async () => {
	await poolConnect
	const result = await pool.request().query(`
    SELECT 
      cc.MaChamCong, 
      nv.HoTen AS TenNhanVien,
      n.TenNgach,
      b.TenBac,
      cc.LuongCoBan,
      cc.NgayChamCong
    FROM BangChamCong cc
      LEFT JOIN NhanVien nv ON cc.MaNV = nv.MaNV
      LEFT JOIN NgachLuong n ON cc.MaNgach = n.MaNgach
      LEFT JOIN BacLuong b ON cc.MaBac = b.MaBac
    ORDER BY cc.NgayChamCong DESC
  `)
	return result.recordset
}

// Lấy chấm công theo ID
const getBangChamCongById = async (id) => {
	await poolConnect
	const result = await pool.request().input('MaChamCong', sql.Int, id).query(`
      SELECT 
        cc.MaChamCong, 
        nv.HoTen AS TenNhanVien,
        n.TenNgach,
        b.TenBac,
        cc.LuongCoBan,
        cc.NgayChamCong
      FROM BangChamCong cc
        LEFT JOIN NhanVien nv ON cc.MaNV = nv.MaNV
        LEFT JOIN NgachLuong n ON cc.MaNgach = n.MaNgach
        LEFT JOIN BacLuong b ON cc.MaBac = b.MaBac
      WHERE cc.MaChamCong = @MaChamCong
    `)
	return result.recordset[0]
}

// Thêm mới
const createBangChamCong = async (data) => {
	const { MaNV, MaNgach, MaBac, LuongCoBan, NgayChamCong } = data
	await poolConnect
	const result = await pool
		.request()
		.input('MaNV', sql.Int, MaNV)
		.input('MaNgach', sql.Int, MaNgach)
		.input('MaBac', sql.Int, MaBac)
		.input('LuongCoBan', sql.Decimal(10, 2), LuongCoBan)
		.input('NgayChamCong', sql.Date, NgayChamCong).query(`
      INSERT INTO BangChamCong (MaNV, MaNgach, MaBac, LuongCoBan, NgayChamCong)
      VALUES (@MaNV, @MaNgach, @MaBac, @LuongCoBan, @NgayChamCong);
      SELECT SCOPE_IDENTITY() AS MaChamCong;
    `)
	return result.recordset[0]
}

// Cập nhật
const updateBangChamCong = async (id, data) => {
	const { MaNV, MaNgach, MaBac, LuongCoBan, NgayChamCong } = data
	await poolConnect
	await pool
		.request()
		.input('MaChamCong', sql.Int, id)
		.input('MaNV', sql.Int, MaNV)
		.input('MaNgach', sql.Int, MaNgach)
		.input('MaBac', sql.Int, MaBac)
		.input('LuongCoBan', sql.Decimal(10, 2), LuongCoBan)
		.input('NgayChamCong', sql.Date, NgayChamCong).query(`
      UPDATE BangChamCong
      SET 
        MaNV = @MaNV,
        MaNgach = @MaNgach,
        MaBac = @MaBac,
        LuongCoBan = @LuongCoBan,
        NgayChamCong = @NgayChamCong
      WHERE MaChamCong = @MaChamCong
    `)
	return { message: 'Đã cập nhật chấm công' }
}

// Xóa
const deleteBangChamCong = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaChamCong', sql.Int, id)
		.query('DELETE FROM BangChamCong WHERE MaChamCong = @MaChamCong')
	return { message: 'Đã xóa bản ghi chấm công' }
}

module.exports = {
	getAllBangChamCong,
	getBangChamCongById,
	createBangChamCong,
	updateBangChamCong,
	deleteBangChamCong,
}
