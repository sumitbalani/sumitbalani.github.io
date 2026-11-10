const posts = [];

const feed = document.getElementById("post-feed");
const noResults = document.getElementById("no-results");

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Escape text before inserting into HTML
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

  // Empty-state message: "no posts yet" vs "no search matches"
  noResults.textContent = posts.length === 0 ? "No posts yet. Check back soon." : "No posts match your search.";
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
