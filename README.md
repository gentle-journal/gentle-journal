# Gentle Journal

**Vietnamese tagline:** Nhật Ký Da Nhạy Cảm

Blog Jekyll tiếng Việt về skincare, hair care và travel care, theo định hướng faceless, bằng chứng trước hype, và phù hợp với GitHub Pages.

## Cấu trúc

```
_reviews/      → Review sản phẩm       → /reviews/ten-bai/
_kien-thuc/    → Kiến thức             → /kien-thuc-da/ten-bai/
_nhat-ky/      → Nhật ký routine       → /nhat-ky/ten-bai/
_so-sanh/      → So sánh sản phẩm      → /so-sanh/ten-bai/
_layouts/      → Khung trang (default, post)
_includes/     → Header, footer, topic tags
assets/css/    → Style chính (style.scss)
```

## Taxonomy

Gentle Journal dùng hai chiều phân loại riêng biệt:

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
date: 2026-08-27
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

Vì production site là GitHub Pages project site, chạy local với cấu hình production có thể dùng:

```bash
bundle exec jekyll serve --baseurl ""
```

Sau đó mở `http://localhost:4000`.

## Đưa lên GitHub Pages

Repository: `gentle-journal/gentle-journal`

Production URL: `https://gentle-journal.github.io/gentle-journal/`

Quy trình deploy hiện tại:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

GitHub Pages sau đó rebuild site tự động.

## Brand naming

- **Brand:** Gentle Journal
- **Vietnamese tagline:** Nhật Ký Da Nhạy Cảm
- **Hỏi Gentle:** tên feature hiện tại
- **Official custom domain:** TBD

Không đổi repository, GitHub Pages URL, route hoặc tên feature nếu chưa có quyết định riêng.

## Sau khi live / open items

- Thay email placeholder `hello@gentlejournal.vn` sau khi email chính thức được chọn.
- Chỉ thêm link affiliate thật khi chương trình affiliate đã được xác nhận; luôn disclosure rõ ràng.
- Thay product-image placeholders bằng ảnh sản phẩm thật có quyền sử dụng khi nội dung thật được xuất bản.
- Khám Phá filter và search vẫn là placeholder cho tới khi hành vi thực tế được triển khai và kiểm tra.
