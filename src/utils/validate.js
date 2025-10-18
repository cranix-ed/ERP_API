// src/utils/validate.js

/**
 * Validate Email hợp lệ
 */
function isValidEmail(email) {
	if (!email) return false
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validate số điện thoại Việt Nam (10-11 số, bắt đầu bằng 0)
 */
function isValidPhone(phone) {
	if (!phone) return false
	return /^0\d{9}$/.test(phone) // Bắt đầu bằng 0 + 9 số tiếp theo = 10 số
}


/**
 * Validate ngày hợp lệ (YYYY-MM-DD)
 */
function isValidDate(date) {
	if (!date) return false
	return !isNaN(Date.parse(date))
}

/**
 * Validate số CMND / CCCD (9 hoặc 12 số)
 */
function isValidCMND(cmnd) {
	if (!cmnd) return false
	return /^(\d{9}|\d{12})$/.test(cmnd)
}

/**
 * Validate Nha Cung Cap (NhaCC)
 */
function validateNhaCungCap(data) {
	const errors = []

	if (!data.TenNCC || data.TenNCC.trim() === '')
		errors.push('Tên nhà cung cấp là bắt buộc')

	if (data.SDT && !isValidPhone(data.SDT))
		errors.push('Số điện thoại nhà cung cấp không hợp lệ')

	if (data.Email && !isValidEmail(data.Email))
		errors.push('Email nhà cung cấp không hợp lệ')

	if (data.MaSoThue && !/^\d{10,13}$/.test(data.MaSoThue))
		errors.push('Mã số thuế phải gồm 10-13 chữ số')

	if (data.Website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(data.Website))
		errors.push('Website không hợp lệ (phải bắt đầu bằng http hoặc https)')

	if (
		data.TrangThai &&
		!['Hoạt động', 'Ngừng hoạt động'].includes(data.TrangThai)
	)
		errors.push('Trạng thái chỉ được là "Hoạt động" hoặc "Ngừng hoạt động"')

	return errors
}

/**
 * Validate Nhan Vien
 */
function validateNhanVien(data) {
	const errors = []

	if (!data.HoTen || data.HoTen.trim() === '')
		errors.push('Họ tên nhân viên là bắt buộc')

	if (data.Email && !isValidEmail(data.Email))
		errors.push('Email nhân viên không hợp lệ')

	if (!data.SDT && !isValidPhone(data.SDT))
		errors.push('Số điện thoại nhân viên không hợp lệ')

	if (data.SoCMND && !isValidCMND(data.SoCMND))
		errors.push('Số CMND/CCCD không hợp lệ')

	if (data.NgaySinh && !isValidDate(data.NgaySinh))
		errors.push('Ngày sinh nhân viên không hợp lệ')

	if (data.GioiTinh && !['Nam', 'Nữ'].includes(data.GioiTinh))
		errors.push('Giới tính phải là "Nam" hoặc "Nữ"')

	return errors
}

/**
 * Validate Khach Hang
 */
function validateKhachHang(data) {
	const errors = []

	if (!data.TenKH || data.TenKH.trim() === '')
		errors.push('Tên khách hàng là bắt buộc')

	if (data.SDT && !isValidPhone(data.SDT))
		errors.push('Số điện thoại khách hàng không hợp lệ')

	if (data.NgaySinh && !isValidDate(data.NgaySinh))
		errors.push('Ngày sinh khách hàng không hợp lệ')

	if (data.GioiTinh && !['Nam', 'Nữ'].includes(data.GioiTinh))
		errors.push('Giới tính phải là "Nam" hoặc "Nữ"')

	return errors
}

/**
 * Validate Don Hang
 */
function validateDonHang(data) {
	const errors = []

	if (!data.MaKH) errors.push('Mã khách hàng là bắt buộc')

	if (!data.TenKH || data.TenKH.trim() === '')
		errors.push('Tên khách hàng là bắt buộc')

	if (data.SDT && !isValidPhone(data.SDT))
		errors.push('Số điện thoại trong đơn hàng không hợp lệ')

	if (data.NgayMua && !isValidDate(data.NgayMua))
		errors.push('Ngày mua không hợp lệ')

	if (data.SoLuong && (isNaN(data.SoLuong) || data.SoLuong <= 0))
		errors.push('Số lượng phải là số nguyên dương')

	if (data.ThanhTien && (isNaN(data.ThanhTien) || data.ThanhTien < 0))
		errors.push('Thành tiền phải là số hợp lệ và không âm')

	return errors
}

/**
 * Export tất cả validate
 */
module.exports = {
	isValidEmail,
	isValidPhone,
	isValidDate,
	isValidCMND,
	validateNhaCungCap,
	validateNhanVien,
	validateKhachHang,
	validateDonHang,
}
