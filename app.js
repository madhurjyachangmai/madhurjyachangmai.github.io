(() => {
const S = SITE, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = d => new Date(d).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
document.title = `${S.name}, ${S.role}`; $('#yr').textContent = new Date().getFullYear(); $('#fn').textContent = S.name;

/* sidebar + nav */
const secs = [['about', 'About'], ['news', 'News'], ['publications', 'Publications'], ['blog', 'Blog'], ['contact', 'Contact']];
$('.id').innerHTML = `<img class="ph" src="${S.photo}" alt="Portrait of ${S.name}"><div><h1>${S.name}</h1><p>${S.role}<br>${S.affil}</p><p class="links">${S.links.map(l => `<a href="${l.url}">${l.label}</a>`).join('')}</p></div>`;
$('#nav').innerHTML = secs.map(([i, t]) => `<a href="#${i}">${t}</a>`).join('') + '<button id="theme" aria-label="Change color theme"></button>';

/* theme: auto (follows system) -> light -> dark */
const tb = $('#theme'), next = { auto: 'light', light: 'dark', dark: 'auto' };
const label = () => tb.textContent = 'Theme: ' + themeMode();
tb.onclick = () => { setTheme(next[themeMode()]); label(); }; label();

/* sections */
const tags = t => ['All', ...new Set(t)], types = tags(S.pubs.map(p => p.type)), btags = tags(S.posts.flatMap(p => p.tags));
const chips = (a, k) => a.map((t, i) => `<button class="chip${i ? '' : ' on'}" data-${k}="${t}">${t}</button>`).join('');
$('#home').innerHTML = `
<section id="about"><h2>About</h2>${S.about.map(p => `<p>${p}</p>`).join('')}
 <div class="chips">${S.interests.map(i => `<span class="chip">${i}</span>`).join('')}</div>
 <h3>Education and positions</h3><ul class="tl">${S.education.map(e => `<li><span>${e.when}</span><div><b>${e.what}</b><br>${e.where}</div></li>`).join('')}</ul></section>
<section id="news"><h2>News</h2><ul class="tl">${S.news.map(n => `<li><span>${n.date}</span><div>${n.text}</div></li>`).join('')}</ul></section>
<section id="publications"><h2>Publications</h2><div class="bar"><input id="q" type="search" placeholder="Search title, author or venue" aria-label="Search publications"><div class="chips">${chips(types, 't')}</div></div><ol id="pl"></ol></section>
<section id="blog"><h2>Research blog</h2><div class="chips">${chips(btags, 'g')}</div><div id="bg" class="grid"></div></section>
<section id="contact"><h2>Contact</h2><p><a href="mailto:${S.email}">${S.email}</a><br><span class="mut">${S.address}</span></p></section>`;

let pt = 'All', pg = 'All';
const pubs = () => { const q = $('#q').value.toLowerCase();
  $('#pl').innerHTML = S.pubs.filter(p => (pt === 'All' || p.type === pt) && `${p.title} ${p.authors} ${p.venue} ${p.year}`.toLowerCase().includes(q))
    .sort((a, b) => b.year - a.year).map(p => `<li><div class="t">${p.title}</div><div>${p.authors.replace(S.me, `<b>${S.me}</b>`)}</div><div class="mut"><i>${p.venue}</i>, ${p.year}</div>
    <div class="acts">${Object.entries(p.links || {}).map(([k, v]) => `<a href="${v}">${k}</a>`).join('')}${p.bibtex ? '<button data-bib>BibTeX</button>' : ''}</div>
    ${p.bibtex ? `<pre class="bib" hidden><button data-copy>Copy</button><code>${p.bibtex}</code></pre>` : ''}</li>`).join('')
    || '<li class="mut">No publications match. Try a different search or filter.</li>'; };
const blog = () => { $('#bg').innerHTML = S.posts.filter(p => pg === 'All' || p.tags.includes(pg)).sort((a, b) => b.date.localeCompare(a.date))
  .map(p => `<a class="card" href="#/post/${p.slug}">${p.cover ? `<img src="${p.cover}" alt="" loading="lazy">` : ''}<div class="cb"><div class="mut">${fmt(p.date)}</div><h3>${p.title}</h3><p>${p.summary}</p><div class="tg">${p.tags.map(t => '#' + t).join(' ')}</div></div></a>`).join('')
  || '<p class="mut">No posts with this tag yet.</p>'; };
$('#q').oninput = pubs; pubs(); blog();

/* clicks: filters, bibtex, copy, lightbox */
const copy = b => navigator.clipboard.writeText(b.parentElement.querySelector('code').innerText).then(() => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 1500); });
document.addEventListener('click', e => {
  const i = e.target.closest('.prose img'); if (i) { const l = document.createElement('div'); l.id = 'lb'; l.innerHTML = `<img src="${i.src}" alt="${i.alt}">`; l.onclick = () => l.remove(); document.body.append(l); return; }
});
document.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
  if (d.t) { pt = d.t; $$('[data-t]').forEach(x => x.classList.toggle('on', x === b)); pubs(); }
  else if (d.g) { pg = d.g; $$('[data-g]').forEach(x => x.classList.toggle('on', x === b)); blog(); }
  else if ('bib' in d) { const p = b.closest('li').querySelector('.bib'); p.hidden = !p.hidden; }
  else if ('copy' in d) copy(b); });
addEventListener('keydown', e => e.key === 'Escape' && $('#lb')?.remove());

/* scroll spy + reading progress */
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && $$('#nav a').forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id))), { rootMargin: '-25% 0px -65% 0px' });
$$('section').forEach(s => io.observe(s));
addEventListener('scroll', () => { const b = $('#bar'); if (!b.hidden) b.style.width = 100 * scrollY / Math.max(1, document.body.scrollHeight - innerHeight) + '%'; }, { passive: true });

/* routing: #section for home, #/post/slug for blog posts */
const show = w => { $('#home').hidden = w !== 'home'; $('#post').hidden = w !== 'post'; $('#bar').hidden = w !== 'post'; };
async function post(slug) {
  const m = S.posts.find(p => p.slug === slug), v = $('#post'); show('post'); scrollTo(0, 0);
  if (!m) { v.innerHTML = '<p>Post not found. <a href="#blog">Back to all posts</a></p>'; return; }
  document.title = `${m.title} | ${S.name}`;
  try {
    const r = await fetch(`posts/${slug}.md`); if (!r.ok) throw 0; const md = await r.text();
    v.innerHTML = `<a class="back" href="#blog">Back to all posts</a><h1>${m.title}</h1><p class="mut">${fmt(m.date)}, ${Math.max(1, Math.round(md.split(/\s+/).length / 220))} min read</p><div class="prose">${window.marked ? marked.parse(md) : `<pre>${md}</pre>`}</div>`;
    $$('.prose pre code', v).forEach(c => { window.hljs && hljs.highlightElement(c); const b = document.createElement('button'); b.textContent = 'Copy'; b.dataset.copy = ''; c.parentElement.prepend(b); });
    $$('.prose img', v).forEach(i => { const f = document.createElement('figure'); i.replaceWith(f); f.append(i); if (i.alt) f.insertAdjacentHTML('beforeend', `<figcaption>${i.alt}</figcaption>`); });
  } catch { v.innerHTML = `<p>Could not load this post. Check that <code>posts/${slug}.md</code> exists.</p><a href="#blog">Back to all posts</a>`; }
}
function route() {
  const m = location.hash.match(/^#\/post\/([\w-]+)/); if (m) return post(m[1]);
  show('home'); document.title = `${S.name}, ${S.role}`;
  const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); t ? t.scrollIntoView() : scrollTo(0, 0);
}
addEventListener('hashchange', route); route();
})();
