const express = require('express')
const router = express.Router()
const bacLuongController = require('../controllers/bacLuongController')
const checkExists = require('../../../middlewares/checkExists')

router.get('/', bacLuongController.getAll)
router.get('/:id', checkExists('BacLuong', 'MaBac'), bacLuongController.getById)
router.post('/', bacLuongController.create)
router.put('/:id', checkExists('BacLuong', 'MaBac'), bacLuongController.update)
router.delete('/:id', checkExists('BacLuong', 'MaBac'), bacLuongController.remove)

module.exports = router
