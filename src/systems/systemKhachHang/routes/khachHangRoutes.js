const express = require('express')
const router = express.Router()
const khachHangController = require('../controllers/khachHangController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateKhachHang } = require('../../../utils/validate')

router.get('/', khachHangController.getAll)
router.get('/:id', khachHangController.getById)
router.post('/', validateRequest(validateKhachHang), khachHangController.create)
router.put('/:id', validateRequest(validateKhachHang), khachHangController.update)
router.delete('/:id', khachHangController.remove)

module.exports = router
