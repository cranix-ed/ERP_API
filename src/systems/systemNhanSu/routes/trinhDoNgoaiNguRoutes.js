const express = require('express')
const router = express.Router()
const trinhDoNgoaiNguController = require('../controllers/trinhDoNgoaiNguController')

router.get('/', trinhDoNgoaiNguController.getAll)
router.get('/:id', trinhDoNgoaiNguController.getById)
router.post('/', trinhDoNgoaiNguController.create)
router.put('/:id', trinhDoNgoaiNguController.update)
router.delete('/:id', trinhDoNgoaiNguController.remove)

module.exports = router
