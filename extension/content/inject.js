(() => {
  const OUTLINE = '2px solid red';
  const OUTLINE_OFFSET = '2px';

  const isLikelyOpenWebUI = () => {
    return Boolean(document.querySelector('#sidebar'));
  };

  const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

  const highlight = (el) => {
    if (!el) return;
    el.style.outline = OUTLINE;
    el.style.outlineOffset = OUTLINE_OFFSET;
  };

  const highlightTargetElements = () => {
    if (!isLikelyOpenWebUI()) return;

    const sidebar = document.querySelector('#sidebar');
    if (!sidebar) return;

    const currentPath = window.location.pathname;
    const targetAnchor = Array.from(sidebar.querySelectorAll('a[href]')).find((anchor) => {
      const href = anchor.getAttribute('href') || '';
      return href === currentPath;
    });
    if (!targetAnchor) return;

    const parent = targetAnchor.parentElement;
    if (!parent) return;

    const siblingDivs = Array.from(parent.children).filter(
      (child) => child !== targetAnchor && child.tagName === 'DIV'
    );
    siblingDivs.forEach((div) => {
      highlight(div.querySelector('button'));
    });

    const menus = Array.from(document.querySelectorAll('div[role="menu"]'));
    menus.forEach((menu) => {
      const deleteItem = Array.from(menu.querySelectorAll('div[role="menuitem"]')).find(
        (item) => normalizeText(item.textContent || '') === '削除'
      );
      highlight(deleteItem);
    });

    const modals = Array.from(document.querySelectorAll('div.z-99999999'));
    modals.forEach((modal) => {
      const confirmButton = Array.from(modal.querySelectorAll('button')).find(
        (button) => normalizeText(button.textContent || '') === '確認'
      );
      highlight(confirmButton);
    });
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
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      alert('quick delete button clicked (test)');
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

    highlightTargetElements();
  };

  const observer = new MutationObserver(() => {
    injectButtons();
    highlightTargetElements();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  injectButtons();
  highlightTargetElements();
})();
