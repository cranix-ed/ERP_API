const trinhDoNgoaiNguService = require('../services/trinhDoNgoaiNguService')

// Lấy tất cả
const getAll = async (req, res) => {
	try {
		const data = await trinhDoNgoaiNguService.getAllTrinhDoNgoaiNgu()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Lấy theo ID
const getById = async (req, res) => {
	try {
		const data = await trinhDoNgoaiNguService.getTrinhDoNgoaiNguById(
			req.params.id
		)
		if (!data)
			return res
				.status(404)
				.json({ message: 'Không tìm thấy trình độ ngoại ngữ' })
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Thêm mới
const create = async (req, res) => {
	try {
		const data = await trinhDoNgoaiNguService.createTrinhDoNgoaiNgu(
			req.body
		)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Cập nhật
const update = async (req, res) => {
	try {
		const data = await trinhDoNgoaiNguService.updateTrinhDoNgoaiNgu(
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
		const data = await trinhDoNgoaiNguService.deleteTrinhDoNgoaiNgu(
			req.params.id
		)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
