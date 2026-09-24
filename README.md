# Academic personal website

Plain HTML/CSS/JS. No build step, so it runs as-is on GitHub Pages.

## Publish
1. Create a repository named `<your-username>.github.io` and upload all these files to its root.
2. On GitHub: Settings, then Pages, then Source "Deploy from a branch", Branch `main`, folder `/ (root)`.
3. Your site goes live at `https://<your-username>.github.io`.

## Update
| To change | Edit |
|---|---|
| Name, bio, links, news, publications, blog list | `content.js` |
| A blog post | `posts/<slug>.md` (plus its entry in `content.js`) |
| Photo, figures, videos, CV | `assets/` |
| Colors and fonts | top of `style.css` (`[data-theme=light]` and `[data-theme=dark]`) |

## Preview locally
Posts load with `fetch`, so open the site through a server, not by double-clicking:
`python3 -m http.server`, then visit `http://localhost:8000`.
