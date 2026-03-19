const OUTBOUND = {
  github: "https://github.com/gulu-sherry",
  scholar: "https://scholar.google.com/",
  linkedin: "https://www.linkedin.com/",
  cv: "./assets/CV.pdf",
  email: "mailto:you@example.com",
};

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function mdToHtml(md) {
  // Tiny, dependency-free markdown renderer (headings, lists, links, code).
  // Not a full Markdown spec; designed for simple notes.
  const lines = String(md).replaceAll("\r\n", "\n").split("\n");
  let html = "";
  let inList = false;
  let inCode = false;
  let codeBuf = [];

  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  const flushCode = () => {
    if (inCode) {
      html += `<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`;
      inCode = false;
      codeBuf = [];
    }
  };

  const inline = (s) => {
    // code
    s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`);
    // links [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => {
      const safeT = escapeHtml(t);
      const safeU = escapeHtml(u);
      const isExt = /^https?:\/\//i.test(u);
      const extra = isExt ? ` target="_blank" rel="noreferrer"` : "";
      return `<a href="${safeU}"${extra}>${safeT}</a>`;
    });
    return s;
  };

  for (const raw of lines) {
    const line = raw ?? "";
    if (line.trim().startsWith("```")) {
      if (inCode) flushCode();
      else {
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    if (/^\s*#{1,6}\s+/.test(line)) {
      flushList();
      const level = Math.min(6, line.match(/^\s*(#+)/)[1].length);
      const text = line.replace(/^\s*#{1,6}\s+/, "").trim();
      html += `<h${level}>${inline(escapeHtml(text))}</h${level}>`;
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      if (!inList) {
        flushCode();
        html += "<ul>";
        inList = true;
      }
      const item = line.replace(/^\s*-\s+/, "");
      html += `<li>${inline(escapeHtml(item))}</li>`;
      continue;
    }

    if (line.trim() === "") {
      flushList();
      continue;
    }

    flushList();
    html += `<p>${inline(escapeHtml(line.trim()))}</p>`;
  }

  flushList();
  flushCode();
  return html;
}

async function loadMarkdown(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return await res.text();
}

function setOutboundLinks() {
  document.querySelectorAll("[data-outbound]").forEach((a) => {
    const key = a.getAttribute("data-outbound");
    const href = OUTBOUND[key];
    if (!href) return;
    a.setAttribute("href", href);
    if (/^https?:\/\//i.test(href)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer");
    }
  });
}

function setupNav() {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

function setupTabs() {
  const mdEl = document.getElementById("md");
  const tabs = Array.from(document.querySelectorAll(".tab"));
  if (!mdEl || tabs.length === 0) return;

  const activate = async (tab) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
    const path = tab.getAttribute("data-md");
    if (!path) return;
    mdEl.innerHTML = `<p class="muted">加载中…</p>`;
    try {
      const md = await loadMarkdown(path);
      mdEl.innerHTML = mdToHtml(md);
    } catch (e) {
      mdEl.innerHTML = `<p class="muted">加载失败：${escapeHtml(e.message)}</p>`;
    }
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab)));
  activate(tabs[0]);
}

function setupMdOpenButtons() {
  document.querySelectorAll("[data-md-open]").forEach((a) => {
    a.addEventListener("click", async (e) => {
      e.preventDefault();
      const path = a.getAttribute("data-md-open");
      if (!path) return;
      const mdEl = document.getElementById("md");
      const notes = document.getElementById("notes");
      if (!mdEl || !notes) return;
      notes.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        const md = await loadMarkdown(path);
        mdEl.innerHTML = mdToHtml(md);
      } catch (err) {
        mdEl.innerHTML = `<p class="muted">加载失败：${escapeHtml(err.message)}</p>`;
      }
    });
  });
}

async function setupDiscussionPreview() {
  const el = document.getElementById("discussion-preview");
  if (!el) return;
  try {
    const md = await loadMarkdown("content/discussions.md");
    const firstBullets = md
      .split("\n")
      .filter((l) => /^\s*-\s+/.test(l))
      .slice(0, 3)
      .map((l) => l.replace(/^\s*-\s+/, "").trim());
    if (firstBullets.length === 0) {
      el.textContent = "（暂时还没有讨论题，你可以先写 3 个你最想搞清楚的问题。）";
      return;
    }
    el.innerHTML = `<ul>${firstBullets
      .map((b) => `<li>${escapeHtml(b)}</li>`)
      .join("")}</ul>`;
  } catch {
    el.textContent = "（讨论题加载失败，稍后再试。）";
  }
}

function wireDemoCards() {
  document.querySelectorAll("[data-demo]").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      // Later: link to real demo URLs or GitHub folders.
      alert("稍后把这个 demo 链接到你的项目（GitHub repo / live demo / notebook）。");
    });
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

setYear();
setOutboundLinks();
setupNav();
setupTabs();
setupMdOpenButtons();
setupDiscussionPreview();
wireDemoCards();

