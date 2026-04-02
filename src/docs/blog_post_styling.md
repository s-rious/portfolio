# CAMRY.DEV — Blog Style Guide
> Reference only. Drop this file anywhere outside of `src/content/blog/` and it won't be picked up by the MDX scanner.
> Suggested location: `src/docs/BLOG_STYLE_GUIDE.md`

---

## HEADINGS

```
# Big title (h1)
## Section header (h2) — has a subtle bottom border
### Sub-section (h3)
#### Small header (h4)
```

---

## TEXT FORMATTING

```
**Bold text**         → bright white
*Italic text*         → muted gray
~~Strikethrough~~     → gray, crossed out
`inline code`         → teal monospace with dark background
```

---

## LISTS

Unordered (red dot bullet):
```
- First item
- Second item
- Third item
```

Ordered (red circle numbers):
```
1. First step
2. Second step
3. Third step
```

Task list (styled checkboxes):
```
- [x] Completed task
- [ ] Pending task
```

---

## QUOTES

Simple blockquote (red left border):
```
> This is a quick thought or note.
```

Pull quote with author (centered, large, dramatic):
```
> The world is not a problem to be solved.
> - Alan Watts
```

Pull quote with author + source:
```
> The world is not a problem to be solved.
> - Alan Watts, The Book
```

> Note: You just type `- Author` — the em dash is added automatically behind the scenes.

---

## CALLOUTS

```
> [!info]
> General note or extra context.

> [!tip]
> A helpful suggestion or best practice.

> [!warning]
> Something to be cautious about.

> [!danger]
> A critical issue or something that can go wrong.
```

> Note: Callouts use the Callout component. Since you can't import inside react-markdown,
> use the blockquote syntax above or add callouts via the Callout export in MDXContent.tsx
> if you ever switch to a true MDX pipeline.

---

## CODE

Inline code:
```
Use `npm run dev` to start the server.
```

Fenced code block (syntax highlighted):
````
```js
const name = 'CAMRY';
console.log(name);
```
````

Supported languages: js, ts, tsx, jsx, python, bash, css, json, and more.

---

## IMAGES

Basic image (renders with rounded corners + border):
```
![Alt text here](/imgs/blogImgs/your-image.png)
```

> The alt text also appears as a caption below the image, so write it descriptively.

---

## TABLES

```
| Name        | Status      | Date     |
|-------------|-------------|----------|
| Word Escape | Shipped     | Apr 2023 |
| Stitched Up | In Progress | Q2 2027  |
```

---

## LINKS

```
[Link text](https://example.com)
```

Opens in a new tab automatically. Renders in teal, turns amber on hover.

---

## DIVIDER

Gradient red-to-cyan horizontal rule:
```
---
```

---

## FRONTMATTER

Every post needs this at the top:
```
---
title: "Your Post Title"
excerpt: "Short description shown on the blog listing page"
date: "2026-03-31"
tags: ["tag-one", "tag-two"]
author: "Cameron Rydwell"
image: /imgs/blogImgs/your-thumbnail.png
---
```

> `image` is optional but recommended — shows as the card thumbnail and hero image.
> Images live in `public/imgs/blogImgs/`.
> Posts are picked up automatically — no registration needed.