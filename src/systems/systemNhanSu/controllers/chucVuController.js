const chucVuService = require('../services/chucVuService')

const getAll = async (req, res) => {
	try {
		const data = await chucVuService.getAllChucVu()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const getById = async (req, res) => {
	try {
		const data = await chucVuService.getChucVuById(req.params.id)
		if (!data)
			return res.status(404).json({ message: 'Không tìm thấy chức vụ' })
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const create = async (req, res) => {
	try {
		const data = await chucVuService.createChucVu(req.body)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const update = async (req, res) => {
	try {
		const data = await chucVuService.updateChucVu(req.params.id, req.body)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const remove = async (req, res) => {
	try {
		const data = await chucVuService.deleteChucVu(req.params.id)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
