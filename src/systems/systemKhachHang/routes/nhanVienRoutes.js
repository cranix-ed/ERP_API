const express = require('express')
const router = express.Router()
const nhanVienController = require('../controllers/nhanVienController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateNhanVien } = require('../../../utils/validate')
const checkExists = require('../../../middlewares/checkExists')

// Routes
router.get('/', nhanVienController.getAll)
router.get('/:id', checkExists('NhanVien', 'MaNV'), nhanVienController.getById)
router.post('/', validateRequest(validateNhanVien), nhanVienController.create)
router.put(
	'/:id',
	checkExists('NhanVien', 'MaNV'),
	validateRequest(validateNhanVien),
	nhanVienController.update
)
router.delete(
	'/:id',
	checkExists('NhanVien', 'MaNV'),
	nhanVienController.remove
)

module.exports = router
