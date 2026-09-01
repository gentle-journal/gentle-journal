document.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.getElementById('menuButton');
  var menuPanel = document.getElementById('menuPanel');
  if (!menuButton || !menuPanel) return;

  function setOpen(open) {
    menuPanel.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  }

  menuButton.addEventListener('click', function () {
    setOpen(!menuPanel.classList.contains('open'));
  });

  menuPanel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setOpen(false);
    });
  });

  document.addEventListener('click', function (event) {
    if (!menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
      setOpen(false);
    }
  });
});
