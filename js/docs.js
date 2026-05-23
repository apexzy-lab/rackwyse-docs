// Rackwyse Docs — shared JS

// ── ACTIVE SIDEBAR LINK ──────────────────────────────────────
function setActiveSidebarLink() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href === path || (path === '/' && href === '/index.html')) {
      link.classList.add('active');
    }
  });
}

// ── SEARCH ───────────────────────────────────────────────────
const searchIndex = [
  { title: 'Getting Started', section: 'Overview', url: '/pages/getting-started.html', keywords: 'start account signup register login verify email' },
  { title: 'Uploading Your First Bill', section: 'Getting Started', url: '/pages/uploading-bills.html', keywords: 'upload bill csv aws gcp azure cost usage export' },
  { title: 'AWS Cost & Usage Report', section: 'Uploading Bills', url: '/pages/uploading-bills.html#aws', keywords: 'aws amazon cost usage report cur s3 billing export' },
  { title: 'GCP Billing Export', section: 'Uploading Bills', url: '/pages/uploading-bills.html#gcp', keywords: 'gcp google cloud billing export bigquery csv' },
  { title: 'Azure Usage CSV', section: 'Uploading Bills', url: '/pages/uploading-bills.html#azure', keywords: 'azure microsoft usage details csv download' },
  { title: 'Understanding Your Report', section: 'Analysis', url: '/pages/understanding-reports.html', keywords: 'report findings savings waste analysis results' },
  { title: 'Severity Levels', section: 'Analysis', url: '/pages/understanding-reports.html#severity', keywords: 'critical high medium low severity priority findings' },
  { title: 'Savings Estimates', section: 'Analysis', url: '/pages/understanding-reports.html#savings', keywords: 'savings estimate monthly annual waste reduction' },
  { title: 'Savings Tracker', section: 'Analysis', url: '/pages/savings-tracker.html', keywords: 'tracker savings fixed implemented progress mark' },
  { title: 'Marking Findings as Fixed', section: 'Savings Tracker', url: '/pages/savings-tracker.html#marking-fixed', keywords: 'fixed mark done resolved implemented' },
  { title: 'Plans & Pricing', section: 'Billing', url: '/pages/billing.html', keywords: 'free starter pro team enterprise plans pricing upgrade' },
  { title: 'Upgrading Your Plan', section: 'Billing', url: '/pages/billing.html#upgrading', keywords: 'upgrade plan starter pro team payment dodo' },
  { title: 'Payment History & Receipts', section: 'Billing', url: '/pages/billing.html#receipts', keywords: 'payment history receipt invoice download pdf' },
  { title: 'Cancelling Your Subscription', section: 'Billing', url: '/pages/billing.html#cancel', keywords: 'cancel subscription downgrade end billing' },
  { title: 'Account Settings', section: 'Account', url: '/pages/account.html', keywords: 'account settings profile name email password' },
  { title: 'Changing Your Password', section: 'Account', url: '/pages/account.html#password', keywords: 'password change reset security' },
  { title: 'Two-Factor Authentication', section: 'Account', url: '/pages/account.html#2fa', keywords: '2fa two factor authentication security otp' },
  { title: 'API Keys', section: 'Account', url: '/pages/account.html#api', keywords: 'api key token developer integration' },
  { title: 'Connecting Cloud Accounts', section: 'Connections', url: '/pages/connections.html', keywords: 'connect aws gcp azure cloud connection iam role' },
  { title: 'AWS IAM Role Setup', section: 'Connections', url: '/pages/connections.html#aws', keywords: 'aws iam role arn policy read only connect' },
  { title: 'Frequently Asked Questions', section: 'FAQ', url: '/pages/faq.html', keywords: 'faq questions answers help support common' },
  { title: 'Analysis Limits', section: 'FAQ', url: '/pages/faq.html#limits', keywords: 'limit analyses per month how many reset' },
  { title: 'Supported File Formats', section: 'FAQ', url: '/pages/faq.html#formats', keywords: 'csv format file type supported upload' },
  { title: 'Data Privacy & Security', section: 'FAQ', url: '/pages/faq.html#privacy', keywords: 'privacy security data storage gdpr safe' },
];

function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q || q.length < 2) { results.classList.remove('active'); return; }

    const matches = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    ).slice(0, 6);

    if (!matches.length) { results.classList.remove('active'); return; }

    results.innerHTML = matches.map(m => `
      <a href="${m.url}" class="search-result">
        <span class="search-result-title">${highlight(m.title, q)}</span>
        <span class="search-result-section">${m.section}</span>
      </a>
    `).join('');
    results.classList.add('active');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('active');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.classList.remove('active'); input.blur(); }
  });
}

function highlight(text, q) {
  const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return text.replace(re, '<mark style="background:var(--accent-dim);color:var(--accent-dark);border-radius:2px;padding:0 2px">$1</mark>');
}

// ── TOC ACTIVE STATE ─────────────────────────────────────────
function initTOC() {
  const toc = document.querySelectorAll('.toc-link');
  if (!toc.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        toc.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0% -70% 0%' });

  document.querySelectorAll('h2[id], h3[id]').forEach(h => observer.observe(h));
}

// ── MOBILE SIDEBAR TOGGLE ─────────────────────────────────────
function initMobileSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.style.display = sidebar.style.display === 'block' ? '' : 'block';
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActiveSidebarLink();
  initSearch();
  initTOC();
  initMobileSidebar();
});
