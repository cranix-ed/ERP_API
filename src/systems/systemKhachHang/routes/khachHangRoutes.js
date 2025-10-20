const express = require('express')
const router = express.Router()
const khachHangController = require('../controllers/khachHangController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateKhachHang } = require('../../../utils/validate')
const checkExists = require('../../../middlewares/checkExistsKH')

router.get('/', khachHangController.getAll)
router.get(
	'/:id',
	checkExists('KhachHang', 'MaKH'),
	khachHangController.getById
)
router.post('/', validateRequest(validateKhachHang), khachHangController.create)
router.put(
	'/:id',
	checkExists('KhachHang', 'MaKH'),
	validateRequest(validateKhachHang),
	khachHangController.update
)
router.delete(
	'/:id',
	checkExists('KhachHang', 'MaKH'),
	khachHangController.remove
)

module.exports = router
