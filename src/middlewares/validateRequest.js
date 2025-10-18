// src/middlewares/validateRequest.js

/**
 * Middleware kiểm tra dữ liệu đầu vào bằng hàm validate được truyền vào
 * @param {Function} validator - Hàm validate (ví dụ: validateNhanVien, validateKhachHang...)
 */
const validateRequest = (validator) => {
	return (req, res, next) => {
		try {
			const errors = validator(req.body)

			if (errors.length > 0) {
				return res.status(400).json({
					success: false,
					message: 'Dữ liệu không hợp lệ',
					errors,
				})
			}

			next()
		} catch (error) {
			console.error('Lỗi validate:', error)
			res.status(500).json({
				success: false,
				message: 'Lỗi trong quá trình kiểm tra dữ liệu',
			})
		}
	}
}

module.exports = validateRequest
