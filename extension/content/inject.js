(() => {
  const isLikelyOpenWebUI = () => {
    return Boolean(document.querySelector('#sidebar'));
  };

  const markTargets = () => {
    if (!isLikelyOpenWebUI()) return;

    const targets = document.querySelectorAll('div.self-start');
    targets.forEach((el) => {
      if (el.dataset.owuiQuickDeleteMarked === '1') return;
      el.dataset.owuiQuickDeleteMarked = '1';
      el.style.outline = '2px solid red';
      el.style.outlineOffset = '2px';
    });
  };

  const observer = new MutationObserver(markTargets);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  markTargets();
})();
