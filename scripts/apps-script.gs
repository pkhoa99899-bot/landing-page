/**
 * ============================================================
 *  HSN — ICLOUD LOAN LANDING: nhận đăng ký vay từ website
 *  Dán toàn bộ file này vào Apps Script của Google Sheet.
 *  Hướng dẫn từng bước: docs/HUONG-DAN-GOOGLE-SHEET.md
 * ============================================================
 */

// Chuỗi bí mật — PHẢI trùng với GOOGLE_SHEET_SECRET trong .env.local của website.
const SECRET = 'DAN_CHUOI_BI_MAT_VAO_DAY';

// Email nhận thông báo mỗi khi có khách đăng ký
const NOTIFY_EMAIL = 'pkhoa99899@gmail.com';

const SHEET_NAME = 'HSN';

const HEADERS = ['Thời gian', 'Tên', 'Máy (iPhone)', 'Nhu cầu vay', 'SĐT', 'Thiết bị', 'Trạng thái', 'Ghi chú'];

/** CHẠY HÀM NÀY MỘT LẦN sau khi dán code: tạo tab HSN, kẻ tiêu đề, bật bộ lọc. */
function thietLapBanDau() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setBackground('#073A91').setFontColor('#FFFFFF').setFontWeight('bold');
  sheet.setFrozenRows(1);

  [140, 180, 160, 140, 140, 90, 120, 220].forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  sheet.getRange('E:E').setNumberFormat('@'); // SĐT dạng văn bản, giữ số 0 đầu

  const col = sheet.getRange('G2:G2000');
  const mau = [
    ['Mới', '#FEF3C7', '#92400E'],
    ['Đã gọi', '#DBEAFE', '#1E40AF'],
    ['Đã duyệt', '#D1FAE5', '#065F46'],
    ['Từ chối', '#E5E7EB', '#4B5563'],
  ];
  sheet.setConditionalFormatRules(mau.map(function (m) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(m[0]).setBackground(m[1]).setFontColor(m[2]).setBold(true)
      .setRanges([col]).build();
  }));
  col.setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(mau.map(function (m) { return m[0]; }), true).setAllowInvalid(false).build());

  const boLocCu = sheet.getFilter();
  if (boLocCu) boLocCu.remove();
  sheet.getRange(1, 1, 1, HEADERS.length).createFilter();

  console.log('Đã thiết lập xong tab "' + SHEET_NAME + '". Giờ bấm Deploy để lấy link.');
}

/** Chặn formula injection: ô bắt đầu bằng = + - @ sẽ bị Sheets chạy như công thức. */
function oAnToan(giaTri) {
  const s = String(giaTri == null ? '' : giaTri);
  if (s === '') return '';
  if (/^[=+\-@\t\r\n]/.test(s)) return "'" + s;
  return s;
}

/** Chặn HTML injection vào email. */
function chuAnToan(giaTri) {
  return String(giaTri == null ? '' : giaTri)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Website gọi vào đây mỗi khi có khách gửi form. */
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return json({ ok: false, error: 'sai-khoa' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    const now = Utilities.formatDate(new Date(), 'Asia/Phnom_Penh', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      now,
      oAnToan(d.name),
      oAnToan(d.device),
      oAnToan(d.amount),
      "'" + String(d.phone || ''),
      oAnToan(d.client),
      'Mới',
      '',
    ]);

    guiEmail(d, now);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Mở link bằng trình duyệt để kiểm tra deploy đã chạy chưa. */
function doGet() {
  return json({ ok: true, message: 'Webhook HSN đang hoạt động.' });
}

function guiEmail(d, now) {
  try {
    const phone = String(d.phone || '').replace(/[^0-9+]/g, '');
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '🔔 Khách đăng ký vay: ' + String(d.name || '').replace(/[\r\n]/g, ' ') + ' — ' + phone,
      htmlBody:
        '<div style="font-family:Arial,sans-serif;max-width:520px">' +
        '<h2 style="color:#073A91;margin:0 0 4px">Đăng ký vay mới</h2>' +
        '<p style="color:#64748B;margin:0 0 16px;font-size:13px">' + chuAnToan(now) + '</p>' +
        '<table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">' +
        hang('Tên', chuAnToan(d.name)) +
        hang('SĐT', '<a href="tel:' + phone + '" style="color:#F44025;font-weight:bold;font-size:17px">' + phone + '</a>') +
        hang('Máy', chuAnToan(d.device)) +
        hang('Nhu cầu vay', chuAnToan(d.amount)) +
        '</table>' +
        '<p style="margin-top:18px"><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
        '" style="background:#073A91;color:#fff;padding:11px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">Mở bảng tính HSN</a></p>' +
        '</div>',
    });
  } catch (err) {
    console.error('Không gửi được email: ' + err);
  }
}

function hang(nhan, giaTri) {
  return '<tr><td style="border-bottom:1px solid #E2E8F0;color:#64748B;width:130px">' + nhan +
    '</td><td style="border-bottom:1px solid #E2E8F0;color:#0F172A"><b>' + (giaTri || '') + '</b></td></tr>';
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
