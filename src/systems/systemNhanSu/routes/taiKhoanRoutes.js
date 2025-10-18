const express = require('express')
const router = express.Router()
const taiKhoanController = require('../controllers/taiKhoanController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', taiKhoanController.getAll)
router.get('/:id', checkExists('TaiKhoan', 'MaNV'), taiKhoanController.getById)
router.post('/', taiKhoanController.create)
router.put('/:id', checkExists('TaiKhoan', 'MaNV'), taiKhoanController.update)
router.delete('/:id', checkExists('TaiKhoan', 'MaNV'), taiKhoanController.remove)

module.exports = router
