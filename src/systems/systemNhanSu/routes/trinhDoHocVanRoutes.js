const express = require('express')
const router = express.Router()
const trinhDoHocVanController = require('../controllers/trinhDoHocVanController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', trinhDoHocVanController.getAll)
router.get(
	'/:id',
	checkExists('TrinhDoHocVan', 'MaTDHV'),
	trinhDoHocVanController.getById
)
router.post('/', trinhDoHocVanController.create)
router.put(
	'/:id',
	checkExists('TrinhDoHocVan', 'MaTDHV'),
	trinhDoHocVanController.update
)
router.delete(
	'/:id',
	checkExists('TrinhDoHocVan', 'MaTDHV'),
	trinhDoHocVanController.remove
)

module.exports = router
