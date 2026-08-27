document.addEventListener('DOMContentLoaded', function () {
  var discovery = document.querySelector('[data-discovery]');
  if (!discovery) return;

  var cards = Array.prototype.slice.call(discovery.querySelectorAll('[data-discovery-card]'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-filter-group][data-filter-value]'));
  var noResults = document.querySelector('[data-filter-empty]');
  var summary = document.querySelector('[data-filter-summary]');

  var state = {
    topic: 'all',
    type: 'all'
  };

  function updateButtons(group, value) {
    buttons.forEach(function (button) {
      if (button.dataset.filterGroup !== group) return;
      var isActive = button.dataset.filterValue === value;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function applyFilters() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var topics = (card.dataset.topics || '').split('|').filter(Boolean);
      var type = card.dataset.type || '';
      var matchesTopic = state.topic === 'all' || topics.indexOf(state.topic) !== -1;
      var matchesType = state.type === 'all' || type === state.type;
      var isVisible = matchesTopic && matchesType;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;

    if (summary) {
      if (cards.length === 0) {
        summary.textContent = '';
      } else if (state.topic === 'all' && state.type === 'all') {
        summary.textContent = 'Đang hiển thị tất cả ' + cards.length + ' bài viết.';
      } else {
        var parts = [];
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

  applyFilters();
});
