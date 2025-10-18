const express = require('express')
const router = express.Router()
const trinhDoNgoaiNguController = require('../controllers/trinhDoNgoaiNguController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', trinhDoNgoaiNguController.getAll)
router.get(
	'/:id',
	checkExists('TrinhDoNgoaiNgu', 'MaTDNN'),
	trinhDoNgoaiNguController.getById
)
router.post('/', trinhDoNgoaiNguController.create)
router.put(
	'/:id',
	checkExists('TrinhDoNgoaiNgu', 'MaTDNN'),
	trinhDoNgoaiNguController.update
)
router.delete(
	'/:id',
	checkExists('TrinhDoNgoaiNgu', 'MaTDNN'),
	trinhDoNgoaiNguController.remove
)

module.exports = router
