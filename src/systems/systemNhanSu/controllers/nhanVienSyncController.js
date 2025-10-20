const nhanVienSyncService = require('../services/nhanVienSyncService')
const nhanVienService = require('../services/nhanVienService')

const syncNhanVien = async (req, res) => {
	try {
		const data = req.body.data || req.body
        
		// Kiểm tra dữ liệu tối thiểu
		if (!data || (!data.Email && !data.SoCMND)) {
			return res
				.status(400)
				.json({ message: 'Thiếu Email hoặc Số CMND để đồng bộ' })
		}

		await nhanVienService.syncNhanVien(data)
		res.json({ message: 'Đồng bộ nhân viên thành công' })
	} catch (err) {
		res.status(500).json({ message: 'Lỗi đồng bộ', error: err.message })
	}
}

module.exports = { syncNhanVien }
