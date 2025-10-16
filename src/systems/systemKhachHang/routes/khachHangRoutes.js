const express = require('express')
const router = express.Router()
const khachHangController = require('../controllers/khachHangController')

router.get('/', khachHangController.getAll)
router.get('/:id', khachHangController.getById)
router.post('/', khachHangController.create)
router.put('/:id', khachHangController.update)
router.delete('/:id', khachHangController.remove)

module.exports = router
