/* ============ EDIT THIS FILE to update your site ============ */
const SITE = {
  name: "Your Name",
  me: "Y. Name",                       // how your name appears in author lists (gets bolded)
  role: "Postdoctoral Researcher",
  affil: "Department of Computer Science, University Name",
  photo: "assets/photo.svg",           // replace with your own photo (square works best)
  email: "you@university.edu",
  address: "Room 000, Science Building, University Name, City, Country",
  links: [
    { label: "Scholar", url: "https://scholar.google.com/" },
    { label: "GitHub",  url: "https://github.com/" },
    { label: "ORCID",   url: "https://orcid.org/" },
    { label: "CV",      url: "assets/cv.pdf" }
  ],
  about: [
    "I study how learning systems generalize from limited data, with a focus on principled methods that hold up in real scientific settings.",
    "Previously I completed my PhD at University Name. I enjoy collaborating across disciplines and writing open, reproducible code."
  ],
  interests: ["Machine learning", "Scientific computing", "Reproducible research"],
  education: [
    { when: "2024 – now",  what: "Postdoctoral Researcher", where: "University Name" },
    { when: "2019 – 2024", what: "PhD, Computer Science",   where: "University Name" },
    { when: "2015 – 2019", what: "BSc, Mathematics",        where: "University Name" }
  ],
  news: [
    { date: "Sep 2026", text: "Our paper was accepted to a leading conference." },
    { date: "Jun 2026", text: "Started a new collaboration on scientific machine learning." }
  ],
  pubs: [
    { title: "A Sample Paper Title About Your Research", authors: "Y. Name, A. Collaborator, B. Advisor",
      venue: "Journal of Example Research", year: 2026, type: "Journal",
      links: { PDF: "#", Code: "#" },
      bibtex: "@article{name2026sample,\n  title={A Sample Paper Title About Your Research},\n  author={Name, Y. and Collaborator, A. and Advisor, B.},\n  journal={Journal of Example Research},\n  year={2026}\n}" },
    { title: "Another Paper Presented at a Conference", authors: "A. Collaborator, Y. Name",
      venue: "Proceedings of Example Conference", year: 2025, type: "Conference", links: { PDF: "#" } },
    { title: "An Early Preprint", authors: "Y. Name",
      venue: "arXiv preprint", year: 2025, type: "Preprint", links: { arXiv: "#" } }
  ],
  /* Blog: add an entry here, then create posts/<slug>.md */
  posts: [
    { slug: "first-results", title: "First results from the new model", date: "2026-09-12",
      tags: ["research", "code"], cover: "assets/cover.svg",
      summary: "Early experiments, a figure, and the code behind them." },
    { slug: "writing-posts", title: "How to add images, video and code to posts", date: "2026-09-01",
      tags: ["guide"], summary: "A cheat sheet for everything a post can contain." }
  ]
};
