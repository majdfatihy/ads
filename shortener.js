/* =====================================================
   SHORTENER.JS — Link creation + localStorage CRUD
   ===================================================== */

const STORAGE_KEY = 'lf_links';

function getLinks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function generateId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

/* ── Create Short Link ── */
function shortenLink() {
  const landingInput = document.getElementById('landingUrl');
  const fileInput    = document.getElementById('fileUrl');
  const resultBox    = document.getElementById('resultBox');
  const resultUrl    = document.getElementById('resultUrl');
  const copyBtn      = document.getElementById('copyResultBtn');

  const landingUrl = landingInput.value.trim();
  const fileUrl    = fileInput.value.trim();

  if (!landingUrl || !fileUrl) {
    showToast(t('toastError'));
    landingInput.focus();
    return;
  }

  // Basic URL validation
  try {
    new URL(landingUrl);
    new URL(fileUrl);
  } catch {
    showToast('⚠️ ' + (currentLang === 'ar' ? 'تأكد من صحة الروابط' : 'Check the URL format'));
    return;
  }

  const id        = generateId();
  const shortLink = `${location.origin}${location.pathname.replace('index.html','')}redirect.html?id=${id}`;
  const date      = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');

  const links = getLinks();
  links.unshift({ id, landingUrl, fileUrl, shortLink, date, clicks: 0 });
  saveLinks(links);

  // Show result
  resultUrl.textContent = shortLink;
  resultBox.classList.add('show');
  copyBtn.onclick = () => copyText(shortLink, copyBtn);
  copyBtn.textContent = t('btnCopy');

  // Scroll to result
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Refresh table
  renderLinksTable();

  // Clear inputs
  landingInput.value = '';
  fileInput.value    = '';
}

/* ── Delete Link ── */
function deleteLink(id) {
  const links = getLinks().filter(l => l.id !== id);
  saveLinks(links);
  renderLinksTable();
  showToast(t('toastDeleted'));
}

/* ── Render Table ── */
function renderLinksTable() {
  const tbody  = document.getElementById('linksBody');
  const empty  = document.getElementById('emptyState');
  if (!tbody) return;

  const links = getLinks();

  if (links.length === 0) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = links.map(l => `
    <tr>
      <td>
        <a href="${l.shortLink}" target="_blank" class="link-url">${l.shortLink}</a>
      </td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
        <span style="color:var(--text-muted);font-size:0.82rem" title="${l.landingUrl}">${l.landingUrl}</span>
      </td>
      <td style="white-space:nowrap;color:var(--text-muted);font-size:0.85rem">${l.date}</td>
      <td>
        <div class="link-actions">
          <button class="btn btn-sm btn-secondary"
                  onclick="copyText('${l.shortLink}', this)">${t('btnCopyLink')}</button>
          <button class="btn btn-sm btn-danger"
                  onclick="deleteLink('${l.id}')">${t('btnDelete')}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderLinksTable();

  // Enter key on inputs
  ['landingUrl', 'fileUrl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') shortenLink(); });
  });
});
