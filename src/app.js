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

// Define routes Nhan Su
app.use('/systemNhanSu/nhanvien', nhanVienRoutes)
app.use('/systemNhanSu/phongban', phongBanRoutes)
app.use('/systemNhanSu/chucvu', chucVuRoutes)
app.use('/systemNhanSu/bacluong', bacLuongRoutes)
app.use('/systemNhanSu/ngachluong', ngachLuongRoutes)
app.use('/systemNhanSu/trinhdongoaingu', trinhDoNgoaiNguRoutes)
app.use('/systemNhanSu/trinhdohocvan', trinhDoHocVanRoutes)
app.use('/systemNhanSu/chamcong', bangChamCongRoutes)

/* 
=========KHACH HANG==========
*/
const khachHangRoutes = require('./systems/systemKhachHang/routes/khachHangRoutes')
const donHangRoutes = require('./systems/systemKhachHang/routes/donHangRoutes')


app.use('/systemKhachHang/donhang', donHangRoutes)
app.use('/systemKhachHang/khachhang', khachHangRoutes)


/* 
=========NHA CUNG CAP==========
*/

app.use(errorHandler)

const PORT = process.env.PORT || 9717
app.listen(PORT, () =>
	console.log(`🚀 Server chạy tại http://localhost:${PORT}`)
)
