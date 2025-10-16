-- Tạo Database
CREATE DATABASE QuanLyKhachHang;
GO

USE QuanLyKhachHang;
GO

-- =========================
-- 1. Bảng KhachHang
-- =========================
CREATE TABLE KhachHang (
    MaKH INT IDENTITY(1,1) PRIMARY KEY,
    TenKH NVARCHAR(100) NOT NULL,
    GioiTinh NVARCHAR(10),
    NgaySinh DATE,
    SDT VARCHAR(15),
    DiaChi NVARCHAR(255)
);
GO

-- =========================
-- 2. Bảng TheTichDiem
-- =========================
CREATE TABLE TheTichDiem (
    MaThe INT IDENTITY(1,1) PRIMARY KEY,
    TenKH NVARCHAR(100),
    MaKH INT,
    SDT VARCHAR(15),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
);
GO

-- =========================
-- 3. Bảng NhanVien
-- =========================
CREATE TABLE NhanVien (
    MaNV INT IDENTITY(1,1) PRIMARY KEY,
    TenNV NVARCHAR(100) NOT NULL,
    GioiTinh NVARCHAR(10),
    SDT VARCHAR(15),
    Email VARCHAR(100)
);
GO

-- =========================
-- 4. Bảng NhaCungCap
-- =========================
CREATE TABLE NhaCungCap (
    MaNhaCungCap INT IDENTITY(1,1) PRIMARY KEY,
    TenNCC NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(255),
    Email VARCHAR(100),
    SDT VARCHAR(15)
);
GO

-- =========================
-- 5. Bảng DanhMucHangHoa
-- =========================
CREATE TABLE DanhMucHangHoa (
    MaDanhMuc INT IDENTITY(1,1) PRIMARY KEY,
    TenDanhMuc NVARCHAR(100) NOT NULL,
    TrangThai NVARCHAR(50)
);
GO

-- =========================
-- 6. Bảng HoaDon (đặt lại tên cột MaSP → MaHD)
-- =========================
CREATE TABLE HoaDon (
    MaHD INT IDENTITY(1,1) PRIMARY KEY,
    TenSP NVARCHAR(100) NOT NULL,
    MaDanhMuc INT,
    SoLuong INT,
    DonViTinh NVARCHAR(50),
    MaNCC INT,
    GiaBan DECIMAL(18,2),
    HanSuDung DATE,
    FOREIGN KEY (MaDanhMuc) REFERENCES DanhMucHangHoa(MaDanhMuc),
    FOREIGN KEY (MaNCC) REFERENCES NhaCungCap(MaNhaCungCap)
);
GO

-- =========================
-- 7. Bảng ThanhToan
-- =========================
CREATE TABLE ThanhToan (
    MaThanhToan INT IDENTITY(1,1) PRIMARY KEY,
    MaHD INT,
    TenHinhThucTT NVARCHAR(100),
    TrangThai NVARCHAR(50),
    FOREIGN KEY (MaHD) REFERENCES HoaDon(MaHD)
);
GO

-- =========================
-- 8. Bảng DonHang
-- =========================
CREATE TABLE DonHang (
    MaDonHang INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT,
    TenKH NVARCHAR(100),
    SDT VARCHAR(15),
    NgayMua DATE,
    SoLuong INT,
    ThanhTien DECIMAL(18,2),
    UuDai NVARCHAR(100),
    MaNV INT,
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
GO

-- =========================
-- 9. Bảng HinhThucGiaoHang
-- =========================
CREATE TABLE HinhThucGiaoHang (
    MaDonHang INT,
    MaHD INT,
    TenKH NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SDT VARCHAR(15),
    SoLuong INT,
    ThanhTien DECIMAL(18,2),
    TrangThai NVARCHAR(50),
    PRIMARY KEY (MaDonHang, MaHD),
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang),
    FOREIGN KEY (MaHD) REFERENCES HoaDon(MaHD)
);
GO

-- =========================
-- 10. Bảng DVChamSocKhachHang
-- =========================
CREATE TABLE DVChamSocKhachHang (
    MaKH INT,
    TenKH NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SDT VARCHAR(15),
    MaNV INT,
    MaThe INT,
    PhanHoi NVARCHAR(255),
    PRIMARY KEY (MaKH, MaNV),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    FOREIGN KEY (MaThe) REFERENCES TheTichDiem(MaThe)
);
GO


----------------------------
-- INSERT DATASET
----------------------------
USE QuanLyKhachHang;
GO

------------------------------------------------------------
-- 1️ KHÁCH HÀNG
------------------------------------------------------------
INSERT INTO KhachHang (TenKH, GioiTinh, NgaySinh, SDT, DiaChi)
VALUES
(N'Nguyễn Văn An', N'Nam', '1995-02-12', '0905123456', N'Hà Nội'),
(N'Trần Thị Bình', N'Nữ', '1998-07-25', '0906234567', N'Hồ Chí Minh'),
(N'Lê Hoàng Cường', N'Nam', '1990-11-05', '0911222333', N'Đà Nẵng'),
(N'Phạm Thị Dung', N'Nữ', '1997-09-17', '0923344556', N'Cần Thơ'),
(N'Vũ Minh Đức', N'Nam', '1989-03-20', '0934455667', N'Hải Phòng');
GO

------------------------------------------------------------
-- 2️ THẺ TÍCH ĐIỂM
------------------------------------------------------------
INSERT INTO TheTichDiem (TenKH, MaKH, SDT)
VALUES
(N'Nguyễn Văn An', 1, '0905123456'),
(N'Trần Thị Bình', 2, '0906234567'),
(N'Lê Hoàng Cường', 3, '0911222333'),
(N'Phạm Thị Dung', 4, '0923344556'),
(N'Vũ Minh Đức', 5, '0934455667');
GO

------------------------------------------------------------
-- 3️ NHÂN VIÊN
------------------------------------------------------------
INSERT INTO NhanVien (TenNV, GioiTinh, SDT, Email)
VALUES
(N'Nguyễn Thị Hoa', N'Nữ', '0988111222', 'hoa.nguyen@shop.vn'),
(N'Trần Văn Nam', N'Nam', '0977223344', 'nam.tran@shop.vn'),
(N'Lê Thị Phương', N'Nữ', '0966334455', 'phuong.le@shop.vn');
GO

------------------------------------------------------------
-- 4️ NHÀ CUNG CẤP
------------------------------------------------------------
INSERT INTO NhaCungCap (TenNCC, DiaChi, Email, SDT)
VALUES
(N'Công ty TNHH Sữa Vinamilk', N'Hồ Chí Minh', 'contact@vinamilk.com', '0281234567'),
(N'Công ty CP Acecook Việt Nam', N'Hồ Chí Minh', 'info@acecook.vn', '0282345678'),
(N'Công ty TNHH Bánh Kẹo Hải Hà', N'Hà Nội', 'sales@haiha.vn', '0243456789');
GO

------------------------------------------------------------
-- 5️ DANH MỤC HÀNG HÓA
------------------------------------------------------------
INSERT INTO DanhMucHangHoa (TenDanhMuc, TrangThai)
VALUES
(N'Sữa & Thức uống', N'Còn hàng'),
(N'Mì ăn liền', N'Còn hàng'),
(N'Bánh kẹo', N'Còn hàng');
GO

------------------------------------------------------------
-- 6️ HÓA ĐƠN (SẢN PHẨM)
------------------------------------------------------------
INSERT INTO HoaDon (TenSP, MaDanhMuc, SoLuong, DonViTinh, MaNCC, GiaBan, HanSuDung)
VALUES
(N'Sữa tươi Vinamilk 1L', 1, 100, N'Hộp', 1, 32000, '2025-12-01'),
(N'Mì Hảo Hảo Tôm chua cay', 2, 500, N'Gói', 2, 4500, '2026-03-10'),
(N'Bánh Chocopie Orion', 3, 200, N'Hộp', 3, 38000, '2025-07-01'),
(N'Sữa chua Vinamilk 4 hũ', 1, 150, N'Lốc', 1, 28000, '2025-08-15'),
(N'Mì Omachi Xốt bò hầm', 2, 300, N'Gói', 2, 5500, '2026-01-20');
GO

------------------------------------------------------------
-- 7️ THANH TOÁN
------------------------------------------------------------
INSERT INTO ThanhToan (MaHD, TenHinhThucTT, TrangThai)
VALUES
(1, N'Tiền mặt', N'Hoàn tất'),
(2, N'Chuyển khoản', N'Hoàn tất'),
(3, N'Momo', N'Đang xử lý'),
(4, N'Tiền mặt', N'Hoàn tất'),
(5, N'Thẻ ngân hàng', N'Hoàn tất');
GO

------------------------------------------------------------
-- 8️ ĐƠN HÀNG
------------------------------------------------------------
INSERT INTO DonHang (MaKH, TenKH, SDT, NgayMua, SoLuong, ThanhTien, UuDai, MaNV)
VALUES
(1, N'Nguyễn Văn An', '0905123456', '2025-09-15', 5, 160000, N'Giảm 10%', 1),
(2, N'Trần Thị Bình', '0906234567', '2025-09-20', 10, 45000, N'Tặng 1 gói', 2),
(3, N'Lê Hoàng Cường', '0911222333', '2025-09-25', 3, 114000, N'Giảm 5%', 1),
(4, N'Phạm Thị Dung', '0923344556', '2025-09-28', 2, 76000, N'Tặng voucher', 3),
(5, N'Vũ Minh Đức', '0934455667', '2025-10-01', 8, 304000, N'Giảm 15%', 2);
GO

------------------------------------------------------------
-- 9️ HÌNH THỨC GIAO HÀNG
------------------------------------------------------------
INSERT INTO HinhThucGiaoHang (MaDonHang, MaHD, TenKH, DiaChi, SDT, SoLuong, ThanhTien, TrangThai)
VALUES
(1, 1, N'Nguyễn Văn An', N'Hà Nội', '0905123456', 5, 160000, N'Đã giao'),
(2, 2, N'Trần Thị Bình', N'Hồ Chí Minh', '0906234567', 10, 45000, N'Đã giao'),
(3, 3, N'Lê Hoàng Cường', N'Đà Nẵng', '0911222333', 3, 114000, N'Đang giao'),
(4, 4, N'Phạm Thị Dung', N'Cần Thơ', '0923344556', 2, 76000, N'Chờ giao'),
(5, 5, N'Vũ Minh Đức', N'Hải Phòng', '0934455667', 8, 304000, N'Đã giao');
GO

------------------------------------------------------------
-- 10 DỊCH VỤ CHĂM SÓC KHÁCH HÀNG
------------------------------------------------------------
INSERT INTO DVChamSocKhachHang (MaKH, TenKH, DiaChi, SDT, MaNV, MaThe, PhanHoi)
VALUES
(1, N'Nguyễn Văn An', N'Hà Nội', '0905123456', 1, 1, N'Sản phẩm tốt, nhân viên thân thiện'),
(2, N'Trần Thị Bình', N'Hồ Chí Minh', '0906234567', 2, 2, N'Giao hàng nhanh, chất lượng ổn'),
(3, N'Lê Hoàng Cường', N'Đà Nẵng', '0911222333', 3, 3, N'Giá cả hợp lý, sẽ ủng hộ tiếp'),
(4, N'Phạm Thị Dung', N'Cần Thơ', '0923344556', 1, 4, N'Đóng gói cẩn thận'),
(5, N'Vũ Minh Đức', N'Hải Phòng', '0934455667', 2, 5, N'Sẽ giới thiệu cho bạn bè');
GO


--**********************************************************

--  ######     ##   ##   ##     ##   ##
--  ##   ##    ##  #  #  ##     ###  ##
--  ######     ## #    # ##     ## # ##
--  ##         ###      ###     ##  ###
--  ##         ##        ##     ##   ##

--**********************************************************


------------------------------------------------------------
-- 1. TẠO DATABASE
------------------------------------------------------------
CREATE DATABASE QuanLyNhanSu;
GO
USE QuanLyNhanSu;
GO

------------------------------------------------------------
-- 1. BẢNG TRÌNH ĐỘ HỌC VẤN
------------------------------------------------------------
CREATE TABLE TrinhDoHocVan (
    MaTDHV INT IDENTITY(1,1) PRIMARY KEY,
    LoaiTrinhDo NVARCHAR(50),
    TenTrinhDo NVARCHAR(100)
);
GO

------------------------------------------------------------
-- 2. BẢNG TRÌNH ĐỘ NGOẠI NGỮ
------------------------------------------------------------
CREATE TABLE TrinhDoNgoaiNgu (
    MaTDNN INT IDENTITY(1,1) PRIMARY KEY,
    LoaiNgoaiNgu NVARCHAR(50),
    CapDoNgoaiNgu NVARCHAR(50)
);
GO

------------------------------------------------------------
-- 3. BẢNG NGẠCH LƯƠNG
------------------------------------------------------------
CREATE TABLE NgachLuong (
    MaNgach INT IDENTITY(1,1) PRIMARY KEY,
    TenNgach NVARCHAR(100),
    NgachLuong DECIMAL(10,2)
);
GO

------------------------------------------------------------
-- 4. BẢNG BẬC LƯƠNG
------------------------------------------------------------
CREATE TABLE BacLuong (
    MaBac INT IDENTITY(1,1) PRIMARY KEY,
    TenBac NVARCHAR(50),
    BacLuong DECIMAL(10,2),
    MaNgach INT,
    FOREIGN KEY (MaNgach) REFERENCES NgachLuong(MaNgach)
);
GO

------------------------------------------------------------
-- 5. BẢNG CHỨC VỤ
------------------------------------------------------------
CREATE TABLE ChucVu (
    MaChucVu INT IDENTITY(1,1) PRIMARY KEY,
    TenChucVu NVARCHAR(100),
    TrangThai NVARCHAR(20)
);
GO

------------------------------------------------------------
-- 6. BẢNG PHÒNG BAN
------------------------------------------------------------
CREATE TABLE PhongBan (
    MaPhongBan INT IDENTITY(1,1) PRIMARY KEY,
    TenPhongBan NVARCHAR(100),
    DiaChi NVARCHAR(200),
    TrangThai NVARCHAR(20)
);
GO

------------------------------------------------------------
-- 7. BẢNG NHÂN VIÊN
------------------------------------------------------------
CREATE TABLE NhanVien (
    MaNV INT IDENTITY(1,1) PRIMARY KEY,
    HoTen NVARCHAR(100) NOT NULL,
    GioiTinh NVARCHAR(10),
    NgaySinh DATE,
    ThuongTru NVARCHAR(200),
    TamTru NVARCHAR(200),
    SoCMND NVARCHAR(20),
    SDT NVARCHAR(15),
    Email NVARCHAR(100),
    MaChucVu INT,
    MaPhong INT,
    MaTDHV INT,
    MaTDNN INT,
    MaBac INT,
    SoTaiKhoan NVARCHAR(20),
    NganHang NVARCHAR(50),
    FOREIGN KEY (MaChucVu) REFERENCES ChucVu(MaChucVu),
    FOREIGN KEY (MaPhong) REFERENCES PhongBan(MaPhongBan),
    FOREIGN KEY (MaTDHV) REFERENCES TrinhDoHocVan(MaTDHV),
    FOREIGN KEY (MaTDNN) REFERENCES TrinhDoNgoaiNgu(MaTDNN),
    FOREIGN KEY (MaBac) REFERENCES BacLuong(MaBac)
);
GO

------------------------------------------------------------
-- 8. BẢNG TÀI KHOẢN
------------------------------------------------------------
CREATE TABLE TaiKhoan (
    MaNV INT PRIMARY KEY,
    Pass NVARCHAR(100) NOT NULL,
    HoTen NVARCHAR(100),
    QuyenTruyCap NVARCHAR(50),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
GO

------------------------------------------------------------
-- 9. BẢNG KỶ LUẬT KHEN THƯỞNG
------------------------------------------------------------
CREATE TABLE KiLuatKhenThuong (
    MaKLKT INT IDENTITY(1,1) PRIMARY KEY,
    MaNV INT,
    HinhThuc NVARCHAR(50),
    SoQuyetDinh NVARCHAR(50),
    NgayQuyetDinh DATE,
    CoquanKTKT NVARCHAR(100),
    LiDo NVARCHAR(200),
    NguoiKi NVARCHAR(100),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
GO

------------------------------------------------------------
-- 10. BẢNG HỢP ĐỒNG LAO ĐỘNG
------------------------------------------------------------
CREATE TABLE HopDongLaoDong (
    MaHDLD INT IDENTITY(1,1) PRIMARY KEY,
    MaNV INT,
    LoaiHDLD NVARCHAR(50),
    NgayBatDau DATE,
    NgayKetThuc DATE,
    DiaDiemLamViec NVARCHAR(200),
    HeSoLuong DECIMAL(5,2),
    PhuCap DECIMAL(10,2),
    NguoiKi NVARCHAR(100),
    ChucVu NVARCHAR(100),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
GO

------------------------------------------------------------
-- 11. BẢNG BẢNG CHẤM CÔNG
------------------------------------------------------------
CREATE TABLE BangChamCong (
    MaChamCong INT IDENTITY(1,1) PRIMARY KEY,
    MaNV INT,
    MaNgach INT,
    MaBac INT,
    LuongCoBan DECIMAL(10,2),
    NgayChamCong DATE,
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    FOREIGN KEY (MaNgach) REFERENCES NgachLuong(MaNgach),
    FOREIGN KEY (MaBac) REFERENCES BacLuong(MaBac)
);
GO

------------------------------------------------------------
-- 12. BẢNG QUÁ TRÌNH CÔNG TÁC
------------------------------------------------------------
CREATE TABLE QuaTrinhCongTac (
    STT INT IDENTITY(1,1) PRIMARY KEY,
    MaNV INT,
    TenNV NVARCHAR(100),
    ChucVu NVARCHAR(100),
    PhongBan NVARCHAR(100),
    MaPhongBan INT,
    LamTu DATE,
    DenNgay DATE,
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    FOREIGN KEY (MaPhongBan) REFERENCES PhongBan(MaPhongBan)
);
GO


----------------------------
-- INSERT DATASET
----------------------------
USE QuanLyNhanSu;
GO

------------------------------------------------------------
-- 1️ TRÌNH ĐỘ HỌC VẤN
------------------------------------------------------------
INSERT INTO TrinhDoHocVan (LoaiTrinhDo, TenTrinhDo)
VALUES
(N'Cao đẳng', N'Cử nhân Kế toán'),
(N'Đại học', N'Kỹ sư Công nghệ thông tin'),
(N'Thạc sĩ', N'Quản trị kinh doanh');
GO

------------------------------------------------------------
-- 2️ TRÌNH ĐỘ NGOẠI NGỮ
------------------------------------------------------------
INSERT INTO TrinhDoNgoaiNgu (LoaiNgoaiNgu, CapDoNgoaiNgu)
VALUES
(N'Tiếng Anh', N'IELTS 6.5'),
(N'Tiếng Nhật', N'N2'),
(N'Tiếng Trung', N'HSK5');
GO

------------------------------------------------------------
-- 3️ NGẠCH LƯƠNG
------------------------------------------------------------
INSERT INTO NgachLuong (TenNgach, NgachLuong)
VALUES
(N'Ngạch A', 5500000),
(N'Ngạch B', 7500000),
(N'Ngạch C', 9500000);
GO

------------------------------------------------------------
-- 4️ BẬC LƯƠNG
------------------------------------------------------------
INSERT INTO BacLuong (TenBac, BacLuong, MaNgach)
VALUES
(N'Bậc 1', 1500000, 1),
(N'Bậc 2', 2500000, 2),
(N'Bậc 3', 3500000, 3);
GO

------------------------------------------------------------
-- 5️ CHỨC VỤ
------------------------------------------------------------
INSERT INTO ChucVu (TenChucVu, TrangThai)
VALUES
(N'Nhân viên', N'Đang làm việc'),
(N'Trưởng phòng', N'Đang làm việc'),
(N'Giám đốc', N'Đang làm việc');
GO

------------------------------------------------------------
-- 6️ PHÒNG BAN
------------------------------------------------------------
INSERT INTO PhongBan (TenPhongBan, DiaChi, TrangThai)
VALUES
(N'Phòng Kế Toán', N'Tầng 2, Tòa A, Trụ sở Hà Nội', N'Hoạt động'),
(N'Phòng Hành Chính - Nhân Sự', N'Tầng 3, Tòa A, Trụ sở Hà Nội', N'Hoạt động'),
(N'Phòng Kỹ Thuật', N'Tầng 4, Tòa B, Khu công nghệ cao Hòa Lạc', N'Hoạt động');
GO

------------------------------------------------------------
-- 7️ NHÂN VIÊN
------------------------------------------------------------
INSERT INTO NhanVien (
    HoTen, GioiTinh, NgaySinh, ThuongTru, TamTru,
    SoCMND, SDT, Email, MaChucVu, MaPhong, MaTDHV, MaTDNN, MaBac, SoTaiKhoan, NganHang
)
VALUES
(N'Nguyễn Minh Anh', N'Nam', '1992-04-10', N'Hà Nội', N'Hà Nội', N'012345678901', N'0905123456', N'minhanh.nguyen@company.vn', 1, 3, 2, 1, 1, N'9704001234567890', N'Vietcombank'),
(N'Lê Thị Mai', N'Nữ', '1995-09-22', N'Hải Phòng', N'Hà Nội', N'034567890123', N'0912345678', N'mai.le@company.vn', 2, 1, 3, 2, 2, N'9704222234567890', N'Techcombank'),
(N'Phạm Văn Dũng', N'Nam', '1986-12-05', N'Đà Nẵng', N'Hồ Chí Minh', N'045678901234', N'0987654321', N'dung.pham@company.vn', 3, 2, 3, 3, 3, N'9704367890123456', N'ACB');
GO

------------------------------------------------------------
-- 8️ TÀI KHOẢN
------------------------------------------------------------
INSERT INTO TaiKhoan (MaNV, Pass, HoTen, QuyenTruyCap)
VALUES
(1, N'Anh@123', N'Nguyễn Minh Anh', N'User'),
(2, N'Mai@123', N'Lê Thị Mai', N'Manager'),
(3, N'Dung@123', N'Phạm Văn Dũng', N'Admin');
GO

------------------------------------------------------------
-- 9️ KỶ LUẬT - KHEN THƯỞNG
------------------------------------------------------------
INSERT INTO KiLuatKhenThuong (MaNV, HinhThuc, SoQuyetDinh, NgayQuyetDinh, CoquanKTKT, LiDo, NguoiKi)
VALUES
(1, N'Khen thưởng', N'KT2024-01', '2024-04-30', N'Công ty TNHH ABC', N'Đạt thành tích trong dự án triển khai ERP', N'Phạm Văn Dũng'),
(2, N'Khen thưởng', N'KT2024-02', '2024-09-05', N'Công ty TNHH ABC', N'Hoàn thành xuất sắc kiểm toán nội bộ', N'Phạm Văn Dũng'),
(3, N'Kỷ luật', N'KL2024-01', '2024-06-10', N'Công ty TNHH ABC', N'Chậm trễ báo cáo định kỳ tháng 5', N'Lê Thị Mai');
GO

------------------------------------------------------------
-- 10 HỢP ĐỒNG LAO ĐỘNG
------------------------------------------------------------
INSERT INTO HopDongLaoDong (MaNV, LoaiHDLD, NgayBatDau, NgayKetThuc, DiaDiemLamViec, HeSoLuong, PhuCap, NguoiKi, ChucVu)
VALUES
(1, N'Hợp đồng 1 năm', '2024-01-01', '2024-12-31', N'Hà Nội', 1.25, 800000, N'Phạm Văn Dũng', N'Nhân viên kỹ thuật'),
(2, N'Hợp đồng 3 năm', '2023-06-01', '2026-06-01', N'Hà Nội', 1.55, 1200000, N'Phạm Văn Dũng', N'Trưởng phòng kế toán'),
(3, N'Hợp đồng không thời hạn', '2021-03-01', NULL, N'Hồ Chí Minh', 2.20, 2000000, N'Hội đồng quản trị', N'Giám đốc');
GO

------------------------------------------------------------
-- 1️1️ BẢNG CHẤM CÔNG
------------------------------------------------------------
INSERT INTO BangChamCong (MaNV, MaNgach, MaBac, LuongCoBan, NgayChamCong)
VALUES
(1, 1, 1, 6500000, '2024-09-01'),
(2, 2, 2, 9500000, '2024-09-01'),
(3, 3, 3, 13500000, '2024-09-01');
GO

------------------------------------------------------------
-- 1️2️ QUÁ TRÌNH CÔNG TÁC
------------------------------------------------------------
INSERT INTO QuaTrinhCongTac (MaNV, TenNV, ChucVu, PhongBan, MaPhongBan, LamTu, DenNgay)
VALUES
(1, N'Nguyễn Minh Anh', N'Nhân viên kỹ thuật', N'Phòng Kỹ Thuật', 3, '2023-02-15', NULL),
(2, N'Lê Thị Mai', N'Trưởng phòng', N'Phòng Kế Toán', 1, '2021-07-01', NULL),
(3, N'Phạm Văn Dũng', N'Giám đốc', N'Phòng Hành Chính - Nhân Sự', 2, '2018-01-10', NULL);
GO



-- =======================================================
-- TRIGGER ĐỒNG BỘ NHÂN VIÊN
-- =======================================================




--**********************************************************

--  ######     ##   ##   ##     ##   ##
--  ##   ##    ##  #  #  ##     ###  ##
--  ######     ## #    # ##     ## # ##
--  ##         ###      ###     ##  ###
--  ##         ##        ##     ##   ##

--**********************************************************


-- =============================================
-- TẠO DATABASE
-- =============================================
CREATE DATABASE QuanLyNhaCungCap;
GO
USE QuanLyNhaCungCap;
GO

------------------------------------------------------------
-- 1. BẢNG NHÂN VIÊN
------------------------------------------------------------
CREATE TABLE NhanVien (
    MaNV INT IDENTITY(1,1) PRIMARY KEY,
    HoTen NVARCHAR(100),
    GioiTinh NVARCHAR(10),
    NgaySinh DATE,
    DiaChi NVARCHAR(200),
    CCCD NVARCHAR(20),
    MaChucVu INT NULL,
    MaPhong INT NULL,
    STK NVARCHAR(50),
    NganHang NVARCHAR(100)
);
GO

------------------------------------------------------------
-- 2. BẢNG NHÀ CUNG CẤP
------------------------------------------------------------
CREATE TABLE NhaCC (
    MaNCC INT IDENTITY(1,1) PRIMARY KEY,
    TenNCC NVARCHAR(100),
    MaSoThue NVARCHAR(50),
    SDT NVARCHAR(15),
    Email NVARCHAR(100),
    Fax NVARCHAR(50),
    Website NVARCHAR(100),
    DiaChi NVARCHAR(200),
    TrangThai NVARCHAR(20)
);
GO

------------------------------------------------------------
-- 3. BẢNG NGUYÊN VẬT LIỆU
------------------------------------------------------------
CREATE TABLE NguyenVatLieu (
    MaNVL INT IDENTITY(1,1) PRIMARY KEY,
    TenNVL NVARCHAR(100),
    DonViTinh NVARCHAR(20),
    SoLuong INT,
    DonGia DECIMAL(18,2),
    ThanhTien AS (SoLuong * DonGia) PERSISTED
);
GO

------------------------------------------------------------
-- 4. BẢNG HÓA ĐƠN NHẬP
------------------------------------------------------------
CREATE TABLE HoaDonNhap (
    MaHDN INT IDENTITY(1,1) PRIMARY KEY,
    MaNV INT,
    MaNCC INT,
    MaNVL INT,
    SoLuongYeuCau INT,
    SoLuongThucNhan INT,
    NgayNhap DATE,
    HSD DATE,
    LoSX NVARCHAR(50),
    NgayTao DATE DEFAULT GETDATE(),
    Tong DECIMAL(18,2),

    CONSTRAINT FK_HDN_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT FK_HDN_NhaCC FOREIGN KEY (MaNCC) REFERENCES NhaCC(MaNCC),
    CONSTRAINT FK_HDN_NVL FOREIGN KEY (MaNVL) REFERENCES NguyenVatLieu(MaNVL)
);
GO

------------------------------------------------------------
-- 5. BẢNG CHI TIẾT HÓA ĐƠN
------------------------------------------------------------
CREATE TABLE ChiTietHoaDon (
    MaHDN INT,
    MaNV INT,
    MaNVL INT,
    SoLuongYeuCau INT,
    SoLuongNhan INT,
    DonViTinh NVARCHAR(20),
    DonGia DECIMAL(18,2),
    ThanhTien AS (SoLuongNhan * DonGia) PERSISTED,
    PRIMARY KEY (MaHDN, MaNV, MaNVL),

    CONSTRAINT FK_CTHD_HoaDon FOREIGN KEY (MaHDN) REFERENCES HoaDonNhap(MaHDN),
    CONSTRAINT FK_CTHD_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT FK_CTHD_NVL FOREIGN KEY (MaNVL) REFERENCES NguyenVatLieu(MaNVL)
);
GO

------------------------------------------------------------
-- 6. BẢNG PHIẾU NHẬP HÀNG
------------------------------------------------------------
CREATE TABLE PhieuNhapHang (
    MaPhieuNhap INT IDENTITY(1,1) PRIMARY KEY,
    NgayTao DATE DEFAULT GETDATE(),
    SoLuong INT,
    MaNCC INT,
    MaNV INT,
    MaNVL INT,
    DonGia DECIMAL(18,2),
    ThanhTien AS (SoLuong * DonGia) PERSISTED,
    MaHD INT,

    CONSTRAINT FK_PNH_NCC FOREIGN KEY (MaNCC) REFERENCES NhaCC(MaNCC),
    CONSTRAINT FK_PNH_NV FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT FK_PNH_NVL FOREIGN KEY (MaNVL) REFERENCES NguyenVatLieu(MaNVL),
    CONSTRAINT FK_PNH_HDN FOREIGN KEY (MaHD) REFERENCES HoaDonNhap(MaHDN)
);
GO

------------------------------------------------------------
-- 7. BẢNG HỢP ĐỒNG CUNG ỨNG
------------------------------------------------------------
CREATE TABLE HopDongCungUng (
    MaHDCC INT IDENTITY(1,1) PRIMARY KEY,
    MaNCC INT,
    MaNV INT,
    LoaiHinhCC NVARCHAR(50),
    NgayKy DATE,
    KetThucHopDong DATE,
    TriGia DECIMAL(18,2),
    MoTa NVARCHAR(200),
    MaNVL INT,

    CONSTRAINT FK_HDCC_NCC FOREIGN KEY (MaNCC) REFERENCES NhaCC(MaNCC),
    CONSTRAINT FK_HDCC_NV FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT FK_HDCC_NVL FOREIGN KEY (MaNVL) REFERENCES NguyenVatLieu(MaNVL)
);
GO

----------------------------
-- INSERT DATASET
----------------------------
USE QuanLyNhaCungCap;
GO

------------------------------------------------------------
--  NHÂN VIÊN
------------------------------------------------------------
INSERT INTO NhanVien (HoTen, GioiTinh, NgaySinh, DiaChi, CCCD, STK, NganHang)
VALUES
(N'Nguyễn Thị Hạnh', N'Nữ', '1985-07-12', N'25 Nguyễn Văn Cừ, Quảng Ngãi', N'024125678901', '012345678912', N'Vietcombank'),
(N'Phạm Quang Vũ', N'Nam', '1990-03-18', N'KCN Quảng Phú, Quảng Ngãi', N'024145678912', '045678912345', N'BIDV'),
(N'Lê Thanh Bình', N'Nam', '1992-11-09', N'12 Nguyễn Công Trứ, Đà Nẵng', N'024178912356', '078912345678', N'Techcombank'),
(N'Trần Mai Hương', N'Nữ', '1988-01-22', N'89 Nguyễn Huệ, Quy Nhơn', N'024199988877', '091234567890', N'ACB');
GO

------------------------------------------------------------
--  NHÀ CUNG CẤP
------------------------------------------------------------
INSERT INTO NhaCC (TenNCC, MaSoThue, SDT, Email, Fax, Website, DiaChi, TrangThai)
VALUES
(N'Công ty TNHH Nông sản Việt Nông', N'4001234567', '0905123456', 'contact@vietnong.vn', '02553888888', 'www.vietnong.vn', N'KCN Tịnh Phong, Quảng Ngãi', N'Hoạt động'),
(N'Công ty CP Bao bì Bình Minh', N'3109876543', '0912233445', 'info@baobibinhminh.vn', '02363777777', 'www.baobibinhminh.vn', N'KCN Hòa Khánh, Đà Nẵng', N'Hoạt động'),
(N'Công ty TNHH Đường Lam Sơn', N'2809998887', '0906345678', 'sales@duonglamson.vn', '02223888888', 'www.duonglamson.vn', N'Thọ Xuân, Thanh Hóa', N'Hoạt động'),
(N'Công ty Vận tải Phú Mỹ', N'0301122334', '0908777666', 'vanchuyen@phumytrans.vn', '02839393939', 'www.phumytrans.vn', N'Bình Dương', N'Hoạt động');
GO

------------------------------------------------------------
--  NGUYÊN VẬT LIỆU
------------------------------------------------------------
INSERT INTO NguyenVatLieu (TenNVL, DonViTinh, SoLuong, DonGia)
VALUES
(N'Đậu nành hạt (loại A)', N'Kg', 20000, 28000),
(N'Đường tinh luyện', N'Kg', 5000, 22000),
(N'Bao bì hộp giấy Tetra Pak', N'Cái', 100000, 550),
(N'Nắp chai nhựa PE', N'Cái', 50000, 180),
(N'Chai nhựa PET 500ml', N'Cái', 80000, 600);
GO

------------------------------------------------------------
--  HÓA ĐƠN NHẬP
------------------------------------------------------------
INSERT INTO HoaDonNhap (MaNV, MaNCC, MaNVL, SoLuongYeuCau, SoLuongThucNhan, NgayNhap, HSD, LoSX, Tong)
VALUES
(1, 1, 1, 20000, 19800, '2025-08-25', '2026-02-25', N'VN-SOY-0825', 19800 * 28000),
(2, 3, 2, 5000, 5000, '2025-08-27', '2026-08-27', N'LS-SUGAR-08', 5000 * 22000),
(3, 2, 3, 100000, 100000, '2025-08-28', NULL, N'BM-BOX-0825', 100000 * 550),
(4, 4, 5, 80000, 79500, '2025-08-29', NULL, N'PM-BOTTLE-0825', 79500 * 600);
GO

------------------------------------------------------------
--  CHI TIẾT HÓA ĐƠN
------------------------------------------------------------
INSERT INTO ChiTietHoaDon (MaHDN, MaNV, MaNVL, SoLuongYeuCau, SoLuongNhan, DonViTinh, DonGia)
VALUES
(1, 1, 1, 20000, 19800, N'Kg', 28000),
(2, 2, 2, 5000, 5000, N'Kg', 22000),
(3, 3, 3, 100000, 100000, N'Cái', 550),
(4, 4, 5, 80000, 79500, N'Cái', 600);
GO

------------------------------------------------------------
--  PHIẾU NHẬP HÀNG
------------------------------------------------------------
INSERT INTO PhieuNhapHang (NgayTao, SoLuong, MaNCC, MaNV, MaNVL, DonGia, MaHD)
VALUES
('2025-08-25', 19800, 1, 1, 1, 28000, 1),
('2025-08-27', 5000, 3, 2, 2, 22000, 2),
('2025-08-28', 100000, 2, 3, 3, 550, 3),
('2025-08-29', 79500, 4, 4, 5, 600, 4);
GO

------------------------------------------------------------
--  HỢP ĐỒNG CUNG ỨNG
------------------------------------------------------------
INSERT INTO HopDongCungUng (MaNCC, MaNV, LoaiHinhCC, NgayKy, KetThucHopDong, TriGia, MoTa, MaNVL)
VALUES
(1, 1, N'Cung cấp định kỳ', '2025-01-01', '2025-12-31', 554400000, N'Hợp đồng cung cấp đậu nành hạt cho nhà máy Vinasoy Quảng Ngãi', 1),
(2, 3, N'Cung cấp theo đơn hàng', '2025-03-15', '2025-09-30', 55000000, N'Hợp đồng cung cấp bao bì hộp giấy Tetra Pak cho sản phẩm Fami', 3),
(3, 2, N'Cung cấp định kỳ', '2025-02-10', '2025-12-31', 110000000, N'Hợp đồng cung cấp đường tinh luyện cho nhà máy sữa Fami Go', 2),
(4, 4, N'Hợp đồng dịch vụ vận chuyển', '2025-04-01', '2025-12-31', 72000000, N'Hợp đồng vận chuyển nguyên vật liệu từ kho Vinasoy Quảng Ngãi đến nhà máy Bình Dương', 5);
GO


-- =============================================
-- TRIGGER CẬP NHẬT TỒN KHO KHI THÊM PHIẾU NHẬP HÀNG
-- =============================================

