/* =====================================================
   REDIRECT.JS — Countdown + Download logic
   ===================================================== */

const STORAGE_KEY  = 'lf_links';
const COUNTDOWN    = 15; // seconds
const CIRCUMFERENCE = 2 * Math.PI * 55; // r=55

function getLinks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function incrementClicks(id) {
  const links = getLinks();
  const found = links.find(l => l.id === id);
  if (found) {
    found.clicks = (found.clicks || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }
}

function initRedirect() {
  const params     = new URLSearchParams(location.search);
  const id         = params.get('id');
  const msgEl      = document.getElementById('redirect-msg');
  const subEl      = document.getElementById('redirect-sub');
  const numEl      = document.getElementById('countdown-num');
  const progEl     = document.getElementById('countdown-progress');
  const downloadBtn= document.getElementById('download-btn');
  const landingFr  = document.getElementById('landing-frame');

  if (!id) {
    if (msgEl) msgEl.textContent = currentLang === 'ar' ? 'رابط غير صالح' : 'Invalid link';
    return;
  }

  const links  = getLinks();
  const record = links.find(l => l.id === id);

  if (!record) {
    if (msgEl) msgEl.textContent = currentLang === 'ar'
      ? 'الرابط غير موجود أو انتهت صلاحيته'
      : 'Link not found or expired';
    return;
  }

  // Count click
  incrementClicks(id);

  // Open landing page in background iframe
  if (landingFr) {
    landingFr.src = record.landingUrl;
  } else {
    // fallback: open in new window after a brief delay
    setTimeout(() => window.open(record.landingUrl, '_blank', 'noopener'), 1200);
  }

  // Set circumference
  if (progEl) {
    progEl.style.strokeDasharray  = CIRCUMFERENCE;
    progEl.style.strokeDashoffset = 0;
  }

  // Countdown
  let remaining = COUNTDOWN;

  function updateProgress() {
    if (!progEl) return;
    const offset = CIRCUMFERENCE * (1 - remaining / COUNTDOWN);
    progEl.style.strokeDashoffset = CIRCUMFERENCE - offset;
  }

  const interval = setInterval(() => {
    remaining--;
    if (numEl) numEl.firstChild.textContent = remaining;
    updateProgress();

    if (remaining <= 0) {
      clearInterval(interval);
      // Show download button
      if (downloadBtn) {
        downloadBtn.classList.add('visible');
        downloadBtn.href = record.fileUrl;
        downloadBtn.setAttribute('target', '_blank');
        downloadBtn.setAttribute('rel', 'noopener');
      }
      if (msgEl) {
        msgEl.textContent = currentLang === 'ar'
          ? '✅ جاهز للتحميل!'
          : '✅ Ready to download!';
      }
      if (subEl) subEl.style.display = 'none';
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Wait for main.js to init lang/theme first
  setTimeout(initRedirect, 80);
});
