const express = require('express')
const router = express.Router()
const nhaCungCapController = require('../controllers/nhaCungCapController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateNhaCungCap } = require('../../../utils/validate')
const checkExists = require('../../../middlewares/checkExistsNCC')

router.get('/', nhaCungCapController.getAll)
router.get('/:id', checkExists('NhaCC', 'MaNCC'), nhaCungCapController.getById)
router.post(
	'/',
	validateRequest(validateNhaCungCap),
	nhaCungCapController.create
)
router.put(
	'/:id',
	checkExists('NhaCC', 'MaNCC'),
	validateRequest(validateNhaCungCap),
	nhaCungCapController.update
)
router.delete(
	'/:id',
	checkExists('NhaCC', 'MaNCC'),
	nhaCungCapController.remove
)

module.exports = router
