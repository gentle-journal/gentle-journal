# Littlest Things

**Descriptor:** Gentle Journal  
**Vietnamese tagline:** Nhật Ký Da Nhạy Cảm

Blog Jekyll tiếng Việt về skincare, hair care và travel care, theo định hướng faceless, bằng chứng trước hype, và phù hợp với GitHub Pages.

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

Repository hiện tại vẫn là `gentle-journal/gentle-journal`. Tên repository và GitHub Pages URL chưa đổi vì domain/URL chính thức cho Littlest Things chưa được chốt.

Quy trình deploy hiện tại:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

GitHub Pages sau đó rebuild site tự động.

## Brand naming

- **Masterbrand:** Littlest Things
- **Descriptor:** Gentle Journal
- **Vietnamese tagline:** Nhật Ký Da Nhạy Cảm
- **Hỏi Gentle:** giữ nguyên là tên feature hiện tại
- **Official custom domain:** TBD

Không đổi repository, GitHub Pages URL, route hoặc tên feature chỉ vì đổi masterbrand. Những thay đổi kỹ thuật đó cần quyết định riêng.

## Sau khi live / open items

- Chọn domain chính thức cho Littlest Things rồi cập nhật `CNAME`, `_config.yml` và contact email.
- Thay email placeholder `hello@gentlejournal.vn` sau khi email chính thức được chọn.
- Thay các link affiliate mẫu bằng link thật khi chương trình affiliate đã được xác nhận.
- Nội dung mẫu không được tự động coi là trải nghiệm test thật.
