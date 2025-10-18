const nhanVienService = require('../services/nhanVienService')

const getAll = async (req, res) => {
    try {
        const data = await nhanVienService.getAllNhanVien()
        res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getById = async (req, res) => {
    try {
        const data = await nhanVienService.getNhanVienById(req.params.id)
        if (!data)
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' })
        res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify(data, null, 2))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const create = async (req, res) => {
    try {
        const data = await nhanVienService.createNhanVien(req.body)
        res.status(201).json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const update = async (req, res) => {
    try {
        const data = await nhanVienService.updateNhanVien(
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
        const data = await nhanVienService.deleteNhanVien(req.params.id)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { getAll, getById, create, update, remove }