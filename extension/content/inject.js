(() => {
  const ALLOWED_ORIGIN = 'http://localhost:50011';

  if (window.location.origin !== ALLOWED_ORIGIN) {
    return;
  }

  const isLikelyOpenWebUI = () => {
    return Boolean(document.querySelector('#sidebar'));
  };

  const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getTargetAnchor = () => {
    const sidebar = document.querySelector('#sidebar');
    if (!sidebar) return null;

    const currentPath = window.location.pathname;
    return (
      Array.from(sidebar.querySelectorAll('a[href]')).find((anchor) => {
        const href = anchor.getAttribute('href') || '';
        return href === currentPath;
      }) || null
    );
  };

  const getNeighborAnchor = (targetAnchor) => {
    if (!targetAnchor) return null;

    const sidebar = document.querySelector('#sidebar');
    if (!sidebar) return null;

    const anchors = Array.from(sidebar.querySelectorAll('a[href]'));
    const currentIndex = anchors.indexOf(targetAnchor);
    if (currentIndex < 0) return null;

    const nextAnchor = anchors[currentIndex + 1];
    const fallbackPrevAnchor = anchors[currentIndex - 1];
    const candidate = nextAnchor || fallbackPrevAnchor;
    if (!candidate) return null;

    return candidate;
  };

  const getMoreButton = () => {
    const targetAnchor = getTargetAnchor();
    if (!targetAnchor) return null;

    const parent = targetAnchor.parentElement;
    if (!parent) return null;

    const siblingDiv = Array.from(parent.children).find(
      (child) => child !== targetAnchor && child.tagName === 'DIV'
    );
    if (!siblingDiv) return null;

    return siblingDiv.querySelector('button');
  };

  const getDeleteMenuItem = () => {
    const menus = Array.from(document.querySelectorAll('div[role="menu"]'));
    for (const menu of menus) {
      const item = Array.from(menu.querySelectorAll('div[role="menuitem"]')).find(
        (menuItem) => normalizeText(menuItem.textContent || '') === '削除'
      );
      if (item) return item;
    }
    return null;
  };

  const getConfirmButton = () => {
    const modals = Array.from(document.querySelectorAll('div.z-99999999'));
    for (const modal of modals) {
      const button = Array.from(modal.querySelectorAll('button')).find(
        (modalButton) => normalizeText(modalButton.textContent || '') === '確認'
      );
      if (button) return button;
    }
    return null;
  };

  const runQuickDelete = async () => {
    const targetAnchor = getTargetAnchor();
    const neighborAnchor = getNeighborAnchor(targetAnchor);

    const moreButton = getMoreButton();
    if (!moreButton) return;
    moreButton.click();

    await wait(120);
    const deleteItem = getDeleteMenuItem();
    if (!deleteItem) return;
    deleteItem.click();

    await wait(120);
    const confirmButton = getConfirmButton();
    if (!confirmButton) return;
    confirmButton.click();

    if (!neighborAnchor) return;
    await wait(120);
    neighborAnchor.click();
  };

  const createQuickDeleteButton = () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.owuiQuickDeleteButton = '1';
    button.title = 'クイック削除（テスト）';
    button.setAttribute('aria-label', 'クイック削除（テスト）');
    button.style.display = 'inline-flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.width = '2rem';
    button.style.height = '2rem';
    button.style.border = 'none';
    button.style.borderRadius = '0.375rem';
    button.style.background = 'transparent';
    button.style.cursor = 'pointer';
    button.style.padding = '0';
    button.style.marginRight = '0.25rem';

    const icon = document.createElement('img');
    icon.src = browser.runtime.getURL('content/trash.svg');
    icon.alt = '';
    icon.width = 16;
    icon.height = 16;
    icon.style.opacity = '0.75';
    icon.style.pointerEvents = 'none';

    button.appendChild(icon);
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await runQuickDelete();
    });

    return button;
  };

  const injectButtons = () => {
    if (!isLikelyOpenWebUI()) return;

    const targets = document.querySelectorAll('div.self-start');
    targets.forEach((el) => {
      if (el.querySelector('[data-owui-quick-delete-button="1"]')) return;
      const button = createQuickDeleteButton();
      el.insertBefore(button, el.firstChild);
    });
  };

  const observer = new MutationObserver(() => {
    injectButtons();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  injectButtons();
})();
