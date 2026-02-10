// Basic Obsidian-like reader that fetches markdown and renders it client-side
(() => {
  const navList = document.getElementById("nav-list");
  const searchInput = document.getElementById("search-input");
  const noteBody = document.getElementById("note-body");
  const noteTitle = document.getElementById("note-title");
  const breadcrumb = document.getElementById("breadcrumb");
  const openSource = document.getElementById("open-source");

  const entries = Array.isArray(MANIFEST) ? [...MANIFEST] : [];
  const entryByPath = new Map(entries.map((item) => [item.path, item]));
  const navButtons = [];

  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  });

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function simpleHighlight(code) {
    const placeholders = [];
    let output = escapeHtml(code);

    const protectedPatterns = [
      { regex: /\/\*[\s\S]*?\*\//g, cls: "hljs-comment" },
      { regex: /\/\/.*$/gm, cls: "hljs-comment" },
      { regex: /#.*$/gm, cls: "hljs-comment" },
      { regex: /`(?:\\.|[^`])*`/g, cls: "hljs-string" },
      { regex: /"(?:\\.|[^"])*"/g, cls: "hljs-string" },
      { regex: /'(?:\\.|[^'])*'/g, cls: "hljs-string" },
    ];

    protectedPatterns.forEach(({ regex, cls }) => {
      output = output.replace(regex, (match) => {
        const token = `@@HL${placeholders.length}@@`;
        placeholders.push(`<span class="${cls}">${match}</span>`);
        return token;
      });
    });

    const keywordPattern =
      /\b(abstract|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|from|function|get|goto|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|synchronized|this|throw|throws|true|try|typeof|var|void|while|with|yield)\b/g;
    output = output.replace(
      keywordPattern,
      '<span class="hljs-keyword">$1</span>',
    );

    output = output.replace(
      /\b\d+(?:\.\d+)?\b/g,
      '<span class="hljs-number">$&</span>',
    );

    output = output.replace(
      /\b([A-Za-z_][\w]*)\s*(?=\()/g,
      '<span class="hljs-title">$1</span>',
    );

    placeholders.forEach((replacement, index) => {
      const token = `@@HL${index}@@`;
      output = output.replaceAll(token, replacement);
    });

    return output;
  }

  function groupEntries() {
    const grouped = new Map();
    entries.forEach((item) => {
      const category = item.category || "Notes";
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category).push(item);
    });
    grouped.forEach((list) =>
      list.sort((a, b) => a.title.localeCompare(b.title)),
    );
    return Array.from(grouped.entries());
  }

  // Track collapsed state of categories (null = not initialized yet)
  let collapsedCategories = null;

  function renderNav() {
    navList.innerHTML = "";
    navButtons.length = 0;
    const groups = groupEntries();

    // Initialize all categories as collapsed on first render
    if (collapsedCategories === null) {
      collapsedCategories = new Set(groups.map(([category]) => category));
    }

    groups.forEach(([category, items]) => {
      const groupEl = document.createElement("section");
      groupEl.className = "nav-group";

      const heading = document.createElement("h3");
      heading.className = "nav-group-header";
      const isCollapsed = collapsedCategories.has(category);

      // Create toggle arrow
      const arrow = document.createElement("span");
      arrow.className = "nav-toggle-arrow";
      arrow.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M3 2 L7 5 L3 8 Z"/></svg>`;

      const categoryText = document.createElement("span");
      categoryText.className = "nav-category-text";
      categoryText.textContent = category;

      const itemCount = document.createElement("span");
      itemCount.className = "nav-item-count";
      itemCount.textContent = items.length;

      heading.appendChild(arrow);
      heading.appendChild(categoryText);
      heading.appendChild(itemCount);

      // Toggle collapse on click
      heading.addEventListener("click", () => {
        if (collapsedCategories.has(category)) {
          collapsedCategories.delete(category);
          groupEl.classList.remove("collapsed");
        } else {
          collapsedCategories.add(category);
          groupEl.classList.add("collapsed");
        }
      });

      groupEl.appendChild(heading);

      const itemsContainer = document.createElement("div");
      itemsContainer.className = "nav-items-container";

      items.forEach((item) => {
        const button = document.createElement("button");
        button.className = "nav-item";
        button.dataset.path = item.path;
        button.innerHTML = `<span class="nav-title">${item.title}</span>`;
        button.addEventListener("click", () => selectEntry(item.path));
        navButtons.push(button);
        itemsContainer.appendChild(button);
      });

      groupEl.appendChild(itemsContainer);

      // Apply collapsed state if previously collapsed
      if (isCollapsed) {
        groupEl.classList.add("collapsed");
      }

      navList.appendChild(groupEl);
    });
  }

  function filterNav(term) {
    const query = term.trim().toLowerCase();
    navButtons.forEach((btn) => {
      const text = `${btn.textContent}`.toLowerCase();
      const match = text.includes(query);
      btn.style.display = match ? "flex" : "none";
    });
  }

  function setActive(path) {
    navButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.path === path);
    });
  }

  async function loadContent(path) {
    const entry = entryByPath.get(path);
    if (!entry) return;
    setActive(path);
    breadcrumb.textContent = `${entry.category || "Notes"} / ${entry.title}`;
    noteTitle.textContent = entry.title;
    openSource.href = encodeURI(entry.path);
    noteBody.innerHTML = "Loading…";
    try {
      const res = await fetch(encodeURI(entry.path));
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const text = await res.text();
      const html = marked.parse(text);
      noteBody.innerHTML = html;
      const blocks = document.querySelectorAll("pre code");
      const hl = window.hljs;
      blocks.forEach((block) => block.classList.add("hljs"));
      if (hl && typeof hl.highlightElement === "function") {
        blocks.forEach((block) => hl.highlightElement(block));
      } else if (hl && typeof hl.highlightAuto === "function") {
        blocks.forEach((block) => {
          const { value, language } = hl.highlightAuto(block.textContent || "");
          block.innerHTML = value;
          if (language) block.classList.add(language);
        });
      } else {
        blocks.forEach((block) => {
          block.innerHTML = simpleHighlight(block.textContent || "");
        });
      }
      // Wrap tables for horizontal scrolling and add copy buttons
      document.querySelectorAll(".note-body table").forEach((table) => {
        // Create wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "table-wrapper";
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        // Check if table needs scrolling
        const checkScroll = () => {
          if (wrapper.scrollWidth > wrapper.clientWidth) {
            wrapper.classList.add("has-scroll");
          } else {
            wrapper.classList.remove("has-scroll");
          }
          // Check if scrolled to end
          if (
            wrapper.scrollLeft + wrapper.clientWidth >=
            wrapper.scrollWidth - 5
          ) {
            wrapper.classList.add("scrolled-end");
          } else {
            wrapper.classList.remove("scrolled-end");
          }
        };

        checkScroll();
        wrapper.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        // Add copy button
        const btn = document.createElement("button");
        btn.className = "table-copy-btn";
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
        btn.addEventListener("click", async () => {
          try {
            // Convert table to text format
            const rows = table.querySelectorAll("tr");
            let text = "";
            rows.forEach((row) => {
              const cells = row.querySelectorAll("th, td");
              const rowText = Array.from(cells)
                .map((cell) => cell.textContent.trim())
                .join("\t");
              text += rowText + "\n";
            });
            await navigator.clipboard.writeText(text.trim());
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>`;
            btn.classList.add("copied");
            setTimeout(() => {
              btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
              btn.classList.remove("copied");
            }, 2000);
          } catch (e) {
            btn.innerHTML = `<span>Failed</span>`;
          }
        });
        wrapper.appendChild(btn);
      });

      // Add copy buttons to code blocks
      document.querySelectorAll(".note-body pre").forEach((pre) => {
        const code = pre.querySelector("code");
        if (!code) return;
        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
        btn.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(code.textContent || "");
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>`;
            btn.classList.add("copied");
            setTimeout(() => {
              btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
              btn.classList.remove("copied");
            }, 2000);
          } catch (e) {
            btn.innerHTML = `<span>Failed</span>`;
          }
        });
        pre.appendChild(btn);
      });
      document.documentElement.scrollTop = 0;
    } catch (err) {
      noteBody.innerHTML = `<p>Could not load this note. ${err.message}</p>`;
    }
  }

  function selectEntry(path, skipHash) {
    if (!skipHash) {
      window.location.hash = encodeURI(path);
    }
    loadContent(path);
    // Close sidebar on mobile after selection
    closeSidebar();
  }

  function loadFromHash() {
    const hash = decodeURI(window.location.hash.replace(/^#/, ""));
    if (hash && entryByPath.has(hash)) {
      selectEntry(hash, true);
      return;
    }
    if (entries.length) selectEntry(entries[0].path, true);
  }

  // Mobile sidebar toggle functions
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Swipe gesture support for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const minSwipeDistance = 50;
  const maxSwipeTime = 300;
  let touchStartTime = 0;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartTime = Date.now();
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    const touchEndTime = Date.now();

    // Check if swipe was quick enough
    if (touchEndTime - touchStartTime > maxSwipeTime) return;

    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = Math.abs(touchEndY - touchStartY);

    // Ensure horizontal swipe is dominant
    if (swipeDistanceY > Math.abs(swipeDistanceX) * 0.5) return;

    // Swipe right to open (from left edge)
    if (
      swipeDistanceX > minSwipeDistance &&
      touchStartX < 30 &&
      !sidebar.classList.contains("open")
    ) {
      openSidebar();
    }

    // Swipe left to close (when sidebar is open)
    if (
      swipeDistanceX < -minSwipeDistance &&
      sidebar.classList.contains("open")
    ) {
      closeSidebar();
    }
  }

  function init() {
    renderNav();
    searchInput.addEventListener("input", (e) => filterNav(e.target.value));
    window.addEventListener("hashchange", loadFromHash);

    // Mobile menu toggle
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSidebar();
    });

    // Swipe gesture support for mobile
    if ("ontouchstart" in window) {
      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });

      // Also handle swipe on sidebar overlay
      if (sidebarOverlay) {
        sidebarOverlay.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        sidebarOverlay.addEventListener("touchend", handleTouchEnd, {
          passive: true,
        });
      }
    }

    // Handle window resize - close sidebar if switching to desktop
    let lastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960 && lastWidth <= 960) {
        closeSidebar();
      }
      lastWidth = window.innerWidth;
    });

    loadFromHash();
  }

  init();
})();
