// Rackwyse Docs v2 JS

const SEARCH_INDEX = [
  { title: 'Getting Started', section: 'Overview', url: '/pages/getting-started.html', keywords: 'account setup register verify email login first analysis onboarding' },
  { title: 'Cloud Connections', section: 'Connecting Cloud', url: '/pages/connections.html', keywords: 'aws iam role gcp oauth bigquery azure microsoft connect auto sync cloudwatch' },
  { title: 'Uploading Bills (CSV)', section: 'Connecting Cloud', url: '/pages/uploading-bills.html', keywords: 'csv upload billing export aws gcp azure cost explorer management' },
  { title: 'Understanding Reports', section: 'Analysis', url: '/pages/understanding-reports.html', keywords: 'findings severity critical high medium low savings estimates dashboard priority stack velocity' },
  { title: 'Fix Commands', section: 'Analysis', url: '/pages/fix-commands.html', keywords: 'cli command console steps fix remediation assign ownership status done' },
  { title: 'Savings Tracker', section: 'Analysis', url: '/pages/savings-tracker.html', keywords: 'tracker fixed savings confirmed progress status open in progress' },
  { title: 'Anomaly Alerts', section: 'Analysis', url: '/pages/anomaly-alerts.html', keywords: 'anomaly spike alert email daily monthly spend detection cloudwatch' },
  { title: 'Team Collaboration', section: 'Team Features', url: '/pages/team.html', keywords: 'team invite member role owner admin cost overview weekly digest assign' },
  { title: 'Slack Integration', section: 'Team Features', url: '/pages/slack.html', keywords: 'slack webhook notification alert message channel generic' },
  { title: 'Plans & Billing', section: 'Account & Billing', url: '/pages/billing.html', keywords: 'plan pricing starter pro team upgrade payment dodo annual monthly' },
  { title: 'Account Settings', section: 'Account & Billing', url: '/pages/account.html', keywords: 'account profile security 2fa password notifications preferences theme' },
  { title: 'API Access', section: 'Account & Billing', url: '/pages/api.html', keywords: 'api key rest endpoint analyse findings authentication rate limit' },
  { title: 'FAQ', section: 'Help', url: '/pages/faq.html', keywords: 'faq questions answers help support billing refund accuracy' },
];

document.addEventListener('DOMContentLoaded', function() {
  // Theme
  const savedTheme = localStorage.getItem('rw-docs-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtons(savedTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const t = this.dataset.theme;
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('rw-docs-theme', t);
      updateThemeButtons(t);
      // Update logo
      updateLogo(t);
    });
  });

  // Logo
  updateLogo(savedTheme);

  // Active sidebar link
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (path.endsWith(href) || path === href || 
        (path === '/' && href === '/index.html') ||
        (path.endsWith('/') && href === '/index.html'))) {
      a.classList.add('active');
    }
  });

  // Search
  const searchInput = document.getElementById('docs-search');
  const searchResults = document.getElementById('search-results');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const q = this.value.trim().toLowerCase();
      if (!q) { searchResults.style.display = 'none'; return; }
      const matches = SEARCH_INDEX.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.keywords.toLowerCase().includes(q) ||
        p.section.toLowerCase().includes(q)
      ).slice(0, 6);
      if (!matches.length) {
        searchResults.innerHTML = '<div class="search-empty">No results found</div>';
      } else {
        searchResults.innerHTML = matches.map(m =>
          `<a href="${m.url}" class="search-result">
            <span class="search-result-title">${m.title}</span>
            <span class="search-result-section">${m.section}</span>
          </a>`
        ).join('');
      }
      searchResults.style.display = 'block';
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.search-wrap')) searchResults.style.display = 'none';
    });
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { searchResults.style.display = 'none'; this.blur(); }
    });
  }

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const pre = this.closest('.code-wrap').querySelector('pre');
      navigator.clipboard.writeText(pre.textContent).then(() => {
        this.textContent = '✓ Copied';
        this.classList.add('copied');
        setTimeout(() => { this.textContent = 'Copy'; this.classList.remove('copied'); }, 2000);
      });
    });
  });

  // Mobile toggle
  const toggle = document.querySelector('.mobile-nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!e.target.closest('.sidebar') && !e.target.closest('.mobile-nav-toggle')) {
        sidebar.classList.remove('open');
      }
    });
  }
});

function updateThemeButtons(theme) {
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function updateLogo(theme) {
  document.querySelectorAll('.docs-logo-img').forEach(img => {
    img.src = theme === 'light'
      ? 'https://app.rackwyse.com/brand/logo-white.png'
      : 'https://app.rackwyse.com/brand/logo-dark.png';
  });
}
