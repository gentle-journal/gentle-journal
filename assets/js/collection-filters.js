document.querySelectorAll('[data-collection-browser]').forEach((browser) => {
  const categoryButtons = Array.from(browser.querySelectorAll('[data-filter-category]'));
  const tagButtons = Array.from(browser.querySelectorAll('[data-filter-tag]'));
  const articles = Array.from(browser.querySelectorAll('[data-collection-article]'));
  const resultCount = browser.querySelector('[data-result-count]');
  const emptyState = browser.querySelector('[data-filter-empty]');

  let activeCategory = 'all';
  let activeTag = '';

  const values = (value) => value.trim().split(/\s+/).filter(Boolean);

  const updateResults = () => {
    let visibleCount = 0;

    articles.forEach((article) => {
      const articleCategories = values(article.dataset.categories || '');
      const articleTags = values(article.dataset.tags || '');
      const matchesCategory = activeCategory === 'all' || articleCategories.includes(activeCategory);
      const matchesTag = activeTag === '' || articleTags.includes(activeTag);
      const isVisible = matchesCategory && matchesTag;

      article.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    categoryButtons.forEach((button) => {
      const isActive = button.dataset.filterCategory === activeCategory;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    tagButtons.forEach((button) => {
      const isActive = button.dataset.filterTag === activeTag;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (resultCount) resultCount.textContent = `${visibleCount} bài viết`;
    if (emptyState) emptyState.hidden = visibleCount > 0;
  };

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.filterCategory;
      updateResults();
    });
  });

  tagButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedTag = button.dataset.filterTag;
      activeTag = activeTag === selectedTag ? '' : selectedTag;
      updateResults();
    });
  });
});
