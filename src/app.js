require('dotenv').config()
const express = require('express')
const cors = require('cors') 
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()
app.use(express.json())

app.use(
	cors({
		origin: '*', // cho phép tất cả frontend gọi đến
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

/* 
=========NHAN SU==========
*/
// Require routes Nhan Su
const nhanVienRoutes = require('./systems/systemNhanSu/routes/nhanVienRoutes')
const phongBanRoutes = require('./systems/systemNhanSu/routes/phongBanRoutes')
const chucVuRoutes = require('./systems/systemNhanSu/routes/chucVuRoutes')
const bacLuongRoutes = require('./systems/systemNhanSu/routes/bacLuongRoutes')
const ngachLuongRoutes = require('./systems/systemNhanSu/routes/ngachLuongRoutes')
const trinhDoNgoaiNguRoutes = require('./systems/systemNhanSu/routes/trinhDoNgoaiNguRoutes')
const trinhDoHocVanRoutes = require('./systems/systemNhanSu/routes/trinhDoHocVanRoutes')
const bangChamCongRoutes = require('./systems/systemNhanSu/routes/bangChamCongRoutes')
const taiKhoanRoutes = require('./systems/systemNhanSu/routes/taiKhoanRoutes')

// Define routes Nhan Su
app.use('/systemNhanSu/nhanvien', nhanVienRoutes)
app.use('/systemNhanSu/phongban', phongBanRoutes)
app.use('/systemNhanSu/chucvu', chucVuRoutes)
app.use('/systemNhanSu/bacluong', bacLuongRoutes)
app.use('/systemNhanSu/ngachluong', ngachLuongRoutes)
app.use('/systemNhanSu/trinhdongoaingu', trinhDoNgoaiNguRoutes)
app.use('/systemNhanSu/trinhdohocvan', trinhDoHocVanRoutes)
app.use('/systemNhanSu/chamcong', bangChamCongRoutes)
app.use('/systemNhanSu/taikhoan', taiKhoanRoutes)

/* 
=========KHACH HANG==========
*/
const khachHangRoutes = require('./systems/systemKhachHang/routes/khachHangRoutes')
const donHangRoutes = require('./systems/systemKhachHang/routes/donHangRoutes')
const nhanVienKHRoutes = require('./systems/systemKhachHang/routes/nhanVienRoutes')


app.use('/systemKhachHang/donhang', donHangRoutes)
app.use('/systemKhachHang/khachhang', khachHangRoutes)
app.use('/systemKhachHang/nhanvien', nhanVienKHRoutes)


/* 
=========NHA CUNG CAP==========
*/
const nhaCungCapRoutes = require('./systems/systemNhaCungCap/routes/nhaCungCapRoutes')
const nhanVienNCCRoutes = require('./systems/systemNhaCungCap/routes/nhanVienRoutes')

app.use('/systemNhaCungCap/nhacungcap', nhaCungCapRoutes)
app.use('/systemNhaCungCap/nhanvien', nhanVienNCCRoutes)


const nhanVienSyncRoutes = require('./systems/systemNhanSu/routes/nhanVienSyncRoutes')
// const nhanVienNCCSyncRoutes = require('./systems/systemNhaCungCap/routes/nhanVienSyncRoutes')
// const nhanVienKHSyncRoutes = require('./systems/systemKhachHang/routes/nhanVienSyncRoutes')

// Mount routes
app.use('/systemNhanSu/nhanviensync', nhanVienSyncRoutes)
// app.use('/systemNhaCungCap/nhanviensync', nhanVienNCCSyncRoutes)
// app.use('/systemKhachHang/nhanviensync', nhanVienKHSyncRoutes)


app.use(errorHandler)

const PORT = process.env.PORT || 9717
app.listen(PORT, () =>
	console.log(`🚀 Server chạy tại http://localhost:${PORT}`)
)
