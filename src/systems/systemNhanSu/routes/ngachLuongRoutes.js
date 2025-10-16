const express = require('express')
const router = express.Router()
const ngachLuongController = require('../controllers/ngachLuongController')

router.get('/', ngachLuongController.getAll)
router.get('/:id', ngachLuongController.getById)
router.post('/', ngachLuongController.create)
router.put('/:id', ngachLuongController.update)
router.delete('/:id', ngachLuongController.remove)

module.exports = router
