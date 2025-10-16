const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')

const getAllNhanVien = async () => {
	await poolConnect
	const result = await pool.request().query(`
		SELECT 
			nv.MaNV, nv.HoTen, nv.GioiTinh, nv.NgaySinh, nv.ThuongTru, nv.TamTru,
			nv.SoCMND, nv.SDT, nv.Email, 
			cv.TenChucVu, pb.TenPhongBan, td.TenTrinhDo, nn.CapDoNgoaiNgu, b.TenBac, 
			nv.SoTaiKhoan, nv.NganHang
		FROM NhanVien nv
			LEFT JOIN ChucVu cv ON nv.MaChucVu = cv.MaChucVu
			LEFT JOIN PhongBan pb ON nv.MaPhong = pb.MaPhongBan
			LEFT JOIN TrinhDoHocVan td ON nv.MaTDHV = td.MaTDHV
			LEFT JOIN TrinhDoNgoaiNgu nn ON nv.MaTDNN = nn.MaTDNN
			LEFT JOIN BacLuong b ON nv.MaBac = b.MaBac
	`)
	return result.recordset
}

const getNhanVienById = async (id) => {
	await poolConnect
	const result = await pool
		.request()
		.input('MaNV', sql.Int, id)
		.query('SELECT * FROM NhanVien WHERE MaNV = @MaNV')
	return result.recordset[0]
}

const createNhanVien = async (data) => {
	await poolConnect
	const result = await pool
		.request()
		.input('HoTen', sql.NVarChar, data.HoTen)
		.input('GioiTinh', sql.NVarChar, data.GioiTinh)
		.input('NgaySinh', sql.Date, data.NgaySinh)
		.input('ThuongTru', sql.NVarChar, data.ThuongTru)
		.input('TamTru', sql.NVarChar, data.TamTru)
		.input('SoCMND', sql.NVarChar, data.SoCMND)
		.input('SDT', sql.NVarChar, data.SDT)
		.input('Email', sql.NVarChar, data.Email)
		.input('MaChucVu', sql.Int, data.MaChucVu)
		.input('MaPhong', sql.Int, data.MaPhong)
		.input('MaTDHV', sql.Int, data.MaTDHV)
		.input('MaTDNN', sql.Int, data.MaTDNN)
		.input('MaBac', sql.Int, data.MaBac)
		.input('SoTaiKhoan', sql.NVarChar, data.SoTaiKhoan)
		.input('NganHang', sql.NVarChar, data.NganHang).query(`
			INSERT INTO NhanVien (
				HoTen, GioiTinh, NgaySinh, ThuongTru, TamTru, SoCMND, SDT, Email, 
				MaChucVu, MaPhong, MaTDHV, MaTDNN, MaBac, SoTaiKhoan, NganHang
			) 
			OUTPUT inserted.MaNV
			VALUES (
				@HoTen, @GioiTinh, @NgaySinh, @ThuongTru, @TamTru, @SoCMND, @SDT, @Email,
				@MaChucVu, @MaPhong, @MaTDHV, @MaTDNN, @MaBac, @SoTaiKhoan, @NganHang
			)
		`)
	return result.recordset[0].MaNV
}

const updateNhanVien = async (id, data) => {
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.input('HoTen', sql.NVarChar, data.HoTen)
		.input('GioiTinh', sql.NVarChar, data.GioiTinh)
		.input('NgaySinh', sql.Date, data.NgaySinh)
		.input('ThuongTru', sql.NVarChar, data.ThuongTru)
		.input('TamTru', sql.NVarChar, data.TamTru)
		.input('SoCMND', sql.NVarChar, data.SoCMND)
		.input('SDT', sql.NVarChar, data.SDT)
		.input('Email', sql.NVarChar, data.Email)
		.input('MaChucVu', sql.Int, data.MaChucVu)
		.input('MaPhong', sql.Int, data.MaPhong)
		.input('MaTDHV', sql.Int, data.MaTDHV)
		.input('MaTDNN', sql.Int, data.MaTDNN)
		.input('MaBac', sql.Int, data.MaBac)
		.input('SoTaiKhoan', sql.NVarChar, data.SoTaiKhoan)
		.input('NganHang', sql.NVarChar, data.NganHang).query(`
			UPDATE NhanVien SET
				HoTen = @HoTen,
				GioiTinh = @GioiTinh,
				NgaySinh = @NgaySinh,
				ThuongTru = @ThuongTru,
				TamTru = @TamTru,
				SoCMND = @SoCMND,
				SDT = @SDT,
				Email = @Email,
				MaChucVu = @MaChucVu,
				MaPhong = @MaPhong,
				MaTDHV = @MaTDHV,
				MaTDNN = @MaTDNN,
				MaBac = @MaBac,
				SoTaiKhoan = @SoTaiKhoan,
				NganHang = @NganHang
			WHERE MaNV = @MaNV
		`)
}

const deleteNhanVien = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.query('DELETE FROM NhanVien WHERE MaNV = @MaNV')
}

module.exports = {
	getAllNhanVien,
	getNhanVienById,
	createNhanVien,
	updateNhanVien,
	deleteNhanVien,
}
