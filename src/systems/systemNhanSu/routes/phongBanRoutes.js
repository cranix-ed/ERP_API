const express = require('express')
const router = express.Router()
const phongBanController = require('../controllers/phongBanController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', phongBanController.getAll)
router.get(
	'/:id',
	checkExists('PhongBan', 'MaPhongBan'),
	phongBanController.getById
)
router.post('/', phongBanController.create)
router.put(
	'/:id',
	checkExists('PhongBan', 'MaPhongBan'),
	phongBanController.update
)
router.delete(
	'/:id',
	checkExists('PhongBan', 'MaPhongBan'),
	phongBanController.remove
)

module.exports = router
