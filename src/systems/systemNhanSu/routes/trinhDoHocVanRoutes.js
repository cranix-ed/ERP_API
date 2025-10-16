const express = require('express')
const router = express.Router()
const trinhDoHocVanController = require('../controllers/trinhDoHocVanController')

router.get('/', trinhDoHocVanController.getAll)
router.get('/:id', trinhDoHocVanController.getById)
router.post('/', trinhDoHocVanController.create)
router.put('/:id', trinhDoHocVanController.update)
router.delete('/:id', trinhDoHocVanController.remove)

module.exports = router
