const khachHangService = require('../services/khachHangService')

// Lấy danh sách khách hàng
const getAll = async (req, res) => {
	try {
		const data = await khachHangService.getAllKhachHang()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2)) // JSON đẹp
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Lấy khách hàng theo ID
const getById = async (req, res) => {
	try {
		const data = await khachHangService.getKhachHangById(req.params.id)
		if (!data)
			return res
				.status(404)
				.json({ message: 'Không tìm thấy khách hàng' })
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Tạo khách hàng mới
const create = async (req, res) => {
	try {
		const data = await khachHangService.createKhachHang(req.body)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Cập nhật thông tin khách hàng
const update = async (req, res) => {
	try {
		const data = await khachHangService.updateKhachHang(
			req.params.id,
			req.body
		)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Xóa khách hàng
const remove = async (req, res) => {
	try {
		const data = await khachHangService.deleteKhachHang(req.params.id)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
