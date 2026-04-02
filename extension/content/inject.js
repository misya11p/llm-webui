(() => {
  const isLikelyOpenWebUI = () => {
    return Boolean(document.querySelector('#sidebar'));
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
  };

  const observer = new MutationObserver(injectButtons);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  injectButtons();
})();
