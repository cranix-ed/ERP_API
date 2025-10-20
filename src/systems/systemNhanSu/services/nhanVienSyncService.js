const nhanVienService = require('../services/nhanVienService')
const axios = require('axios')

// Hàm xử lý logic đồng bộ


// services/nhanVienSyncService.js
const syncToOtherSystems = async (nhanVien) => {
	if (!nhanVien.LoaiNV) return // Không biết nhân viên thuộc hệ thống nào

	let syncUrl
	let dataSync = {
		HoTen: nhanVien.HoTen,
		GioiTinh: nhanVien.GioiTinh,
		SDT: nhanVien.SDT,
		Email: nhanVien.Email,
	}

	if (nhanVien.LoaiNV === 'nhacungcap') {
		syncUrl = 'http://localhost:9717/systemNhaCungCap/nhanvien'
		dataSync = {
			...dataSync,
			NgaySinh: nhanVien.NgaySinh,
			DiaChi: nhanVien.ThuongTru || nhanVien.TamTru,
			SoCMND: nhanVien.SoCMND,
			STK: nhanVien.SoTaiKhoan,
			NganHang: nhanVien.NganHang,
		}
	} else if (nhanVien.LoaiNV === 'khachhang') {
		syncUrl = 'http://localhost:9717/systemKhachHang/nhanvien'
	}

	if (!syncUrl) return

	try {
		await axios.post(syncUrl, { ...dataSync, fromSync: true})
		console.log(`✅ Đồng bộ sang ${nhanVien.LoaiNV} thành công`)
	} catch (err) {
		console.error(`❌ Lỗi sync sang ${nhanVien.LoaiNV}:`, err.message)
	}
}


module.exports = { syncToOtherSystems, }
