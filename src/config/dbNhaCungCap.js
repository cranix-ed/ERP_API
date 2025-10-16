const sql = require('mssql')
require('dotenv').config()

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	server: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	database: process.env.DB_NAME_NHACUNGCAP,
	options: {
		encrypt: false, // nếu chạy local
		trustServerCertificate: true, // bắt buộc cho localhost
		instancename: 'SQLEXPRESS',
	},
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
}

const pool = new sql.ConnectionPool(config)
const poolConnect = pool.connect()

poolConnect
    .then(() => console.log('✅ Connected to SQL Server'))
    .catch((err) => console.error('❌ Database Connection Failed!', err))

module.exports = { sql, pool, poolConnect }
