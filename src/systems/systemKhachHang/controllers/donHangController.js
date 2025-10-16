const donHangService = require('../services/donHangService')

// Lấy danh sách đơn hàng
const getAll = async (req, res) => {
	try {
		const data = await donHangService.getAllDonHang()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Lấy đơn hàng theo ID
const getById = async (req, res) => {
	try {
		const data = await donHangService.getDonHangById(req.params.id)
		if (!data)
			return res.status(404).json({ message: 'Không tìm thấy đơn hàng' })
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Tạo đơn hàng mới
const create = async (req, res) => {
	try {
		const data = await donHangService.createDonHang(req.body)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Cập nhật đơn hàng
const update = async (req, res) => {
	try {
		const data = await donHangService.updateDonHang(req.params.id, req.body)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Xóa đơn hàng
const remove = async (req, res) => {
	try {
		const data = await donHangService.deleteDonHang(req.params.id)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
