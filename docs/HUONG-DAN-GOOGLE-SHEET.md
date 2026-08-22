# Kết nối form đăng ký vay → Google Sheet "HSN"

Làm một lần, khoảng **5–7 phút**, bằng tài khoản **pkhoa99899@gmail.com**.
Sau khi xong, mọi đăng ký từ website tự chảy vào Sheet, kèm email thông báo có nút gọi.

## Bước 1 — Tạo bảng tính
1. Đăng nhập Google bằng **pkhoa99899@gmail.com**, mở [sheets.new](https://sheets.new).
2. Đặt tên bảng tính: **HSN**.

## Bước 2 — Mở Apps Script
Menu **Tiện ích mở rộng → Apps Script** (*Extensions → Apps Script*).

## Bước 3 — Dán mã
1. Xóa sạch nội dung có sẵn.
2. Copy **toàn bộ** file `scripts/apps-script.gs` trong dự án, dán vào.
3. Sửa dòng `const SECRET = 'DAN_CHUOI_BI_MAT_VAO_DAY';` → dán giá trị `GOOGLE_SHEET_SECRET` trong `.env.local`.
4. **Lưu** (💾 hoặc `Ctrl+S`).

## Bước 4 — Chạy thiết lập
1. Ô chọn hàm → chọn **`thietLapBanDau`** → bấm **▷ Run**.
2. Google hỏi quyền: *Review permissions* → chọn tài khoản → *Advanced* → *Go to … (unsafe)* → **Allow**.
3. Quay lại bảng tính thấy tab **HSN** có tiêu đề xanh là xong.

## Bước 5 — Deploy
1. **Deploy → New deployment** → ⚙ → **Web app**.
2. *Execute as*: **Me** · *Who has access*: **Anyone** ⚠️ bắt buộc.
3. **Deploy** → copy **Web app URL** (`https://script.google.com/macros/s/…/exec`).

## Bước 6 — Dán URL vào website
`.env.local`:
```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
GOOGLE_SHEET_SECRET=<giữ nguyên chuỗi đã có>
```
Deploy lên Vercel thì nhập 2 biến này vào *Settings → Environment Variables*.

## Bước 7 — Kiểm tra
```bash
node scripts/test-sheet-webhook.mjs
```
Thấy 3 dấu ✓ là xong. Mở Sheet sẽ có dòng "KIEM TRA HE THONG" → xóa đi.

## Cột trong Sheet HSN
| Cột | Nội dung | Ai điền |
|---|---|---|
| A | Thời gian (giờ Phnom Penh) | Tự động |
| B | Tên | Khách |
| C | Máy (iPhone) | Khách |
| D | Nhu cầu vay | Khách |
| E | SĐT | Khách |
| F | Thiết bị (Mobile/Desktop) | Tự động |
| **G** | **Trạng thái**: Mới → Đã gọi → Đã duyệt / Từ chối | **Bạn** |
| **H** | **Ghi chú** | **Bạn** |

## Trục trặc
| Hiện tượng | Xử lý |
|---|---|
| Test báo "trang đăng nhập" | Deploy chưa chọn *Anyone*. **Deploy → Manage deployments → ✏️** sửa lại. |
| "KHÔNG chặn khóa sai" | `SECRET` trong Apps Script ≠ `.env.local`. |
| Sửa code không thấy đổi | Phải **Manage deployments → ✏️ → Version: New version → Deploy**. |
| Có dòng nhưng không có mail | Chạy lại `thietLapBanDau` và Allow đầy đủ quyền. |
