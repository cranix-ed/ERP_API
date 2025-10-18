const express = require('express')
const router = express.Router()
const bangChamCongController = require('../controllers/bangChamCongController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', bangChamCongController.getAll)
router.get(
	'/:id',
	checkExists('BangChamCong', 'MaChamCong'),
	bangChamCongController.getById
)
router.post('/', bangChamCongController.create)
router.put(
	'/:id',
	checkExists('BangChamCong', 'MaChamCong'),
	bangChamCongController.update
)
router.delete(
	'/:id',
	checkExists('BangChamCong', 'MaChamCong'),
	bangChamCongController.remove
)

module.exports = router
