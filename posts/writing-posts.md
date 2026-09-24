Every post is a Markdown file in `posts/`. Here is what you can put in one.

## Images

```markdown
![Caption shown under the figure](assets/my-figure.png)
```

## Video

Upload an `.mp4` to `assets/` and add:

```html
<video controls preload="metadata" src="assets/demo.mp4"></video>
```

For YouTube, use the embed link:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen loading="lazy"></iframe>
```

## Code

Fence code with the language name for syntax highlighting, for example `python`, `bash` or `r`. Each block gets a copy button.

## Tables, quotes and links

Standard Markdown works: tables, block quotes, lists, and [links](https://example.com).

## Publishing a post

1. Save the file as `posts/my-post.md`.
2. Add an entry to `posts` in `content.js` with the same `slug`.
3. Commit and push. GitHub Pages updates in a minute or two.
