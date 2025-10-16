const express = require('express')
const router = express.Router()
const chucVuController = require('../controllers/chucVuController')

router.get('/', chucVuController.getAll)
router.get('/:id', chucVuController.getById)
router.post('/', chucVuController.create)
router.put('/:id', chucVuController.update)
router.delete('/:id', chucVuController.remove)

module.exports = router
