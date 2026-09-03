# Littlest Things

**Vietnamese tagline:** Nhật Ký Da Nhạy Cảm

Littlest Things là website biên tập tiếng Việt về skincare, hair care và travel care, theo định hướng faceless, bằng chứng trước hype, và phù hợp với Jekyll + GitHub Pages.

## Cấu trúc

```text
_reviews/      → Review sản phẩm       → /reviews/ten-bai/
_kien-thuc/    → Kiến thức             → /kien-thuc-da/ten-bai/
_nhat-ky/      → Nhật ký routine       → /nhat-ky/ten-bai/
_so-sanh/      → So sánh sản phẩm      → /so-sanh/ten-bai/
_layouts/      → Khung trang (default, post)
_includes/     → Header, footer, topic tags
assets/css/    → Style chính (style.scss)
assets/js/     → JavaScript phía trình duyệt
assets/brand/  → Littlest Things approved brand assets
```

## Brand identity

- **Brand:** Littlest Things
- **Logo:** Botanical — FINAL APPROVED
- **Primary horizontal logo:** `assets/brand/01-primary-horizontal/littlest-things-botanical-primary.svg`
- **Favicon system:** `assets/brand/03-favicon/`
- **Vietnamese tagline:** Nhật Ký Da Nhạy Cảm
- **Production domain:** `https://littlestthings.net`
- **Hỏi Gentle:** current feature name; this is not an alternate brand name

The approved Botanical SVG under `assets/brand/01-primary-horizontal/` is the production logo artwork. Do not redraw, recolor, retype, distort, or substitute it.

## Taxonomy

Littlest Things dùng hai chiều phân loại riêng biệt:

- **Chủ đề:** `Da`, `Tóc`, `Du Lịch`, `Thành phần`
- **Loại nội dung:** `Review`, `Kiến Thức`, `Nhật Ký`, `So Sánh`

Loại nội dung được xác định bởi collection chứa bài viết. Chủ đề được khai báo bằng front matter `topics`.

Một bài có thể có nhiều chủ đề. Ví dụ bài về kem chống nắng dùng khi đi du lịch có thể là cả `Da` và `Du Lịch`.

Không tạo collection hoặc top-level section riêng cho Da, Tóc hoặc Du Lịch. Khám Phá vẫn là thư viện nội dung thống nhất.

## Viết bài mới

Tạo file `.md` mới trong thư mục collection tương ứng (`_reviews`, `_kien-thuc`, `_nhat-ky`, `_so-sanh`).

Front matter cơ bản:

```yaml
---
title: "Tiêu đề bài viết"
date: 2026-08-31
topics:
  - Da
affiliate: false
---

Nội dung bài viết ở đây...
```

Bài có nhiều chủ đề:

```yaml
topics:
  - Da
  - Du Lịch
```

Chỉ dùng đúng các giá trị chủ đề sau, bao gồm dấu và chữ hoa như hiển thị:

```text
Da
Tóc
Du Lịch
Thành phần
```

### Metadata bổ sung cho review/so sánh

Chỉ điền thông tin trải nghiệm khi đó là trải nghiệm thật đã được cung cấp:

```yaml
skin_type: "Khô, dễ kích ứng"     # optional
duration_tested: "4 tuần"         # optional; chỉ khi thực sự đã test
```

Nếu bài có link affiliate:

```yaml
affiliate: true
```

Nếu không có:

```yaml
affiliate: false
```

Không viết hoặc giữ các tuyên bố như “mình đã dùng 4 tuần” chỉ để làm nội dung mẫu.

Tên file quyết định URL, ví dụ `_reviews/kem-chong-nang-cho-da-kho.md` → `/reviews/kem-chong-nang-cho-da-kho/`.

## Chạy thử ở máy (tuỳ chọn, cần Ruby)

```bash
bundle install
bundle exec jekyll serve
```

Sau đó mở `http://localhost:4000`.

## Production và deploy

**Production URL:** `https://littlestthings.net`

**Repository — legacy technical reference:** `gentle-journal/gentle-journal`

**Underlying GitHub Pages project URL — legacy technical reference:** `https://gentle-journal.github.io/gentle-journal/`

Tên repository và underlying Pages URL vẫn chứa định danh cũ vì đây là hạ tầng kỹ thuật hiện tại. Không dùng các định danh đó như tên thương hiệu trong copy, metadata, UI hoặc SEO.

Quy trình deploy hiện tại:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

GitHub Pages sau đó rebuild site tự động. File `CNAME` ánh xạ production site tới `littlestthings.net`.

## Sau khi live / open items

- Email liên hệ công khai: TBD; không dùng lại placeholder gắn với định danh cũ.
- Chỉ thêm link affiliate thật khi chương trình affiliate đã được xác nhận; luôn disclosure rõ ràng.
- Thay product-image placeholders bằng ảnh sản phẩm thật có quyền sử dụng khi nội dung thật được xuất bản.
- Profile persistence, match %, voting và Hỏi Gentle functional answers cần backend/external service; không mô tả các UI placeholder này là backend functionality.
