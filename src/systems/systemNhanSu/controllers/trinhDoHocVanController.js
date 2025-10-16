const trinhDoHocVanService = require('../services/trinhDoHocVanService')

// Lấy tất cả
const getAll = async (req, res) => {
	try {
		const data = await trinhDoHocVanService.getAllTrinhDoHocVan()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Lấy theo ID
const getById = async (req, res) => {
	try {
		const data = await trinhDoHocVanService.getTrinhDoHocVanById(
			req.params.id
		)
		if (!data)
			return res
				.status(404)
				.json({ message: 'Không tìm thấy trình độ học vấn' })
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Thêm mới
const create = async (req, res) => {
	try {
		const data = await trinhDoHocVanService.createTrinhDoHocVan(req.body)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Cập nhật
const update = async (req, res) => {
	try {
		const data = await trinhDoHocVanService.updateTrinhDoHocVan(
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
		const data = await trinhDoHocVanService.deleteTrinhDoHocVan(
			req.params.id
		)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
