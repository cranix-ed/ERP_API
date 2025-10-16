const bangChamCongService = require('../services/bangChamCongService')

// Lấy tất cả
const getAll = async (req, res) => {
	try {
		const data = await bangChamCongService.getAllBangChamCong()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Lấy theo ID
const getById = async (req, res) => {
	try {
		const data = await bangChamCongService.getBangChamCongById(
			req.params.id
		)
		if (!data)
			return res
				.status(404)
				.json({ message: 'Không tìm thấy bản ghi chấm công' })
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Thêm mới
const create = async (req, res) => {
	try {
		const data = await bangChamCongService.createBangChamCong(req.body)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Cập nhật
const update = async (req, res) => {
	try {
		const data = await bangChamCongService.updateBangChamCong(
			req.params.id,
			req.body
		)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Xóa
const remove = async (req, res) => {
	try {
		const data = await bangChamCongService.deleteBangChamCong(req.params.id)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
