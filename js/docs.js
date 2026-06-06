
(function(){
  var K='rw-theme';
  function getT(){return localStorage.getItem(K)||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark')}
  function setT(t){
    document.documentElement.setAttribute('data-theme',t);
    localStorage.setItem(K,t);
    // Logo is inline SVG - no src swap needed
  }
  setT(getT());
  document.addEventListener('DOMContentLoaded',function(){
    setT(getT());

    // theme toggle
    document.querySelectorAll('.theme-toggle').forEach(function(b){
      b.addEventListener('click',function(){setT(getT()==='dark'?'light':'dark')});
    });

    // active link
    var path=location.pathname.replace(/\/$/,'');
    document.querySelectorAll('.sidebar-link').forEach(function(a){
      var h=a.getAttribute('href').replace(/\/$/,'');
      if(h===path||h===path+'.html'||(path==='/'&&h==='/index.html'))a.classList.add('active');
    });

    // mobile sidebar
    var sidebar=document.getElementById('sidebar');
    var overlay=document.getElementById('sidebar-overlay');
    function open(){sidebar&&sidebar.classList.add('open');overlay&&overlay.classList.add('open')}
    function close(){sidebar&&sidebar.classList.remove('open');overlay&&overlay.classList.remove('open')}
    document.querySelectorAll('.hamburger').forEach(function(b){b.addEventListener('click',open)});
    if(overlay)overlay.addEventListener('click',close);

    // search
    var PAGES=[
      {t:'Home',s:'Overview',u:'/index.html',k:'rackwyse cloud cost overview'},
      {t:'Getting Started',s:'Overview',u:'/pages/getting-started.html',k:'account signup login verify email first analysis'},
      {t:'Cloud Connections',s:'Connecting Cloud',u:'/pages/connections.html',k:'aws iam role gcp oauth azure bigquery connect'},
      {t:'Uploading Bills',s:'Connecting Cloud',u:'/pages/uploading-bills.html',k:'upload csv billing export aws gcp azure'},
      {t:'Understanding Reports',s:'Analysis',u:'/pages/understanding-reports.html',k:'findings report savings severity pdf share'},
      {t:'Fix Commands',s:'Analysis',u:'/pages/fix-commands.html',k:'cli command fix console steps assign finding status'},
      {t:'Savings Tracker',s:'Analysis',u:'/pages/savings-tracker.html',k:'savings tracker confirmed fixed mark resolve'},
      {t:'Anomaly Alerts',s:'Analysis',u:'/pages/anomaly-alerts.html',k:'anomaly alert spike spend email daily monthly'},
      {t:'Team Collaboration',s:'Team Features',u:'/pages/team.html',k:'team invite member role cost overview weekly digest'},
      {t:'Slack Integration',s:'Team Features',u:'/pages/slack.html',k:'slack webhook integration notification alert'},
      {t:'Plans & Billing',s:'Account & Billing',u:'/pages/billing.html',k:'plans pricing upgrade billing payment'},
      {t:'Account Settings',s:'Account & Billing',u:'/pages/account.html',k:'account settings profile password 2fa notifications'},
      {t:'API Access',s:'Account & Billing',u:'/pages/api.html',k:'api key rest endpoint programmatic'},
      {t:'FAQ',s:'Help',u:'/pages/faq.html',k:'faq questions answers security refund cancel'},
    ];
    var inp=document.getElementById('search-input');
    var drop=document.getElementById('search-dropdown');
    if(inp&&drop){
      function search(q){
        q=q.toLowerCase().trim();drop.innerHTML='';
        if(!q){drop.classList.remove('open');return}
        var res=PAGES.filter(function(p){return p.t.toLowerCase().includes(q)||p.k.includes(q)||p.s.toLowerCase().includes(q)}).slice(0,6);
        if(!res.length){drop.innerHTML='<div class="search-empty">No results for \''+q+'\'</div>'}
        else res.forEach(function(p){
          var a=document.createElement('a');a.className='search-result';a.href=p.u;
          a.innerHTML='<span class="search-result-title">'+p.t+'</span><span class="search-result-section">'+p.s+'</span>';
          drop.appendChild(a);
        });
        drop.classList.add('open');
      }
      inp.addEventListener('input',function(){search(this.value)});
      document.addEventListener('click',function(e){if(!e.target.closest('.topnav-search'))drop.classList.remove('open')});
      document.addEventListener('keydown',function(e){
        if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();inp.focus();inp.select()}
        if(e.key==='Escape'){drop.classList.remove('open');inp.blur()}
      });
    }

    // copy buttons
    document.querySelectorAll('pre').forEach(function(pre){
      var btn=document.createElement('button');btn.className='copy-btn';btn.textContent='Copy';
      btn.addEventListener('click',function(){
        var txt=pre.querySelector('code')?pre.querySelector('code').textContent:pre.textContent;
        navigator.clipboard.writeText(txt).then(function(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy'},1500)});
      });
      pre.appendChild(btn);
    });
  });
})();
