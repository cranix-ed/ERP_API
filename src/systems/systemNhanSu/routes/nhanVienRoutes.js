const express = require('express')
const router = express.Router()
const NhanVienController = require('../controllers/nhanVienController')

router.get('/', NhanVienController.getAll)
router.get('/:id', NhanVienController.getById)
router.post('/', NhanVienController.create)
router.put('/:id', NhanVienController.update)
router.delete('/:id', NhanVienController.remove)

module.exports = router
