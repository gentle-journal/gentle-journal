document.querySelectorAll('[data-review-library]').forEach((library) => {
  const filterButtons = Array.from(library.querySelectorAll('[data-review-filter]'));
  const cards = Array.from(library.querySelectorAll('[data-review-card]'));
  const count = library.querySelector('[data-review-count]');
  const empty = library.querySelector('[data-review-empty]');
  const sort = library.querySelector('[data-review-sort]');
  const grid = library.querySelector('[data-review-grid]');
  const reset = library.querySelector('[data-review-reset]');
  const mobileToggle = library.querySelector('[data-review-filter-toggle]');
  const filterPanel = library.querySelector('[data-review-filter-panel]');

  let activeType = 'all';

  const types = (card) => (card.dataset.productTypes || '').trim().split(/\s+/).filter(Boolean);

  const update = () => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const visible = activeType === 'all' || types(card).includes(activeType);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.reviewFilter === activeType;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    if (count) count.textContent = `${visibleCount} bài review`;
    if (empty) empty.hidden = visibleCount > 0;
  };

  const sortCards = () => {
    if (!grid || !sort) return;
    const direction = sort.value === 'oldest' ? 1 : -1;
    cards
      .slice()
      .sort((a, b) => direction * (Number(a.dataset.date) - Number(b.dataset.date)))
      .forEach((card) => grid.appendChild(card));
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeType = button.dataset.reviewFilter || 'all';
      update();
      if (filterPanel && window.matchMedia('(max-width: 820px)').matches) {
        filterPanel.classList.remove('is-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (reset) {
    reset.addEventListener('click', () => {
      activeType = 'all';
      update();
    });
  }

  if (sort) sort.addEventListener('change', sortCards);

  if (mobileToggle && filterPanel) {
    mobileToggle.addEventListener('click', () => {
      const open = filterPanel.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(open));
    });
  }

  sortCards();
  update();
});
