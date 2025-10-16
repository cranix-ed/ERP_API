const express = require('express')
const router = express.Router()
const bacLuongController = require('../controllers/bacLuongController')

router.get('/', bacLuongController.getAll)
router.get('/:id', bacLuongController.getById)
router.post('/', bacLuongController.create)
router.put('/:id', bacLuongController.update)
router.delete('/:id', bacLuongController.remove)

module.exports = router
