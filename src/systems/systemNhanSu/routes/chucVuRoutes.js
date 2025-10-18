const express = require('express')
const router = express.Router()
const chucVuController = require('../controllers/chucVuController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', chucVuController.getAll)
router.get('/:id', checkExists('ChucVu', 'MaChucVu'), chucVuController.getById)
router.post('/', chucVuController.create)
router.put('/:id', checkExists('ChucVu', 'MaChucVu'), chucVuController.update)
router.delete('/:id', checkExists('ChucVu', 'MaChucVu'), chucVuController.remove)

module.exports = router
