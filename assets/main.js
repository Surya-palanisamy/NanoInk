// Obsidian-like reader with tree navigation and resizable sidebar
(() => {
  const navList = document.getElementById("nav-list");
  const searchInput = document.getElementById("search-input");
  const noteBody = document.getElementById("note-body");
  const noteTitle = document.getElementById("note-title");
  const breadcrumb = document.getElementById("breadcrumb");
  const openSource = document.getElementById("open-source");
  const sidebar = document.getElementById("sidebar");

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

  // Material Icons (using Google Material Icons font)
  const folderIcon = `<span class="material-icons tree-icon folder-icon">folder</span>`;
  const folderOpenIcon = `<span class="material-icons tree-icon folder-icon folder-open">folder_open</span>`;
  const fileIcon = `<span class="material-icons tree-icon file-icon">description</span>`;
  const chevronIcon = `<span class="material-icons tree-chevron">chevron_right</span>`;

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
      folderRow.style.paddingLeft = `calc(${depth} * var(--tree-indent, 16px) + 8px)`;

      folderRow.innerHTML = `
        <span class="tree-chevron-wrapper">${chevronIcon}</span>
        <span class="tree-folder-icon">${isCollapsed ? folderIcon : folderOpenIcon}</span>
        <span class="tree-label">${node.name}</span>
      `;

      folderRow.addEventListener("click", () => {
        const wasCollapsed = collapsedFolders.has(nodeId);
        if (wasCollapsed) {
          collapsedFolders.delete(nodeId);
          folderRow.classList.remove("collapsed");
          childrenContainer.classList.remove("collapsed");
          folderRow.querySelector(".tree-folder-icon").innerHTML =
            folderOpenIcon;
        } else {
          collapsedFolders.add(nodeId);
          folderRow.classList.add("collapsed");
          childrenContainer.classList.add("collapsed");
          folderRow.querySelector(".tree-folder-icon").innerHTML = folderIcon;
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
        <span class="tree-file-icon">${fileIcon}</span>
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
    breadcrumb.textContent = pathParts.join(" / ");
    noteTitle.textContent = entry.name;
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
    if (allEntries.length) selectEntry(allEntries[0].path, true);
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

    searchInput.addEventListener("input", (e) => filterNav(e.target.value));
    window.addEventListener("hashchange", loadFromHash);

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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSidebar();
    });

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
