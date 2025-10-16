const express = require('express')
const router = express.Router()
const bangChamCongController = require('../controllers/bangChamCongController')

router.get('/', bangChamCongController.getAll)
router.get('/:id', bangChamCongController.getById)
router.post('/', bangChamCongController.create)
router.put('/:id', bangChamCongController.update)
router.delete('/:id', bangChamCongController.remove)

module.exports = router
