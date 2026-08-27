document.addEventListener('DOMContentLoaded', function () {
  var discovery = document.querySelector('[data-discovery]');
  if (!discovery) return;

  var cards = Array.prototype.slice.call(discovery.querySelectorAll('[data-discovery-card]'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-filter-group][data-filter-value]'));
  var noResults = document.querySelector('[data-filter-empty]');
  var summary = document.querySelector('[data-filter-summary]');
  var searchForm = document.querySelector('[data-discovery-search]');
  var searchInput = document.querySelector('[data-search-input]');
  var params = new URLSearchParams(window.location.search);

  var state = {
    topic: 'all',
    type: 'all',
    query: (params.get('q') || '').trim()
  };

  function normalizeText(value) {
    return (value || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function updateButtons(group, value) {
    buttons.forEach(function (button) {
      if (button.dataset.filterGroup !== group) return;
      var isActive = button.dataset.filterValue === value;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function syncSearchUrl() {
    if (!window.history || !window.history.replaceState) return;
    var url = new URL(window.location.href);
    if (state.query) {
      url.searchParams.set('q', state.query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  }

  function applyFilters() {
    var visibleCount = 0;
    var normalizedQuery = normalizeText(state.query);

    cards.forEach(function (card) {
      var topics = (card.dataset.topics || '').split('|').filter(Boolean);
      var type = card.dataset.type || '';
      var searchableText = normalizeText(card.dataset.search || '');
      var matchesTopic = state.topic === 'all' || topics.indexOf(state.topic) !== -1;
      var matchesType = state.type === 'all' || type === state.type;
      var matchesQuery = !normalizedQuery || searchableText.indexOf(normalizedQuery) !== -1;
      var isVisible = matchesTopic && matchesType && matchesQuery;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (noResults) noResults.hidden = cards.length === 0 || visibleCount !== 0;

    if (summary) {
      if (cards.length === 0) {
        summary.textContent = '';
      } else if (!state.query && state.topic === 'all' && state.type === 'all') {
        summary.textContent = 'Đang hiển thị tất cả ' + cards.length + ' bài viết.';
      } else {
        var parts = [];
        if (state.query) parts.push('từ khoá “' + state.query + '”');
        if (state.topic !== 'all') parts.push('chủ đề “' + state.topic + '”');
        if (state.type !== 'all') parts.push('loại “' + state.type + '”');
        summary.textContent = 'Tìm thấy ' + visibleCount + ' bài phù hợp với ' + parts.join(' và ') + '.';
      }
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var group = button.dataset.filterGroup;
      var value = button.dataset.filterValue;
      state[group] = value;
      updateButtons(group, value);
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.value = state.query;
    searchInput.addEventListener('input', function () {
      state.query = searchInput.value.trim();
      syncSearchUrl();
      applyFilters();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      state.query = searchInput ? searchInput.value.trim() : '';
      syncSearchUrl();
      applyFilters();
    });
  }

  applyFilters();
});
