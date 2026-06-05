// Rackwyse Docs JS
document.addEventListener('DOMContentLoaded', function() {
  // Mark active sidebar link
  var path = window.location.pathname;
  document.querySelectorAll('.sidebar-link, .sidebar-sublink').forEach(function(a) {
    if (a.getAttribute('href') === path || a.getAttribute('href') === path.replace('.html','')) {
      a.classList.add('active');
    }
  });
});
