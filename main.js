/* =====================================================
   MAIN.JS — Theme + Language + Header + Footer + i18n
   ===================================================== */

/* ── Translations ── */
const i18n = {
  ar: {
    navHome:        'الرئيسية',
    navSocial:      'السوشيال',
    navAds:         'الإعلانات',
    navAbout:       'من نحن',
    navContact:     'اتصل بنا',
    footerDesc:     'موقع اختصار الروابط الذكي — اربح من إعلاناتك مع كل تحميل يشاركه جمهورك.',
    footerYT:       'شرح بناء الموقع — قناتنا على يوتيوب',
    footerPages:    'الصفحات',
    footerLegal:    'قانوني',
    footerTools:    'الأدوات',
    linkPrivacy:    'سياسة الخصوصية',
    linkDisclaimer: 'إخلاء المسؤولية',
    linkContact:    'اتصل بنا',
    linkAbout:      'من نحن',
    linkHome:       'الرئيسية',
    linkSocial:     'منصات التواصل',
    linkAds:        'صفحة الإعلانات',
    linkShorten:    'اختصار الروابط',
    footerRights:   'جميع الحقوق محفوظة',
    heroBadge:      '🔗 أداة اختصار الروابط الاحترافية',
    heroTitle:      'اختصر روابطك واكسب من إعلاناتك',
    heroSub:        'أنشئ روابط ذكية مع صفحة انتظار تعرض إعلاناتك — جمهورك ينتظر، أنت تربح.',
    labelLanding:   'رابط صفحة الإعلانات',
    labelLandingPH: 'https://yoursite.com/ads.html',
    labelFile:      'رابط الملف النهائي (التحميل)',
    labelFilePH:    'https://yoursite.com/file.zip',
    btnShorten:     '🔗 اختصر الرابط الآن',
    resultLabel:    '✅ تم إنشاء الرابط بنجاح',
    btnCopy:        'نسخ',
    btnCopied:      'تم ✓',
    prevLinks:      'الروابط المنشأة مسبقاً',
    colLink:        'الرابط المختصر',
    colLanding:     'صفحة الإعلانات',
    colDate:        'التاريخ',
    colActions:     'إجراءات',
    btnCopyLink:    'نسخ',
    btnDelete:      'حذف',
    emptyTitle:     'لا توجد روابط بعد',
    emptySub:       'أنشئ أول رابط مختصر الآن',
    toastCopied:    '✅ تم نسخ الرابط',
    toastDeleted:   '🗑️ تم حذف الرابط',
    toastError:     '⚠️ يرجى ملء جميع الحقول',
  },
  en: {
    navHome:        'Home',
    navSocial:      'Social',
    navAds:         'Ads',
    navAbout:       'About',
    navContact:     'Contact',
    footerDesc:     'Smart link shortener — earn from your ads with every download your audience shares.',
    footerYT:       'How we built this site — YouTube Channel',
    footerPages:    'Pages',
    footerLegal:    'Legal',
    footerTools:    'Tools',
    linkPrivacy:    'Privacy Policy',
    linkDisclaimer: 'Disclaimer',
    linkContact:    'Contact Us',
    linkAbout:      'About Us',
    linkHome:       'Home',
    linkSocial:     'Social Platforms',
    linkAds:        'Ads Page',
    linkShorten:    'Link Shortener',
    footerRights:   'All rights reserved',
    heroBadge:      '🔗 Professional Link Shortener',
    heroTitle:      'Shorten Links & Earn from Your Ads',
    heroSub:        'Create smart links with a waiting page that shows your ads — your audience waits, you earn.',
    labelLanding:   'Ads Landing Page URL',
    labelLandingPH: 'https://yoursite.com/ads.html',
    labelFile:      'Final File URL (Download)',
    labelFilePH:    'https://yoursite.com/file.zip',
    btnShorten:     '🔗 Shorten Link Now',
    resultLabel:    '✅ Link created successfully',
    btnCopy:        'Copy',
    btnCopied:      'Copied ✓',
    prevLinks:      'Previously Created Links',
    colLink:        'Short Link',
    colLanding:     'Landing Page',
    colDate:        'Date',
    colActions:     'Actions',
    btnCopyLink:    'Copy',
    btnDelete:      'Delete',
    emptyTitle:     'No links yet',
    emptySub:       'Create your first short link now',
    toastCopied:    '✅ Link copied',
    toastDeleted:   '🗑️ Link deleted',
    toastError:     '⚠️ Please fill all fields',
  }
};

/* ── Current State ── */
let currentLang  = 'ar';
let currentTheme = 'light';

/* ── Init ── */
function initSite() {
  // Detect saved or system theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
  } else {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(currentTheme);

  // Detect saved or browser language
  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    currentLang = savedLang;
  } else {
    currentLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
  }
  applyLang(currentLang);

  // Inject header + footer
  injectHeader();
  injectFooter();

  // Mark active nav link
  markActiveNav();
}

/* ── Theme ── */
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

/* ── Language ── */
function applyLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('lang', lang);
  translatePage();
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'عر';
}

function toggleLang() {
  applyLang(currentLang === 'ar' ? 'en' : 'ar');
}

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || i18n['ar'][key] || key;
}

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  // Re-render header/footer links text
  document.querySelectorAll('.nav-link[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

/* ── Header Injection ── */
function injectHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.classList.add('site-header');
  el.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="site-logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="currentColor" opacity="0.12"/>
          <path d="M8 14.5l4 4 8-9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="20" cy="8" r="2.5" fill="currentColor"/>
          <circle cx="8"  cy="20" r="2.5" fill="currentColor"/>
        </svg>
        <span>Link<strong style="color:var(--text-primary)">Fast</strong></span>
      </a>

      <nav class="main-nav" role="navigation">
        <ul>
          <li><a href="index.html"        class="nav-link" data-i18n="navHome">${t('navHome')}</a></li>
          <li><a href="social-links.html" class="nav-link" data-i18n="navSocial">${t('navSocial')}</a></li>
          <li><a href="ads.html"          class="nav-link" data-i18n="navAds">${t('navAds')}</a></li>
          <li><a href="about.html"        class="nav-link" data-i18n="navAbout">${t('navAbout')}</a></li>
          <li><a href="contact.html"      class="nav-link" data-i18n="navContact">${t('navContact')}</a></li>
        </ul>
      </nav>

      <div class="header-controls">
        <button class="icon-btn lang-btn" id="langBtn" onclick="toggleLang()" aria-label="Toggle language">
          ${currentLang === 'ar' ? 'EN' : 'عر'}
        </button>
        <button class="icon-btn" id="themeBtn" onclick="toggleTheme()" aria-label="Toggle theme">
          ${currentTheme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button class="icon-btn hamburger" id="hamburger" onclick="toggleMobileNav()" aria-label="Menu">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <nav class="mobile-nav" id="mobileNav" role="navigation">
      <a href="index.html"        data-i18n="navHome">${t('navHome')}</a>
      <a href="social-links.html" data-i18n="navSocial">${t('navSocial')}</a>
      <a href="ads.html"          data-i18n="navAds">${t('navAds')}</a>
      <a href="about.html"        data-i18n="navAbout">${t('navAbout')}</a>
      <a href="contact.html"      data-i18n="navContact">${t('navContact')}</a>
    </nav>
  `;
}

function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Footer Injection ── */
function injectFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.classList.add('site-footer');
  el.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="site-logo" style="text-decoration:none">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="var(--accent)" opacity="0.15"/>
              <path d="M8 14.5l4 4 8-9" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="20" cy="8" r="2.5" fill="var(--accent)"/>
              <circle cx="8"  cy="20" r="2.5" fill="var(--accent)"/>
            </svg>
            <span>Link<strong style="color:var(--text-primary)">Fast</strong></span>
          </a>
          <p data-i18n="footerDesc">${t('footerDesc')}</p>
          <a href="https://www.youtube.com/playlist?list=PLRl_JqdizTBw"
             target="_blank" rel="noopener" class="footer-yt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0000">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            <span data-i18n="footerYT">${t('footerYT')}</span>
          </a>
        </div>

        <div class="footer-col">
          <h4 data-i18n="footerPages">${t('footerPages')}</h4>
          <ul>
            <li><a href="index.html"        data-i18n="linkHome">${t('linkHome')}</a></li>
            <li><a href="social-links.html" data-i18n="linkSocial">${t('linkSocial')}</a></li>
            <li><a href="ads.html"          data-i18n="linkAds">${t('linkAds')}</a></li>
            <li><a href="about.html"        data-i18n="linkAbout">${t('linkAbout')}</a></li>
            <li><a href="contact.html"      data-i18n="linkContact">${t('linkContact')}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 data-i18n="footerLegal">${t('footerLegal')}</h4>
          <ul>
            <li><a href="privacy-policy.html" data-i18n="linkPrivacy">${t('linkPrivacy')}</a></li>
            <li><a href="disclaimer.html"     data-i18n="linkDisclaimer">${t('linkDisclaimer')}</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© <span id="yr"></span> LinkFast — <span data-i18n="footerRights">${t('footerRights')}</span></p>
        <p style="font-size:0.8rem;color:var(--text-muted)">
          <a href="sitemap.xml" style="color:var(--text-muted)">Sitemap</a> ·
          <a href="robots.txt"  style="color:var(--text-muted)">Robots</a>
        </p>
      </div>
    </div>
  `;
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
}

/* ── Toast ── */
function showToast(msg, duration = 2800) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── Copy to Clipboard ── */
function copyText(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(t('toastCopied'));
    if (btnEl) {
      const orig = btnEl.textContent;
      btnEl.textContent = t('btnCopied');
      btnEl.classList.add('copied');
      setTimeout(() => { btnEl.textContent = orig; btnEl.classList.remove('copied'); }, 2000);
    }
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('toastCopied'));
  });
}

/* ── Run ── */
document.addEventListener('DOMContentLoaded', initSite);
