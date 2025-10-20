const nhaCungCapService = require('../services/nhaCungCapService')

const getAll = async (req, res) => {
	try {
		const data = await nhaCungCapService.getAllNhaCungCap()
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const getById = async (req, res) => {
	try {
		const data = await nhaCungCapService.getNhaCungCapById(req.params.id)
		if (!data)
			return res
				.status(404)
				.json({ message: 'Không tìm thấy nhà cung cấp' })
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const create = async (req, res) => {
	try {
		const data = await nhaCungCapService.createNhaCungCap(req.body)
		res.status(201).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const update = async (req, res) => {
	try {
		const data = await nhaCungCapService.updateNhaCungCap(
			req.params.id,
			req.body
		)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const remove = async (req, res) => {
	try {
		const data = await nhaCungCapService.deleteNhaCungCap(req.params.id)
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { getAll, getById, create, update, remove }
