const express = require('express')
const router = express.Router()
const taiKhoanController = require('../controllers/taiKhoanController')

router.get('/', taiKhoanController.getAll)
router.get('/:id', taiKhoanController.getById)
router.post('/', taiKhoanController.create)
router.put('/:id', taiKhoanController.update)
router.delete('/:id', taiKhoanController.remove)

module.exports = router
