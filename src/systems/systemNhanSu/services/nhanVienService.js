const { sql, pool, poolConnect } = require('../../../config/dbNhanSu')
const nhanVienSyncService = require('./nhanVienSyncService')

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
		.input('NganHang', sql.NVarChar, data.NganHang)
		.input('LoaiNV', sql.NVarChar, data.LoaiNV).query(`
			INSERT INTO NhanVien (
				HoTen, GioiTinh, NgaySinh, ThuongTru, TamTru, SoCMND, SDT, Email, 
				MaChucVu, MaPhong, MaTDHV, MaTDNN, MaBac, SoTaiKhoan, NganHang, LoaiNV
			) 
			OUTPUT inserted.MaNV
			VALUES (
				@HoTen, @GioiTinh, @NgaySinh, @ThuongTru, @TamTru, @SoCMND, @SDT, @Email,
				@MaChucVu, @MaPhong, @MaTDHV, @MaTDNN, @MaBac, @SoTaiKhoan, @NganHang, @LoaiNV
			)
		`)
		
	const newNV = { ...data, MaNV: result.recordset[0].MaNV }

	// Đồng bộ sang hệ thống khác
	

	return { message: 'Thêm nhân viên thành công', data: newNV }
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

		const updatedNV = await getNhanVienById(id)
		await nhanVienSyncService.syncToOtherSystems(updatedNV)

		return { message: 'Cập nhật nhân viên thành công', data: updatedNV }
}

const deleteNhanVien = async (id) => {
	await poolConnect
	await pool
		.request()
		.input('MaNV', sql.Int, id)
		.query('DELETE FROM NhanVien WHERE MaNV = @MaNV')
}

const getNhanVienByEmail = async (email) => {
	await poolConnect
	const result = await pool
		.request()
		.input('Email', sql.NVarChar, email)
		.query('SELECT * FROM NhanVien WHERE Email = @Email')
	return result.recordset[0]
}

const getNhanVienBySoCMND = async (soCMND) => {
	await poolConnect
	const result = await pool
		.request()
		.input('SoCMND', sql.NVarChar, soCMND)
		.query('SELECT * FROM NhanVien WHERE SoCMND = @SoCMND')
	return result.recordset[0]
}

const syncNhanVien = async (data) => {
	let existing = null

	// Kiểm tra nhân viên đã tồn tại chưa (theo Email hoặc SoCMND)
	if (data.Email) {
		existing = await getNhanVienByEmail(data.Email)
	} else if (data.SoCMND) {
		existing = await getNhanVienBySoCMND(data.SoCMND)
	}

	// Nếu đã có thì cập nhật, chưa có thì thêm mới
	if (existing) {
		await updateNhanVien(existing.MaNV, data)
	} else {
		await createNhanVien(data)
	}
}

module.exports = {
	getAllNhanVien,
	getNhanVienById,
	createNhanVien,
	updateNhanVien,
	deleteNhanVien,
	getNhanVienByEmail,
	getNhanVienBySoCMND,
	syncNhanVien,
}
