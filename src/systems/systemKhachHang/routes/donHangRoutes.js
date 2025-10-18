const express = require('express')
const router = express.Router()
const donHangController = require('../controllers/donHangController')
const validateRequest = require('../../../middlewares/validateRequest')
const { validateDonHang } = require('../../../utils/validate')

router.get('/', donHangController.getAll)
router.get('/:id', donHangController.getById)
router.post('/', validateRequest(validateDonHang), donHangController.create)
router.put('/:id', validateRequest(validateDonHang), donHangController.update)
router.delete('/:id', donHangController.remove)

module.exports = router
