// ---------- Post data: edit this list to add your own posts ----------
// `image` is a placeholder emoji + background colour; swap for a real image URL if you like.
const posts = [
  {
    tag: "Poems",
    title: "Imagination misused",
    excerpt:
      "You gotta have a level of conviction that it'll happen. That whatever you're trying to do will happen. That it'll all work out. And it will.",
    date: "2026-08-02",
    readTime: 1,
    emoji: "🌱",
    color: "#e6f4d7",
  },
  {
    tag: "Stories",
    title: "The house on the hill",
    excerpt: "I walk out of training and see the house on the hill with the lights on and smoke coming off the barbecue.",
    date: "2026-07-31",
    readTime: 1,
    emoji: "🏡",
    color: "#fdeccf",
  },
  {
    tag: "Food",
    title: "A simple health protocol",
    excerpt: "A bet on general health principles leading to better outcomes.",
    date: "2026-07-30",
    readTime: 5,
    emoji: "🥑",
    color: "#daf2fd",
  },
  {
    tag: "Stories",
    title: "Look at the trees",
    excerpt: "We always take the scenic route. Because I've got nothing but time, Dad says.",
    date: "2026-05-04",
    readTime: 1,
    emoji: "🌳",
    color: "#e2f0e4",
  },
  {
    tag: "Make",
    title: "You can just do things",
    excerpt: "YCJDT.",
    date: "2026-04-26",
    readTime: 4,
    emoji: "🛠️",
    color: "#f1e6fb",
  },
  {
    tag: "Creating",
    title: "Cheerleader or critic",
    excerpt: "Build up or tear down?",
    date: "2026-04-18",
    readTime: 2,
    emoji: "📣",
    color: "#ffe3e0",
  },
  {
    tag: "AI",
    title: "Coming 2nd in a Kaggle competition",
    excerpt: "How my brother and I came second in a health + AI competition.",
    date: "2026-03-31",
    readTime: 4,
    emoji: "🤖",
    color: "#e5eff5",
  },
];

const feed = document.getElementById("post-feed");
const noResults = document.getElementById("no-results");

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Escape text before inserting into HTML (safe if posts ever come from user input)
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function renderPosts(list) {
  feed.innerHTML = list
    .map((post, i) => {
      const isLarge = i === 0;
      const date = dateFormatter.format(new Date(post.date));
      return `
        <article class="post-card${isLarge ? " post-card-large" : ""}">
          <a class="post-card-image-link" href="#" tabindex="-1" aria-hidden="true">
            <div class="post-card-image" style="--card-bg:${escapeHtml(post.color)}">${escapeHtml(post.emoji)}</div>
          </a>
          <div class="post-card-content">
            <a class="post-card-content-link" href="#">
              <span class="post-card-primary-tag">${escapeHtml(post.tag)}</span>
              <h2 class="post-card-title">${escapeHtml(post.title)}</h2>
              <p class="post-card-excerpt">${escapeHtml(post.excerpt)}</p>
            </a>
            <footer class="post-card-meta">
              <time datetime="${escapeHtml(post.date)}">${date}</time>
              <span aria-hidden="true">•</span>
              <span>${post.readTime} min read</span>
            </footer>
          </div>
        </article>`;
    })
    .join("");

  noResults.hidden = list.length !== 0;
}

renderPosts(posts);

// ---------- Search ----------
const searchToggle = document.getElementById("search-toggle");
const searchBar = document.getElementById("search-bar");
const searchInput = document.getElementById("post-search");

searchToggle.addEventListener("click", () => {
  const open = searchBar.hidden;
  searchBar.hidden = !open;
  searchToggle.setAttribute("aria-expanded", String(open));
  if (open) searchInput.focus();
});

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  renderPosts(posts.filter((p) => `${p.title} ${p.tag} ${p.excerpt}`.toLowerCase().includes(q)));
});

// ---------- Mobile burger menu ----------
const burger = document.getElementById("burger");
const head = document.querySelector(".gh-head");

burger.addEventListener("click", () => {
  const open = head.classList.toggle("is-menu-open");
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

