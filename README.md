# Gentle Journal (Nhật Ký Da Nhạy Cảm)

Blog Jekyll cho nội dung skincare/personal care tiếng Việt, không cần ảnh cá nhân, sẵn sàng deploy qua GitHub Pages.

## Cấu trúc

```
_reviews/      → Review sản phẩm       → /reviews/ten-bai/
_kien-thuc/    → Kiến thức thành phần  → /kien-thuc-da/ten-bai/
_nhat-ky/      → Nhật ký routine       → /nhat-ky/ten-bai/
_so-sanh/      → So sánh sản phẩm      → /so-sanh/ten-bai/
_layouts/      → Khung trang (default, post)
_includes/     → Header, footer
assets/css/    → Style chính (style.scss)
```

## Viết bài mới

Tạo file `.md` mới trong thư mục collection tương ứng (`_reviews`, `_kien-thuc`, `_nhat-ky`, `_so-sanh`), với front matter:

```yaml
---
title: "Tiêu đề bài viết"
skin_type: "Khô, dễ kích ứng"     # optional
duration_tested: "4 tuần"          # optional
affiliate: true                    # true nếu có link affiliate
date: 2026-01-20
---
Nội dung bài viết ở đây...
```

Tên file quyết định URL, ví dụ `_reviews/kem-chong-nang-cho-da-kho.md` → `/reviews/kem-chong-nang-cho-da-kho/`.

## Chạy thử ở máy (tuỳ chọn, cần Ruby)

```bash
bundle install
bundle exec jekyll serve
```

Mở `http://localhost:4000`.

## Đưa lên GitHub Pages

1. Tạo repo mới trên GitHub, ví dụ `gentle-journal` (Settings > tên tuỳ bạn).
2. Trong thư mục này:
   ```bash
   git init
   git add .
   git commit -m "Initial Gentle Journal site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gentle-journal.git
   git push -u origin main
   ```
3. Trên GitHub: vào repo → **Settings → Pages** → dưới "Build and deployment", chọn **Source: Deploy from a branch** → **Branch: main / (root)** → Save.
4. Sau 1–2 phút, site sẽ live tại `https://<your-username>.github.io/gentle-journal/`.
5. (Tuỳ chọn) Muốn dùng domain riêng: thêm file `CNAME` chứa domain của bạn vào thư mục gốc, và trỏ DNS domain đó (CNAME record) về `<your-username>.github.io`.

## Sau khi live

- Sửa email thật trong `lien-he.html`.
- Thay các link `#` affiliate trong bài mẫu bằng link affiliate thật (Shopee/Lazada/Accesstrade/...).
- Xoá 4 bài mẫu hoặc giữ lại làm khung tham khảo khi viết bài mới.
