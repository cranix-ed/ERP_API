const express = require('express')
const router = express.Router()
const NhanVienController = require('../controllers/nhanVienController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateNhanVien } = require('../../../utils/validate')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', NhanVienController.getAll)
router.get('/:id', checkExists('NhanVien', 'MaNV'), NhanVienController.getById)
router.post('/', validateRequest(validateNhanVien), NhanVienController.create)
router.put(
	'/:id',
	checkExists('NhanVien', 'MaNV'),
	validateRequest(validateNhanVien),
	NhanVienController.update
)
router.delete('/:id', checkExists('NhanVien', 'MaNV'), NhanVienController.remove)

module.exports = router
