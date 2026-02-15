(() => {
  const navList = document.getElementById("nav-list");
  const noteBody = document.getElementById("note-body");
  const noteTitle = document.getElementById("note-title");
  const breadcrumb = document.getElementById("breadcrumb");
  const sidebar = document.getElementById("sidebar");
  const tocList = document.getElementById("toc-list");
  const headerSearchBtn = document.getElementById("header-search-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const searchModalOverlay = document.getElementById("search-modal-overlay");
  const modalSearchInput = document.getElementById("modal-search-input");
  const searchModalResults = document.getElementById("search-modal-results");

  // Build flat list of all file entries for search and lookup
  const allEntries = [];
  const entryByPath = new Map();

  function collectEntries(node, parentPath = "") {
    if (node.path) {
      const entry = {
        name: node.name,
        path: node.path,
        parentPath: parentPath,
      };
      allEntries.push(entry);
      entryByPath.set(node.path, entry);
    }
    if (node.children) {
      const currentPath =
        node.name === "root"
          ? ""
          : parentPath
            ? `${parentPath}/${node.name}`
            : node.name;
      node.children.forEach((child) => collectEntries(child, currentPath));
    }
  }

  if (MANIFEST && MANIFEST.children) {
    collectEntries(MANIFEST);
  }

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

  // Track collapsed state of folders
  const collapsedFolders = new Set();
  // Initially collapse all top-level folders
  let initialized = false;

  // SVG chevron icon
  const chevronIcon = `<svg class="tree-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

  function renderTreeNode(node, depth = 0, parentId = "") {
    const isFolder = !!node.children;
    const nodeId = parentId ? `${parentId}/${node.name}` : node.name;

    if (node.name === "root") {
      const container = document.createElement("div");
      container.className = "tree-root";
      node.children.forEach((child) => {
        container.appendChild(renderTreeNode(child, 0, ""));
      });
      return container;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "tree-node";

    if (isFolder) {
      // Initialize all top-level folders as collapsed on first render
      if (!initialized && depth === 0) {
        collapsedFolders.add(nodeId);
      }

      const isCollapsed = collapsedFolders.has(nodeId);

      const folderRow = document.createElement("div");
      folderRow.className = `tree-folder ${isCollapsed ? "collapsed" : ""}`;
      folderRow.dataset.depth = depth;
      folderRow.style.paddingLeft = `calc(${depth} * var(--tree-indent, 16px) + 12px)`;

      folderRow.innerHTML = `
        <span class="tree-chevron-wrapper">${chevronIcon}</span>
        <span class="tree-label">${node.name}</span>
      `;

      folderRow.addEventListener("click", () => {
        const wasCollapsed = collapsedFolders.has(nodeId);
        if (wasCollapsed) {
          collapsedFolders.delete(nodeId);
          folderRow.classList.remove("collapsed");
          childrenContainer.classList.remove("collapsed");
        } else {
          collapsedFolders.add(nodeId);
          folderRow.classList.add("collapsed");
          childrenContainer.classList.add("collapsed");
        }
      });

      wrapper.appendChild(folderRow);

      const childrenContainer = document.createElement("div");
      childrenContainer.className = `tree-children ${isCollapsed ? "collapsed" : ""}`;

      // Sort children: folders first, then files, each alphabetically
      const sortedChildren = [...node.children].sort((a, b) => {
        const aIsFolder = !!a.children;
        const bIsFolder = !!b.children;
        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;
        return a.name.localeCompare(b.name);
      });

      sortedChildren.forEach((child) => {
        childrenContainer.appendChild(renderTreeNode(child, depth + 1, nodeId));
      });

      wrapper.appendChild(childrenContainer);
    } else {
      // File node
      const fileRow = document.createElement("button");
      fileRow.className = "tree-file";
      fileRow.dataset.depth = depth;
      fileRow.style.paddingLeft = `calc(${depth} * var(--tree-indent, 16px) + 28px)`;
      fileRow.dataset.path = node.path;

      fileRow.innerHTML = `
        <span class="tree-label">${node.name}</span>
      `;

      fileRow.addEventListener("click", () => selectEntry(node.path));
      navButtons.push(fileRow);

      wrapper.appendChild(fileRow);
    }

    return wrapper;
  }

  function renderNav() {
    navList.innerHTML = "";
    navButtons.length = 0;

    if (MANIFEST && MANIFEST.children) {
      const tree = renderTreeNode(MANIFEST);
      navList.appendChild(tree);
    }

    initialized = true;
  }

  function filterNav(term) {
    const query = term.trim().toLowerCase();

    if (!query) {
      // Show all and restore collapsed state
      document.querySelectorAll(".tree-node").forEach((node) => {
        node.style.display = "";
      });
      document.querySelectorAll(".tree-folder").forEach((folder) => {
        folder.style.display = "";
      });
      document.querySelectorAll(".tree-children").forEach((children) => {
        children.style.display = "";
      });
      navButtons.forEach((btn) => {
        btn.style.display = "";
      });
      return;
    }

    // When searching, show matching files and their parent folders
    const matchingPaths = new Set();
    const parentFolders = new Set();

    allEntries.forEach((entry) => {
      if (
        entry.name.toLowerCase().includes(query) ||
        entry.path.toLowerCase().includes(query)
      ) {
        matchingPaths.add(entry.path);
        // Add all parent folders
        const parts = entry.path.split("/");
        let current = "";
        for (let i = 0; i < parts.length - 1; i++) {
          current = current ? `${current}/${parts[i]}` : parts[i];
          parentFolders.add(current);
        }
      }
    });

    // Show/hide based on matches
    navButtons.forEach((btn) => {
      const path = btn.dataset.path;
      btn.style.display = matchingPaths.has(path) ? "" : "none";
    });

    // Expand and show parent folders of matches
    document.querySelectorAll(".tree-folder").forEach((folder) => {
      // Always show folders when searching (we'll show/hide children)
    });

    // Expand all folders when searching
    document.querySelectorAll(".tree-children").forEach((children) => {
      children.classList.remove("collapsed");
    });
    document.querySelectorAll(".tree-folder").forEach((folder) => {
      folder.classList.remove("collapsed");
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

    // Create breadcrumb from path
    const pathParts = path.replace(/\.md$/, "").split("/");
    breadcrumb.innerHTML = pathParts
      .map((part, index) => {
        if (index === pathParts.length - 1) {
          return `<span>${part}</span>`;
        }
        return `<span>${part}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      })
      .join("");

    noteTitle.textContent = entry.name;
    noteBody.innerHTML = '<div class="loading-indicator">Loading...</div>';

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

      // Generate table of contents
      generateTableOfContents();

      // Wrap tables for horizontal scrolling and add copy buttons
      document.querySelectorAll(".note-body table").forEach((table) => {
        const wrapper = document.createElement("div");
        wrapper.className = "table-wrapper";
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        const checkScroll = () => {
          if (wrapper.scrollWidth > wrapper.clientWidth) {
            wrapper.classList.add("has-scroll");
          } else {
            wrapper.classList.remove("has-scroll");
          }
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

        const btn = document.createElement("button");
        btn.className = "table-copy-btn";
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
        btn.addEventListener("click", async () => {
          try {
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

  // Show home page with category cards
  function showHomePage() {
    noteTitle.textContent = "Welcome to Nano Ink";
    breadcrumb.innerHTML = `<span>Home</span>`;

    // Clear active state from nav
    navButtons.forEach((btn) => btn.classList.remove("active"));

    // Build category cards from MANIFEST
    const categories = MANIFEST.children || [];

    const categoryIcons = {
      ComputerNetworks: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      Database: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      DevOps: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      DSA: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      Linux: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 17l6-6-6-6"/><path d="M12 19h8"/></svg>`,
      OperatingSystems: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>`,
      Tools: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      WebDev: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    };

    const defaultIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;

    let homeHTML = `
      <div class="home-hero">
        <p class="home-subtitle">Your personal knowledge base for Computer Science & Software Engineering</p>
      </div>
      <div class="home-categories">
        <h2 class="home-section-title">Browse Topics</h2>
        <div class="category-grid">
    `;

    categories.forEach((cat) => {
      const fileCount = countFiles(cat);
      const icon = categoryIcons[cat.name] || defaultIcon;
      const readmePath = cat.children?.find((c) => c.name === "README")?.path;

      homeHTML += `
        <div class="category-card" data-path="${readmePath || ""}" data-folder="${cat.name}">
          <div class="category-icon">${icon}</div>
          <div class="category-info">
            <h3 class="category-name">${formatCategoryName(cat.name)}</h3>
            <span class="category-count">${fileCount} ${fileCount === 1 ? "note" : "notes"}</span>
          </div>
          <svg class="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      `;
    });

    homeHTML += `
        </div>
      </div>
      <div class="home-quick-start">
        <h2 class="home-section-title">Quick Start</h2>
        <div class="quick-links">
          <button class="quick-link" data-path="DSA/README.md">
            <span class="quick-link-icon">🚀</span>
            <span>Data Structures & Algorithms</span>
          </button>
          <button class="quick-link" data-path="Linux/Linux-Guide.md">
            <span class="quick-link-icon">🐧</span>
            <span>Linux Guide</span>
          </button>
          <button class="quick-link" data-path="DevOps/Docker.md">
            <span class="quick-link-icon">🐳</span>
            <span>Docker Basics</span>
          </button>
          <button class="quick-link" data-path="WebDev/JavaScript.md">
            <span class="quick-link-icon">⚡</span>
            <span>JavaScript</span>
          </button>
        </div>
      </div>
    `;

    noteBody.innerHTML = homeHTML;

    // Add click handlers for category cards
    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        const path = card.dataset.path;
        const folder = card.dataset.folder;
        if (path && entryByPath.has(path)) {
          selectEntry(path);
        } else {
          // Expand the folder and select first file
          collapsedFolders.delete(folder);
          renderNav();
          const firstFile = MANIFEST.children
            .find((c) => c.name === folder)
            ?.children?.find((c) => c.path);
          if (firstFile?.path) {
            selectEntry(firstFile.path);
          }
        }
      });
    });

    // Add click handlers for quick links
    document.querySelectorAll(".quick-link").forEach((link) => {
      link.addEventListener("click", () => {
        const path = link.dataset.path;
        if (path && entryByPath.has(path)) {
          selectEntry(path);
          expandToPath(path);
        }
      });
    });

    // Clear TOC for home page
    if (tocList) {
      tocList.innerHTML =
        '<p class="toc-empty">Select a topic to view contents</p>';
    }
  }

  function countFiles(node) {
    if (!node.children) return 1;
    return node.children.reduce((acc, child) => acc + countFiles(child), 0);
  }

  function formatCategoryName(name) {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/-/g, " ")
      .trim();
  }

  function selectEntry(path, skipHash) {
    if (!skipHash) {
      window.location.hash = encodeURI(path);
    }
    loadContent(path);
    closeSidebar();
  }

  function loadFromHash() {
    const hash = decodeURI(window.location.hash.replace(/^#/, ""));
    if (hash && entryByPath.has(hash)) {
      selectEntry(hash, true);
      // Expand parent folders to show the active item
      expandToPath(hash);
      return;
    }
    // Show home page when no hash or invalid hash
    showHomePage();
  }

  function expandToPath(path) {
    const parts = path.split("/");
    let current = "";
    for (let i = 0; i < parts.length - 1; i++) {
      current = current ? `${current}/${parts[i]}` : parts[i];
      collapsedFolders.delete(current);
    }
    // Re-render to apply expanded state
    renderNav();
    setActive(path);
  }

  // Generate table of contents from headings
  function generateTableOfContents() {
    if (!tocList) return;
    tocList.innerHTML = "";

    const headings = noteBody.querySelectorAll("h1, h2, h3, h4");
    if (headings.length === 0) {
      tocList.innerHTML = '<p class="toc-empty">No headings found</p>';
      return;
    }

    headings.forEach((heading, index) => {
      // Create an ID for the heading if it doesn't have one
      if (!heading.id) {
        heading.id = `heading-${index}-${heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      }

      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
      link.textContent = heading.textContent;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update active state
        tocList
          .querySelectorAll(".toc-item")
          .forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });

      tocList.appendChild(link);
    });

    // Set up scroll spy for active state
    setupScrollSpy(headings);
  }

  function setupScrollSpy(headings) {
    const tocItems = tocList.querySelectorAll(".toc-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocItems.forEach((item) => {
              item.classList.toggle(
                "active",
                item.getAttribute("href") === `#${id}`,
              );
            });
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));
  }

  // ========================================
  // SEARCH MODAL
  // ========================================
  let selectedSearchIndex = -1;

  function openSearchModal() {
    searchModalOverlay.classList.add("active");
    modalSearchInput.value = "";
    modalSearchInput.focus();
    renderSearchResults("");
    document.body.style.overflow = "hidden";
  }

  function closeSearchModal() {
    searchModalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    selectedSearchIndex = -1;
  }

  function renderSearchResults(query) {
    const term = query.trim().toLowerCase();

    if (!term) {
      searchModalResults.innerHTML =
        '<div class="search-modal-empty">Type to search documentation...</div>';
      return;
    }

    const matches = allEntries
      .filter(
        (entry) =>
          entry.name.toLowerCase().includes(term) ||
          entry.path.toLowerCase().includes(term),
      )
      .slice(0, 10);

    if (matches.length === 0) {
      searchModalResults.innerHTML =
        '<div class="search-modal-empty">No results found</div>';
      return;
    }

    searchModalResults.innerHTML = matches
      .map(
        (entry, index) => `
      <button class="search-result-item ${index === 0 ? "selected" : ""}" data-path="${entry.path}">
        <div class="result-title">${entry.name}</div>
        <div class="result-path">${entry.path}</div>
      </button>
    `,
      )
      .join("");

    selectedSearchIndex = 0;

    // Add click handlers
    searchModalResults
      .querySelectorAll(".search-result-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const path = item.dataset.path;
          closeSearchModal();
          selectEntry(path);
        });
      });
  }

  function handleSearchKeydown(e) {
    const items = searchModalResults.querySelectorAll(".search-result-item");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedSearchIndex = Math.min(selectedSearchIndex + 1, items.length - 1);
      updateSelectedResult(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedSearchIndex = Math.max(selectedSearchIndex - 1, 0);
      updateSelectedResult(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[selectedSearchIndex]) {
        const path = items[selectedSearchIndex].dataset.path;
        closeSearchModal();
        selectEntry(path);
      }
    }
  }

  function updateSelectedResult(items) {
    items.forEach((item, index) => {
      item.classList.toggle("selected", index === selectedSearchIndex);
    });
    if (items[selectedSearchIndex]) {
      items[selectedSearchIndex].scrollIntoView({ block: "nearest" });
    }
  }

  // ========================================
  // THEME TOGGLE
  // ========================================
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const theme = savedTheme || (prefersDark ? "dark" : "dark"); // Default to dark

    setTheme(theme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update icon visibility
    const darkIcon = document.querySelector(".theme-icon-dark");
    const lightIcon = document.querySelector(".theme-icon-light");

    if (darkIcon && lightIcon) {
      if (theme === "dark") {
        darkIcon.style.display = "block";
        lightIcon.style.display = "none";
      } else {
        darkIcon.style.display = "none";
        lightIcon.style.display = "block";
      }
    }
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  // Mobile sidebar toggle functions
  const menuToggle = document.getElementById("menu-toggle");
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

  // Resizable sidebar
  function initResizableSidebar() {
    const resizer = document.createElement("div");
    resizer.className = "sidebar-resizer";
    sidebar.appendChild(resizer);

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    const minWidth = 180;
    const maxWidth = 500;

    // Load saved width from localStorage
    const savedWidth = localStorage.getItem("sidebarWidth");
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= minWidth && width <= maxWidth) {
        sidebar.style.width = `${width}px`;
        document.documentElement.style.setProperty(
          "--sidebar-width",
          `${width}px`,
        );
      }
    }

    resizer.addEventListener("mousedown", (e) => {
      isResizing = true;
      startX = e.clientX;
      startWidth = sidebar.offsetWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      resizer.classList.add("resizing");
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;

      const diff = e.clientX - startX;
      let newWidth = startWidth + diff;

      // Clamp width
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

      sidebar.style.width = `${newWidth}px`;
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${newWidth}px`,
      );
    });

    document.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        resizer.classList.remove("resizing");
        // Save width to localStorage
        localStorage.setItem("sidebarWidth", sidebar.offsetWidth.toString());
      }
    });

    // Touch support for mobile/tablet
    resizer.addEventListener("touchstart", (e) => {
      isResizing = true;
      startX = e.touches[0].clientX;
      startWidth = sidebar.offsetWidth;
      resizer.classList.add("resizing");
      e.preventDefault();
    });

    document.addEventListener("touchmove", (e) => {
      if (!isResizing) return;

      const diff = e.touches[0].clientX - startX;
      let newWidth = startWidth + diff;

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

      sidebar.style.width = `${newWidth}px`;
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${newWidth}px`,
      );
    });

    document.addEventListener("touchend", () => {
      if (isResizing) {
        isResizing = false;
        resizer.classList.remove("resizing");
        localStorage.setItem("sidebarWidth", sidebar.offsetWidth.toString());
      }
    });
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

    if (touchEndTime - touchStartTime > maxSwipeTime) return;

    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = Math.abs(touchEndY - touchStartY);

    if (swipeDistanceY > Math.abs(swipeDistanceX) * 0.5) return;

    if (
      swipeDistanceX > minSwipeDistance &&
      touchStartX < 30 &&
      !sidebar.classList.contains("open")
    ) {
      openSidebar();
    }

    if (
      swipeDistanceX < -minSwipeDistance &&
      sidebar.classList.contains("open")
    ) {
      closeSidebar();
    }
  }

  function init() {
    renderNav();
    initResizableSidebar();
    initTheme();

    window.addEventListener("hashchange", loadFromHash);

    // Logo click - go to home page
    const logoLink = document.querySelector(".logo");
    if (logoLink) {
      logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "";
        showHomePage();
      });
    }

    // Sidebar home button
    const homeBtn = document.getElementById("home-btn");
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        window.location.hash = "";
        showHomePage();
        closeSidebar();
      });
    }

    // Header search button click - open modal
    if (headerSearchBtn) {
      headerSearchBtn.addEventListener("click", openSearchModal);
    }

    // Search modal event listeners
    if (searchModalOverlay) {
      searchModalOverlay.addEventListener("click", (e) => {
        if (e.target === searchModalOverlay) {
          closeSearchModal();
        }
      });
    }

    if (modalSearchInput) {
      modalSearchInput.addEventListener("input", (e) => {
        renderSearchResults(e.target.value);
      });
      modalSearchInput.addEventListener("keydown", handleSearchKeydown);
    }

    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearchModal();
      }
      // Escape to close modals
      if (e.key === "Escape") {
        closeSearchModal();
        closeSidebar();
      }
    });

    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", closeSidebar);
    }

    if ("ontouchstart" in window) {
      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });

      if (sidebarOverlay) {
        sidebarOverlay.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        sidebarOverlay.addEventListener("touchend", handleTouchEnd, {
          passive: true,
        });
      }
    }

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
