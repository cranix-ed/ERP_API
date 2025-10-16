const sql = require('mssql')
require('dotenv').config()

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	server: process.env.DB_HOST,
	database: process.env.DB_NAME,
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
}

async function testConnection() {
	try {
		await sql.connect(config)
		console.log('✅ Kết nối SQL Server thành công!')
		const result = await sql.query`SELECT GETDATE() AS Now`
		console.log(result.recordset)
	} catch (err) {
		console.error('❌ Kết nối thất bại:', err)
	} finally {
		await sql.close()
	}
}

testConnection()
