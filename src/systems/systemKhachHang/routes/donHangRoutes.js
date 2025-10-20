const express = require('express')
const router = express.Router()
const donHangController = require('../controllers/donHangController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateDonHang } = require('../../../utils/validate')
const checkExists = require('../../../middlewares/checkExistsKH')

router.get('/', donHangController.getAll)
router.get('/:id', checkExists('DonHang', 'MaDonHang'), donHangController.getById)
router.post('/', validateRequest(validateDonHang), donHangController.create)
router.put(
	'/:id',
	checkExists('DonHang', 'MaDonHang'),
	validateRequest(validateDonHang),
	donHangController.update
)
router.delete(
	'/:id',
	checkExists('DonHang', 'MaDonHang'),
	donHangController.remove
)

module.exports = router
