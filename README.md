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

- **Canonical article tags:** khai báo trong `_data/tag_taxonomy.yml`
- **Loại nội dung:** `Review`, `Kiến Thức`, `Nhật Ký`, `So Sánh`

Loại nội dung được xác định bởi collection chứa bài viết. Public collection membership được suy ra duy nhất từ front matter `tags` và mapping tập trung trong `_data/tag_taxonomy.yml`.

Một bài có thể xuất hiện trong nhiều public collection nhưng vẫn chỉ có một source file và một canonical URL. Không khai báo collection membership trực tiếp trong bài.

`topics` là metadata hiển thị cũ và có thể được giữ trong nội dung hiện tại để tương thích. `tags` là metadata canonical cho cấu trúc collection mới.

## Viết bài mới

Tạo file `.md` mới trong thư mục collection tương ứng (`_reviews`, `_kien-thuc`, `_nhat-ky`, `_so-sanh`).

Front matter cơ bản:

```yaml
---
title: "Tiêu đề bài viết"
date: 2026-08-31
tags:
  - skincare
affiliate: false
---

Nội dung bài viết ở đây...
```

Bài có nhiều chủ đề:

```yaml
tags:
  - skincare
  - wellness
```

Chỉ dùng tag đã khai báo trong:

```text
_data/tag_taxonomy.yml
```

Trước khi xuất bản hoặc deploy, chạy:

```bash
ruby script/validate_content.rb
```

Validation sẽ từ chối bài đã xuất bản nếu bài thiếu tag, dùng tag không tồn tại, hoặc không map tới public collection nào.

## Homepage article highlights

Rule đã duyệt là 2 bài có page views hợp lệ cao nhất, sau đó 3 bài mới nhất chưa xuất hiện trong top 2. Chưa triển khai module này cho đến khi có ít nhất 5 bài hợp lệ cùng analytics source, valid-view rule và fallback được duyệt. Không tự tạo số views, ranking hoặc bài placeholder.

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
