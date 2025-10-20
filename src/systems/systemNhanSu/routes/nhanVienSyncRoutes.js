const express = require('express')
const router = express.Router()
const nhanVienSyncController = require('../controllers/nhanVienSyncController')

// Endpoint: POST /systemNhanSu/nhanviensync/sync
router.post('/sync', nhanVienSyncController.syncNhanVien)

module.exports = router
