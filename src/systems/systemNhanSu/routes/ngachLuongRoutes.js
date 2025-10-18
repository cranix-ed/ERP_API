const express = require('express')
const router = express.Router()
const ngachLuongController = require('../controllers/ngachLuongController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', ngachLuongController.getAll)
router.get(
	'/:id',
	checkExists('NgachLuong', 'MaNgach'),
	ngachLuongController.getById
)
router.post('/', ngachLuongController.create)
router.put(
	'/:id',
	checkExists('NgachLuong', 'MaNgach'),
	ngachLuongController.update
)
router.delete(
	'/:id',
	checkExists('NgachLuong', 'MaNgach'),
	ngachLuongController.remove
)

module.exports = router
