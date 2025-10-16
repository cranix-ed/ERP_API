const express = require('express')
const router = express.Router()
const phongBanController = require('../controllers/phongBanController')

router.get('/', phongBanController.getAll)
router.get('/:id', phongBanController.getById)
router.post('/', phongBanController.create)
router.put('/:id', phongBanController.update)
router.delete('/:id', phongBanController.remove)

module.exports = router
