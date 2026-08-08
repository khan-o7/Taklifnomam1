document.querySelector('.scroll-hint').addEventListener('click', function() {
  const target = document.getElementById('section11');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

const video = document.getElementById('heroVideo');
const canvas = document.getElementById('bokehCanvas');
function spawnOrbs() {
    const colors = ['rgba(220,220,220,VAR)','rgba(240,240,240,VAR)','rgba(200,200,200,VAR)','rgba(255,255,255,VAR)','rgba(230,230,230,VAR)'];
    for (let i = 0; i < 18; i++) {
        const orb = document.createElement('div'); orb.className = 'bokeh-orb';
        const size = 60 + Math.random() * 180, op = (.15 + Math.random() * .25).toFixed(2);
        const color = colors[Math.floor(Math.random() * colors.length)].replace('VAR', op);
        orb.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${10+Math.random()*80}%;background:${color};--dur:${7+Math.random()*8}s;--delay:${-Math.random()*10}s;--op:${op};`;
        canvas.appendChild(orb);
    }
}
spawnOrbs();
video.addEventListener('error', () => { canvas.style.opacity = '1'; });
video.addEventListener('playing', () => { canvas.style.opacity = '0'; canvas.style.transition = 'opacity 1s'; });

const unlockScreen = document.getElementById('unlock-screen');
const unlockBtn = document.getElementById('unlockBtn');
const musicToggleUnlock = document.getElementById('musicToggleUnlock');
const langBtns = document.querySelectorAll('.lang-btn');

// ========== MUZIKA ==========
(function() {
    const bgMusic = new Audio('music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    let isMusicPlaying = false;

    // РљРЅРѕРїРєР° РјСѓР·С‹РєРё РЅР° unlock-СЌРєСЂР°РЅРµ
    const musicToggleUnlock = document.getElementById('musicToggleUnlock');
    
    // РњРѕР¶РµС‚ Р±С‹С‚СЊ РµС‰С‘ РѕРґРЅР° РєРЅРѕРїРєР° РЅР° РѕСЃРЅРѕРІРЅРѕРј СЌРєСЂР°РЅРµ (РµСЃР»Рё РµСЃС‚СЊ)
    const musicToggleMain = document.getElementById('musicToggleMain'); // Р•СЃР»Рё РµСЃС‚СЊ С‚Р°РєР°СЏ РєРЅРѕРїРєР° РЅР° РѕСЃРЅРѕРІРЅРѕРј СЌРєСЂР°РЅРµ
    
    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РѕР±РЅРѕРІР»РµРЅРёСЏ РёРєРѕРЅРєРё РєРЅРѕРїРєРё
    function updateMusicIcon(button, isPlaying) {
        if (!button) return;
        
        // РЎРѕС…СЂР°РЅСЏРµРј С‚РµРєСѓС‰РёР№ SVG
        const svg = button.querySelector('svg');
        if (!svg) return;
        
        if (isPlaying) {
            // РРєРѕРЅРєР° "Р’РєР»СЋС‡РµРЅРѕ" (РґРёРЅР°РјРёРє СЃРѕ Р·РІСѓРєРѕРј)
            svg.innerHTML = `
                <path d="M3 10v4h4l5 5V5l-5 5H3z"/>
                <path d="M18 8c1.5 1.5 2 3.5 2 6s-0.5 4.5-2 6"/>
                <path d="M21 5c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9"/>
            `;
        } else {
            // РРєРѕРЅРєР° "Р’С‹РєР»СЋС‡РµРЅРѕ" (РґРёРЅР°РјРёРє СЃ РєСЂРµСЃС‚РёРєРѕРј)
            svg.innerHTML = `
                <path d="M3 10v4h4l5 5V5l-5 5H3z"/>
                <line x1="18" y1="8" x2="22" y2="12"/>
                <line x1="22" y1="8" x2="18" y2="12"/>
            `;
        }
    }
    
    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РІРєР»СЋС‡РµРЅРёСЏ РјСѓР·С‹РєРё
    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            updateMusicIcon(musicToggleUnlock, true);
            if (musicToggleMain) updateMusicIcon(musicToggleMain, true);
        }).catch(error => {
            console.log('РђРІС‚РѕРІРѕСЃРїСЂРѕРёР·РІРµРґРµРЅРёРµ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅРѕ Р±СЂР°СѓР·РµСЂРѕРј. РќСѓР¶РЅРѕ РІР·Р°РёРјРѕРґРµР№СЃС‚РІРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ:', error);
        });
    }
    
    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РІС‹РєР»СЋС‡РµРЅРёСЏ РјСѓР·С‹РєРё
    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        updateMusicIcon(musicToggleUnlock, false);
        if (musicToggleMain) updateMusicIcon(musicToggleMain, false);
    }
    
    // РџРµСЂРµРєР»СЋС‡РµРЅРёРµ РјСѓР·С‹РєРё
    function toggleMusic() {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
    
    // Р’РµС€Р°РµРј РѕР±СЂР°Р±РѕС‚С‡РёРє РЅР° РєРЅРѕРїРєСѓ СЂР°Р·Р±Р»РѕРєРёСЂРѕРІРєРё
    if (musicToggleUnlock) {
        musicToggleUnlock.addEventListener('click', (e) => {
            e.stopPropagation(); // Р§С‚РѕР±С‹ РЅРµ С‚СЂРёРіРіРµСЂРёС‚СЊ РґСЂСѓРіРёРµ СЃРѕР±С‹С‚РёСЏ
            toggleMusic();
        });
    }
    
    // Р•СЃР»Рё РµСЃС‚СЊ РєРЅРѕРїРєР° РЅР° РѕСЃРЅРѕРІРЅРѕРј СЌРєСЂР°РЅРµ
    if (musicToggleMain) {
        musicToggleMain.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }
    
    // РџСЂРѕР±СѓРµРј РІРєР»СЋС‡РёС‚СЊ РјСѓР·С‹РєСѓ РїСЂРё СЂР°Р·Р±Р»РѕРєРёСЂРѕРІРєРµ (РїРѕСЃР»Рµ РєР»РёРєР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
    const unlockBtnForMusic = document.getElementById('unlockBtn');
    if (unlockBtnForMusic) {
        unlockBtnForMusic.addEventListener('click', () => {
            // РќРµР±РѕР»СЊС€Р°СЏ Р·Р°РґРµСЂР¶РєР°, С‡С‚РѕР±С‹ Р·РІСѓРє СЂР°Р·Р±Р»РѕРєРёСЂРѕРІРєРё РЅРµ РєРѕРЅС„Р»РёРєС‚РѕРІР°Р»
            setTimeout(() => {
                if (!isMusicPlaying) {
                    playMusic();
                }
            }, 500);
        });
    }
    
    // РўР°РєР¶Рµ РїСЂРѕР±СѓРµРј РІРєР»СЋС‡РёС‚СЊ РїСЂРё РїРµСЂРІРѕРј Р»СЋР±РѕРј РІР·Р°РёРјРѕРґРµР№СЃС‚РІРёРё (РЅР° СЃР»СѓС‡Р°Р№, РµСЃР»Рё unlockBtn РЅРµ СЃСЂР°Р±РѕС‚Р°Р»)
    const anyInteraction = () => {
        if (!isMusicPlaying) {
            playMusic();
        }
        // РЈРґР°Р»СЏРµРј РѕР±СЂР°Р±РѕС‚С‡РёРєРё РїРѕСЃР»Рµ РїРµСЂРІРѕРіРѕ РІР·Р°РёРјРѕРґРµР№СЃС‚РІРёСЏ
        document.removeEventListener('click', anyInteraction);
        document.removeEventListener('touchstart', anyInteraction);
    };
    
    document.addEventListener('click', anyInteraction);
    document.addEventListener('touchstart', anyInteraction);
})();

unlockBtn.addEventListener('click', () => {
    unlockBtn.style.transform = "scale(0.92)";
    setTimeout(() => { unlockBtn.style.transform = ""; }, 120);
    unlockScreen.classList.add('opening');
    unlockScreen.querySelector('.unlock-center').classList.add('unlock-opening');
    
    
    setTimeout(() => {
        unlockScreen.classList.add('hidden');
        document.body.classList.remove('overflowH');
        document.body.classList.add('loaded');
        loadGuestsFromDB();
    }, 1200);
});

// ========== Р¤РЈРќРљР¦Р˜Р˜ Р”Р›РЇ Р РђР‘РћРўР« РЎ Р‘РђР—РћР™ Р”РђРќРќР«РҐ ==========

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbTk2-rFgM-5HHCHkfWfQrbXI9jYZvDWwux3Ztxf1Qdw2gEiMF0kUsYPLl_ubndKLo/exec';

async function loadGuestsFromDB() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const result = await response.json();
        
        if (result.success && result.guests) {
            const mappedGuests = result.guests.map(g => ({
                name: g.guest_name || g.name || '',
                guest_count: g.guests_count || g.guest_count || 1,
                status: (g.will_attend == 1 || g.will_attend === true || g.will_attend === '1' || g.will_attend === 'yes') ? 'confirmed' : 'declined',
                time: g.created_at || g.time || '',
                comment: g.comment || ''
            }));
            
            renderGuestsTable(mappedGuests);
            renderWishesList(mappedGuests);
            updateStatsFromGuestsData(mappedGuests);
        } else {
            console.error('Failed to load guests:', result.error);
            const tbody = document.getElementById('guestsTableBody');
            if (tbody) {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Hech qanday mehmon topilmadi</td></tr>';
                resetStatsToZero();
            }
        }
    } catch (error) {
        console.error('Error loading guests:', error);
        const tbody = document.getElementById('guestsTableBody');
        if (tbody) {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Ma\'lumotlarni yuklashda xatolik</td></tr>';
            resetStatsToZero();
        }
    }
}

function renderWishesList(guests) {
    const wishesList = document.getElementById('wishesList');
    if (!wishesList) return;
    if (!guests || guests.length === 0) {
        wishesList.innerHTML = '<p style="color:#fff;text-align:center;">Hozircha tilaklar yo\'q</p>';
        return;
    }
    
    let html = '';
    const wishes = guests.filter(g => g.comment && g.comment.trim() !== '');
    if (wishes.length === 0) {
        wishesList.innerHTML = '<p style="color:#fff;text-align:center;">Hozircha tilaklar yo\'q</p>';
        return;
    }
    
    wishes.forEach(guest => {
        html += `
            <div class="wish-msg">
                <div class="wish-author">${escapeHtml(guest.name)}</div>
                <div class="wish-text">${escapeHtml(guest.comment)}</div>
            </div>
        `;
    });
    
    wishesList.innerHTML = html;
}

function renderGuestsTable(guests) {
    const tbody = document.getElementById('guestsTableBody');
    if (!tbody) return;
    
    if (!guests || guests.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Hech qanday mehmon topilmadi</td></tr>';
        return;
    }
    
    let html = '';
    
    guests.forEach((guest, index) => {
        let statusClass = '';
        let statusText = '';
        
        switch(guest.status) {
            case 'confirmed':
                statusText = 'Tasdiqlangan';
                statusClass = 'status-confirmed';
                break;
            case 'declined':
                statusText = 'Kela olmaydi';
                statusClass = 'status-declined';
                break;
            default:
                statusText = 'Kutilmoqda';
                statusClass = 'status-pending';
        }
        
        const statusBadge = `<span class="status-badge ${statusClass}">${statusText}</span>`;
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${escapeHtml(guest.name)}</strong></td>
                <td>${guest.guest_count}</td>
                <td>${statusBadge}</td>
                <td class="time-cell">${guest.time || '-'}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function updateStatsFromGuestsData(guests) {
    let total = 0;
    let confirmed = 0;
    let declined = 0;
    
    guests.forEach(guest => {
        const count = parseInt(guest.guest_count) || 0;
        total += count;
        
        if (guest.status === 'confirmed') {
            confirmed += count;
        } else if (guest.status === 'declined') {
            declined += count;
        }
    });
    
    const totalEl = document.getElementById('totalGuests');
    const confirmedEl = document.getElementById('confirmedCount');
    const declinedEl = document.getElementById('declinedCount');
    
    if (totalEl) totalEl.textContent = total;
    if (confirmedEl) confirmedEl.textContent = confirmed;
    if (declinedEl) declinedEl.textContent = declined;
}

function resetStatsToZero() {
    const totalEl = document.getElementById('totalGuests');
    const confirmedEl = document.getElementById('confirmedCount');
    const declinedEl = document.getElementById('declinedCount');
    
    if (totalEl) totalEl.textContent = '0';
    if (confirmedEl) confirmedEl.textContent = '0';
    if (declinedEl) declinedEl.textContent = '0';
}

function escapeHtml(str) {
    if (!str) return "вЂ”";
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ========== GUEST SELECTOR ==========
(function() {
    const guestCountSpan = document.querySelector('.guest-count');
    const minusBtn = document.querySelector('.guest-minus');
    const plusBtn = document.querySelector('.guest-plus');
    let count = 1;
    const max = 5;
    const min = 1;

    if (minusBtn && plusBtn && guestCountSpan) {
        minusBtn.addEventListener('click', () => {
            if (count > min) {
                count--;
                guestCountSpan.textContent = count;
            }
        });

        plusBtn.addEventListener('click', () => {
            if (count < max) {
                count++;
                guestCountSpan.textContent = count;
            }
        });
    }
})();

// ========== TIMER ==========
function updateLuxuryTimer() {
    const targetDate = new Date(2026, 8, 5, 13, 0, 0);
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        document.getElementById('days').innerHTML = '0';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (86400000)) / (3600000));
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

updateLuxuryTimer();
setInterval(updateLuxuryTimer, 1000);

// ========== SHARE FUNCTIONALITY ==========
(function() {
    const currentUrl = window.location.href;
    
    const telegramBtn = document.getElementById('telegramShare');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
            window.open(telegramUrl, '_blank', 'noopener,noreferrer');
        });
    }
    
    const whatsappBtn = document.getElementById('whatsappShare');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }
    
    const copyBtn = document.getElementById('copyLinkBtn');
    const copyNote = document.getElementById('copyNote');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(currentUrl);
                copyNote.classList.add('show');
                setTimeout(() => {
                    copyNote.classList.remove('show');
                }, 2500);
            } catch (err) {
                console.error('Nusxa olishda xatolik:', err);
                const textarea = document.createElement('textarea');
                textarea.value = currentUrl;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                copyNote.classList.add('show');
                setTimeout(() => {
                    copyNote.classList.remove('show');
                }, 2500);
            }
        });
    }
})();

// ========== LANGUAGE TRANSLATIONS ==========
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.getAttribute('data-lang');
        
        const translations = {
            ru: { 
                title: 'Р’Р« РџРћР›РЈР§РР›Р РџР РР“Р›РђРЁР•РќРР•', 
                instruction: 'РќР°Р¶РјРёС‚Рµ РЅР° Р·Р°РјРѕРє,', 
                instruction1: 'С‡С‚РѕР±С‹ РѕС‚РєСЂС‹С‚СЊ РїСЂРёРіР»Р°С€РµРЅРёРµ',
                heros1: 'РџСЂРёРіР»Р°С€РµРЅРёРµ РЅР° СЃРІР°РґСЊР±Сѓ',
                heros2: '25 РёСЋР»СЏ 2026 | 17:00',
                herodate: 'Р’Р°С€Рµ РїСЂРёСЃСѓС‚СЃС‚РІРёРµ вЂ” СЃР°РјС‹Р№ РґРѕСЂРѕРіРѕР№ РїРѕРґР°СЂРѕРє РґР»СЏ РЅР°СЃ',
                timerlabel: 'Р’Р Р•РњРЇ Р”Рћ РЎР’РђР”Р¬Р‘Р«',
                unit11: 'РґРЅРµР№',
                unit22: 'С‡Р°СЃРѕРІ',
                unit33: 'РјРёРЅСѓС‚',
                unit44: 'СЃРµРєСѓРЅРґ',
                scroll11: 'Р»РёСЃС‚Р°Р№С‚Рµ РІРЅРёР·',
                tag11: 'Р”РѕСЂРѕРіРёРµ РіРѕСЃС‚Рё!',
                quote11: 'РњС‹ С…РѕС‚РёРј РѕС‚РїСЂР°Р·РґРЅРѕРІР°С‚СЊ СЌС‚РѕС‚ РґРѕСЂРѕРіРѕР№ РґР»СЏ РЅР°СЃ РґРµРЅСЊ РІРјРµСЃС‚Рµ СЃ РІР°РјРё. Р‘СѓРґРµРј РёСЃРєСЂРµРЅРЅРµ СЂР°РґС‹, РµСЃР»Рё РІС‹ СЂР°Р·РґРµР»РёС‚Рµ СЃ РЅР°РјРё РЅР°С€Сѓ СЂР°РґРѕСЃС‚СЊ.',
                cal11: 'РЎР§РРўРђРќРќР«Р• Р”РќР',
                cal22: 'РЎРІР°РґРµР±РЅС‹Р№ РєР°Р»РµРЅРґР°СЂСЊ',
                cal33: 'РР®Р›Р¬ 2026',
                cale1: 'РџРЅ',
                cale2: 'Р’С‚',
                cale3: 'РЎСЂ',
                cale4: 'Р§С‚',
                cale5: 'РџС‚',
                cale6: 'РЎР±',
                cale7: 'Р’СЃ',
                notetext1: 'СЃРµСЂРґС†Рµ вЂ” РґРµРЅСЊ СЃРІР°РґСЊР±С‹',
                detcd1: 'РљСЂР°С‚РєРѕ Рѕ РЅР°С€РµР№ СЃРІР°РґСЊР±Рµ',
                detcd2: 'Р”РµС‚Р°Р»Рё РјРµСЂРѕРїСЂРёСЏС‚РёСЏ',
                detcd3: 'РњРµСЃС‚Рѕ РїСЂРѕРІРµРґРµРЅРёСЏ',
                detcd4: 'Namangan viloyati Pop tumani "Miss Madina Majmuasi" to\'yxonasi',
                detcd5: 'РћС‚РєСЂС‹С‚СЊ РЅР° РєР°СЂС‚Рµ в†’',
                detcd6: 'Р’СЂРµРјСЏ',
                detcd7: '25 РёСЋР»СЏ 2026 РіРѕРґР°, 17:00',
                detcd8: 'Р”РІРµСЂРё РѕС‚РєСЂС‹С‚С‹ СЃ 12:00',
                detcd9: 'Р”СЂРµСЃСЃ-РєРѕРґ',
                detcd10: 'РЎРІРѕР±РѕРґРЅС‹Р№. РџСЂРёС…РѕРґРёС‚Рµ РІ С‚РѕР№ РѕРґРµР¶РґРµ, РІ РєРѕС‚РѕСЂРѕР№ РІР°Рј РєРѕРјС„РѕСЂС‚РЅРѕ Рё РїСЂРёСЏС‚РЅРѕ.',
                detcd11: 'Р¤РѕСЂРјР°С‚',
                detcd12: 'РҐР°Р»СЏР»СЊ. РўРѕСЂР¶РµСЃС‚РІРµРЅРЅРѕРµ РјРµСЂРѕРїСЂРёСЏС‚РёРµ РїСЂРѕРІРѕРґРёС‚СЃСЏ Р±РµР· Р°Р»РєРѕРіРѕР»СЊРЅС‹С… РЅР°РїРёС‚РєРѕРІ',
                detcd13: 'РЎРёРјРІРѕР» СѓРІР°Р¶РµРЅРёСЏ Рё С‡РёСЃС‚РѕС‚С‹',
                detcd14: 'Р’Р°С€Р° СѓР»С‹Р±РєР° вЂ” РЅР°С€Рµ РіР»Р°РІРЅРѕРµ СѓРєСЂР°С€РµРЅРёРµ. Р—Р°СЂР°РЅРµРµ Р±Р»Р°РіРѕРґР°СЂРёРј Р·Р° РІРєР»Р°Рґ РІ СЃРѕР·РґР°РЅРёРµ Р°С‚РјРѕСЃС„РµСЂС‹ СѓРІР°Р¶РµРЅРёСЏ Рё С‚РµРїР»Р°.',
                galler1: 'РђР”Р Р•РЎ Р Р•РЎРўРћР РђРќРђ', 
                galler2: 'Р¤РѕС‚РѕРіСЂР°С„РёРё СЂРµСЃС‚РѕСЂР°РЅР°',
                galler3: 'Р’РЅРµС€РЅРёР№ РІРёРґ', 
                galler4: 'Р РµСЃС‚РѕСЂР°РЅ В«AFROSIYOBВ»',
                galler5: 'Р¤РµСЂРіР°РЅР°, СѓР». РСЃС‚РёРєР»РѕР», 10',
                galler6: 'РРЅС‚РµСЂСЊРµСЂ', 
                galler7: 'Р РѕСЃРєРѕС€РЅС‹Р№ РёРЅС‚РµСЂСЊРµСЂ',
                galler8: 'РЎРІРµС‚Р»С‹Рµ Рё РїСЂРѕСЃС‚РѕСЂРЅС‹Рµ Р·Р°Р»С‹, СѓСЋС‚РЅР°СЏ Р°С‚РјРѕСЃС„РµСЂР° РґР»СЏ РіРѕСЃС‚РµР№',
                locat1: 'Р РђРЎРџРћР›РћР–Р•РќРР• Р РњРђР РЁР РЈРў', 
                locat2: 'РќР°Р№РґРёС‚Рµ РЅР°СЃ',
                locat3: 'Р РµСЃС‚РѕСЂР°РЅ В«AFROSIYOBВ»',
                locat4: 'Р¤РµСЂРіР°РЅР°, СѓР». РСЃС‚РёРєР»РѕР», 10', 
                locat5: 'РЎРѕР·РґР°С‚СЊ РјР°СЂС€СЂСѓС‚', 
                guest11: 'РѕС‚ 1 РґРѕ 5',
                gift11: 'РџРѕРґР°СЂРєРё',
                gift22: 'РџСЂРѕСЃСЊР±С‹ Рє РіРѕСЃС‚СЏРј',
                gift33: 'Р”Р»СЏ РЅР°СЃ СЃР°РјРѕРµ РіР»Р°РІРЅРѕРµ вЂ” РІР°С€Рµ РїСЂРёСЃСѓС‚СЃС‚РІРёРµ СЂСЏРґРѕРј СЃ РЅР°РјРё РІ СЌС‚РѕС‚ СЃРІР°РґРµР±РЅС‹Р№ РІРµС‡РµСЂ. РњС‹ РёСЃРєСЂРµРЅРЅРµ С†РµРЅРёРј РІР°С€Рµ РІРЅРёРјР°РЅРёРµ Рё СѓС‡Р°СЃС‚РёРµ!',
                gift44: 'Р•СЃР»Рё РІС‹ С…РѕС‚РёС‚Рµ РїРѕСЂР°РґРѕРІР°С‚СЊ РЅР°СЃ РµС‰С‘ Р±РѕР»СЊС€Рµ, Р±СѓРґРµРј РѕС‡РµРЅСЊ РїСЂРёР·РЅР°С‚РµР»СЊРЅС‹, РµСЃР»Рё РІС‹ РІС‹СЂР°Р·РёС‚Рµ СЃРІРѕС‘ РІРЅРёРјР°РЅРёРµ Рє РЅР°С€РµР№ РјРѕР»РѕРґРѕР№ СЃРµРјСЊРµ РІ РІРёРґРµ РєРѕРЅРІРµСЂС‚Р°.',
                gift55: 'РЈРІР°Р¶Р°РµРјС‹Рµ РіРѕСЃС‚Рё!',
                gift66: 'РџСЂРѕСЃРёРј РІР°СЃ РЅРµ РґР°СЂРёС‚СЊ РґРµРЅСЊРіРё РІРѕ РІСЂРµРјСЏ С‚Р°РЅС†РµРІ. Р’Р°С€Р° РёСЃРєСЂРµРЅРЅСЏСЏ СѓР»С‹Р±РєР° Рё РґРѕР±СЂС‹Рµ РїРѕР¶РµР»Р°РЅРёСЏ вЂ” СЃР°РјС‹Р№ С†РµРЅРЅС‹Р№ РїРѕРґР°СЂРѕРє РґР»СЏ РЅР°СЃ.',
                gift77: 'Р”Р»СЏ РЅР°С€РµРіРѕ РїСЂР°Р·РґРЅРёРєР° СЃРѕР·РґР°РЅ СЃРїРµС†РёР°Р»СЊРЅС‹Р№ Telegram-РіСЂСѓРїРїР°. РўР°Рј РІС‹ СЃРјРѕР¶РµС‚Рµ РѕР·РЅР°РєРѕРјРёС‚СЊСЃСЏ СЃ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕР№ РёРЅС„РѕСЂРјР°С†РёРµР№, Р° С‚Р°РєР¶Рµ РґРµР»РёС‚СЊСЃСЏ СЂР°РґРѕСЃС‚РЅС‹РјРё РјРѕРјРµРЅС‚Р°РјРё СЃРІР°РґРµР±РЅРѕРіРѕ РґРЅСЏ С‡РµСЂРµР· С„РѕС‚Рѕ Рё РІРёРґРµРѕ.',
                gift88: 'РџРµСЂРµР№С‚Рё РІ Telegram',
                clos11: 'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РЅР° СЃРІР°РґСЊР±Сѓ!',
                clos22: 'Р’С‹СЂР°Р¶Р°РµРј РёСЃРєСЂРµРЅРЅСЋСЋ Р±Р»Р°РіРѕРґР°СЂРЅРѕСЃС‚СЊ Р·Р° С‚Рѕ,',
                clos33: 'С‡С‚Рѕ РІС‹ СЃ РЅР°РјРё РІ СЌС‚РѕС‚ СЃС‡Р°СЃС‚Р»РёРІС‹Р№ РґРµРЅСЊ.',
                clos44: 'РЎ СѓРІР°Р¶РµРЅРёРµРј,',
                share11: 'РџРћР”Р•Р›РРўР•РЎР¬ РџР РР“Р›РђРЁР•РќРР•Рњ',
                share22: 'Р Р°СЃСЃРєР°Р¶РёС‚Рµ СЃРІРѕРёРј РґСЂСѓР·СЊСЏРј',
                share33: 'РџРѕРґРµР»РёС‚РµСЃСЊ РїСЂРёРіР»Р°С€РµРЅРёРµРј СЃ Р±Р»РёР·РєРёРјРё вЂ” РѕРЅРё С‚РѕР¶Рµ РїСЂРёРіР»Р°С€РµРЅС‹ РЅР° РЅР°С€ РїСЂР°Р·РґРЅРёРє!',
                share44: 'РљРѕРїРёСЂРѕРІР°С‚СЊ',
                share55: 'РЎСЃС‹Р»РєР° СЃРєРѕРїРёСЂРѕРІР°РЅР°!',
                date11: '25 РёСЋР»СЏ 2026 | 17:00',
                date22: 'РЎРїР°СЃРёР±Рѕ Р·Р° С‚Рѕ, С‡С‚Рѕ Р±С‹Р»Рё СЃ РЅР°РјРё РІ СЌС‚РѕС‚ СЃР°РјС‹Р№ РїСЂРµРєСЂР°СЃРЅС‹Р№ РґРµРЅСЊ!'
            },
            uz: { 
                title: 'SIZGA TAKLIFNOMA KELDI', 
                instruction: 'Qulfchani bosib,', 
                instruction1: 'taklifnomani oching',
                heros1: 'ToвЂyga taklifnoma',
                heros2: '25-SENTABR 2026 | 17:00',
                herodate: 'Sizning ishtirokingiz вЂ” biz uchun eng qadrli sovgвЂa',
                timerlabel: 'TOвЂYGACHA QOLGAN VAQT',
                unit11: 'kun',
                unit22: 'soat',
                unit33: 'daqiqa',
                unit44: 'soniya',
                scroll11: 'Pastga aylantiring',
                tag11: 'Hurmatli mehmonlar',
                quote11: 'Biz uchun aziz boвЂlgan ushbu kunni siz bilan birga nishonlashni istaymiz. Quvonchimizga sherik boвЂlishingizdan mamnun boвЂlamiz.',
                cal11: 'SANALGAN KUNLAR',
                cal22: 'ToвЂy kalendari',
                cal33: 'SENTABR 2026',
                cale1: 'Du',
                cale2: 'Se',
                cale3: 'Ch',
                cale4: 'Pa',
                cale5: 'Ju',
                cale6: 'Sh',
                cale7: 'Ya',
                notetext1: 'yurak вЂ” toвЂy kuni',
                detcd1: 'ToвЂyimiz haqida qisqacha',
                detcd2: 'Tadbir tafsilotlari',
                detcd3: 'Manzil',
                detcd4: 'Namangan viloyati Pop tumani "Miss Madina Majmuasi" to\'yxonasi',
                detcd5: 'Xaritada ochish в†’',
                detcd6: 'Vaqt',
                detcd7: '2026-yil 5-sentabr, soat 13:00',
                detcd8: 'Eshiklar 12:00 dan ochiq',
                detcd9: 'Kiyinish uslubi',
                detcd10: 'Ixtiyoriy. O\'zingizga qulay va yoqimli libosda tashrif buyurishingiz mumkin.',
                detcd11: 'Format',
                detcd12: 'Halol. Tantanali tadbir alkogolsiz ichimliklarsiz oвЂtkaziladi',
                detcd13: 'Hurmat va poklik ramzi',
                detcd14: 'Sizning tabassumingiz вЂ” bizning eng katta bezakimiz. Hurmat va mehr muhitini yaratishga qoвЂshilgan hissangiz uchun oldindan rahmat.',
                galler1: 'RESTORAN MANZILI', 
                galler2: 'Restoran fotosuratlari',
                galler3: 'Tashqi koвЂrinish', 
                galler4: '"Miss Madina Majmuasi" toвЂyxonasi',
                galler5: 'Namangan viloyati, Pop tumani',
                galler6: 'Ichki makon', 
                galler7: 'Hashamatli ichki makon',
                galler8: 'YorugвЂ va keng zallar, mehmonlar uchun qulay muhit',
                locat1: 'JOYLASHUV VA YOвЂNALISH', 
                locat2: 'Bizni toping',
                locat3: '"Miss Madina Majmuasi" toвЂyxonasi',
                locat4: 'Namangan viloyati, Pop tumani', 
                locat5: 'Marshrut yaratish', 
                guest11: '1 dan 5 gacha',
                gift11: 'SovgвЂalar',
                gift22: 'Mehmonlarga iltimoslar',
                gift33: 'Biz uchun eng muhimi вЂ” sizning toвЂy oqshomida yonimizda boвЂlishingiz. EвЂ™tiboringiz va ishtirokingizni chin qalbdan qadrlaymiz!',
                gift44: 'Agar bizni yanada xursand qilmoqchi boвЂlsangiz, yosh oilamizga koвЂrsatgan eвЂ™tiboringizni konvert shaklida bildirsangiz, bundan benihoya mamnun boвЂlamiz.',
                gift55: 'Hurmatli mehmonlar!',
                gift66: 'Raqs vaqtida pul qistirmasligingizni iltimos qilamiz. Sizning samimiy tabassumingiz va ezgu tilaklaringiz biz uchun eng qimmatli hadyadir.',
                gift77: 'Bayramimiz uchun maxsus Telegram guruhi tashkil etilgan. U yerda qoвЂshimcha maвЂ™lumotlar bilan tanishishingiz hamda toвЂy kunidagi quvonchli lahzalarni foto va videolar orqali ulashishingiz mumkin.',
                gift88: 'Telegramga oвЂtish',
                clos11: 'ToвЂyga xush kelibsiz!',
                clos22: 'Bu baxtli kunda biz bilan birga boвЂlganingiz uchun',
                clos33: 'samimiy minnatdorchilik bildiramiz.',
                clos44: 'Hurmat bilan,',
                share11: 'TAKLIFNOMANI ULASHING',
                share22: 'DoвЂstlaringizga yetkazing',
                share33: 'Taklifnomani yaqinlaringizga ham ulashing вЂ” ular ham bizning bayramimizga taklif qilingan!',
                share44: 'Nusxa olish',
                share55: 'Havola nusxalandi!',
                date11: '25-SENTABR 2026 | 17:00',
                date22: 'Eng goвЂzal kunda biz bilan birga boвЂlganingiz uchun tashakkur!'
            },
            uzk: { 
                title: 'РЎРР—Р“Рђ РўРђРљР›РР¤РќРћРњРђ РљР•Р›Р”Р', 
                instruction: 'ТљСѓР»С„С‡Р°РЅРё Р±РѕСЃРёР±,', 
                instruction1: 'С‚Р°РєР»РёС„РЅРѕРјР°РЅРё РѕС‡РёРЅРі',
                heros1: 'РўСћР№РіР° С‚Р°РєР»РёС„РЅРѕРјР°',
                heros2: '25 РёСЋР»СЊ 2026 | 17:00',
                herodate: 'РЎРёР·РЅРёРЅРі РёС€С‚РёСЂРѕРєРёРЅРіРёР· вЂ” Р±РёР· СѓС‡СѓРЅ СЌРЅРі Т›Р°РґСЂР»Рё СЃРѕРІТ“Р°',
                timerlabel: 'РўРЋР™Р“РђР§Рђ ТљРћР›Р“РђРќ Р’РђТљРў',
                unit11: 'РєСѓРЅ',
                unit22: 'СЃРѕР°С‚',
                unit33: 'РґР°Т›РёТ›Р°',
                unit44: 'СЃРѕРЅРёСЏ',
                scroll11: 'РїР°СЃС‚РіР° Р°Р№Р»Р°РЅС‚РёСЂРёРЅРі',
                tag11: 'ТІСѓСЂРјР°С‚Р»Рё РјРµТіРјРѕРЅР»Р°СЂ!',
                quote11: 'Р‘РёР· СѓС‡СѓРЅ Р°Р·РёР· Р±СћР»РіР°РЅ СѓС€Р±Сѓ РєСѓРЅРЅРё СЃРёР· Р±РёР»Р°РЅ Р±РёСЂРіР° РЅРёС€РѕРЅР»Р°С€РЅРё РёСЃС‚Р°Р№РјРёР·. ТљСѓРІРѕРЅС‡РёРјРёР·РіР° С€РµСЂРёРє Р±СћР»РёС€РёРЅРіРёР·РґР°РЅ РјР°РјРЅСѓРЅ Р±СћР»Р°РјРёР·.',
                cal11: 'РЎРђРќРћТљР›Р РљРЈРќР›РђР ',
                cal22: 'РўСћР№ РєР°Р»РµРЅРґР°СЂРё',
                cal33: 'РР®Р›Р¬ 2026',
                cale1: 'Р”Сѓ',
                cale2: 'РЎРµ',
                cale3: 'Р§Рѕ',
                cale4: 'РџР°',
                cale5: 'Р–Сѓ',
                cale6: 'РЁР°',
                cale7: 'РЇРє',
                notetext1: 'СЋСЂР°Рє вЂ” С‚СћР№ РєСѓРЅРё',
                detcd1: 'РўСћР№РёРјРёР· ТіР°Т›РёРґР° Т›РёСЃТ›Р°С‡Р°',
                detcd2: 'РўР°РґР±РёСЂ С‚Р°С„СЃРёР»РѕС‚Р»Р°СЂРё',
                detcd3: 'РњР°РЅР·РёР»',
                detcd4: 'Namangan viloyati Pop tumani "Miss Madina Majmuasi" to\'yxonasi',
                detcd5: 'РҐР°СЂРёС‚Р°РґР° РѕС‡РёС€ в†’',
                detcd6: 'Р’Р°Т›С‚',
                detcd7: '2026-Р№РёР» 25-РёСЋР»СЊ, СЃРѕР°С‚ 17:00',
                detcd8: 'Р­С€РёРєР»Р°СЂ 12:00 РґР°РЅ РѕС‡РёТ›',
                detcd9: 'РљРёР№РёРЅРёС€ СѓСЃР»СѓР±Рё',
                detcd10: 'РС…С‚РёС‘СЂРёР№. РЋР·РёРЅРіРёР·РіР° Т›СѓР»Р°Р№ РІР° С‘Т›РёРјР»Рё Р»РёР±РѕСЃРґР° С‚Р°С€СЂРёС„ Р±СѓСЋСЂРёС€РёРЅРіРёР· РјСѓРјРєРёРЅ.',
                detcd11: 'Р¤РѕСЂРјР°С‚',
                detcd12: 'ТІР°Р»РѕР». РўР°РЅС‚Р°РЅР°Р»Рё С‚Р°РґР±РёСЂ Р°Р»РєРѕРіРѕР»СЃРёР· СћС‚РєР°Р·РёР»Р°РґРё',
                detcd13: 'ТІСѓСЂРјР°С‚ РІР° РїРѕРєР»РёРє СЂР°РјР·Рё',
                detcd14: 'РЎРёР·РЅРёРЅРі С‚Р°Р±Р°СЃСЃСѓРјРёРЅРіРёР· вЂ” Р±РёР·РЅРёРЅРі СЌРЅРі РєР°С‚С‚Р° Р±РµР·Р°РіРёРјРёР·. ТІСѓСЂРјР°С‚ РІР° РјРµТіСЂ РјСѓТіРёС‚РёРЅРё СЏСЂР°С‚РёС€РіР° Т›СћС€РіР°РЅ ТіРёСЃСЃР°РЅРіРёР· СѓС‡СѓРЅ РѕР»РґРёРЅРґР°РЅ СЂР°ТіРјР°С‚.',
                galler1: 'Р Р•РЎРўРћР РђРќ РњРђРќР—РР›Р', 
                galler2: 'Р РµСЃС‚РѕСЂР°РЅ С„РѕС‚РѕСЃСѓСЂР°С‚Р»Р°СЂРё',
                galler3: 'РўР°С€Т›Рё РєСћСЂРёРЅРёС€', 
                galler4: '"Miss Madina Majmuasi" С‚СћР№С…РѕРЅР°СЃРё',
                galler5: 'РќР°РјР°РЅРіР°РЅ РІРёР»РѕСЏС‚Рё, РџРѕРї С‚СѓРјР°РЅРё',
                galler6: 'РС‡РєРё РјР°РєРѕРЅ', 
                galler7: 'ТІР°С€Р°РјР°С‚Р»Рё РёС‡РєРё РјР°РєРѕРЅ',
                galler8: 'РЃСЂСѓТ“ РІР° РєРµРЅРі Р·Р°Р»Р»Р°СЂ, РјРµТіРјРѕРЅР»Р°СЂ СѓС‡СѓРЅ Т›СѓР»Р°Р№ РјСѓТіРёС‚',
                locat1: 'Р–РћР™Р›РђРЁРЈР’ Р’Рђ Р™РЋРќРђР›РРЁ', 
                locat2: 'Р‘РёР·РЅРё С‚РѕРїРёРЅРі',
                locat3: '"Miss Madina Majmuasi" С‚СћР№С…РѕРЅР°СЃРё',
                locat4: 'РќР°РјР°РЅРіР°РЅ РІРёР»РѕСЏС‚Рё, РџРѕРї С‚СѓРјР°РЅРё', 
                locat5: 'РњР°СЂС€СЂСѓС‚ СЏСЂР°С‚РёС€', 
                guest11: '1 РґР°РЅ 5 РіР°С‡Р°',
                gift11: 'РЎРѕРІТ“Р°Р»Р°СЂ',
                gift22: 'РњРµТіРјРѕРЅР»Р°СЂРіР° РёР»С‚РёРјРѕСЃР»Р°СЂ',
                gift33: 'Р‘РёР· СѓС‡СѓРЅ СЌРЅРі РјСѓТіРёРјРё вЂ” СЃРёР·РЅРёРЅРі С‚СћР№ РѕТ›С€РѕРјРёРґР° С‘РЅРёРјРёР·РґР° Р±СћР»РёС€РёРЅРіРёР·. Р­СЉС‚РёР±РѕСЂРёРЅРіРёР· РІР° РёС€С‚РёСЂРѕРєРёРЅРіРёР·РЅРё С‡РёРЅ Т›Р°Р»Р±РґР°РЅ Т›Р°РґСЂР»Р°Р№РјРёР·!',
                gift44: 'РђРіР°СЂ Р±РёР·РЅРё СЏРЅР°РґР° С…СѓСЂСЃР°РЅРґ Т›РёР»РјРѕТ›С‡Рё Р±СћР»СЃР°РЅРіРёР·, С‘С€ РѕРёР»Р°РјРёР·РіР° РєСћСЂСЃР°С‚РіР°РЅ СЌСЉС‚РёР±РѕСЂРёРЅРіРёР·РЅРё РєРѕРЅРІРµСЂС‚ С€Р°РєР»РёРґР° Р±РёР»РґРёСЂСЃР°РЅРіРёР·, Р±СѓРЅРґР°РЅ Р±РµТіР°Рґ РјР°РјРЅСѓРЅ Р±СћР»Р°РјРёР·.',
                gift55: 'ТІСѓСЂРјР°С‚Р»Рё РјРµТіРјРѕРЅР»Р°СЂ!',
                gift66: 'Р Р°Т›СЃ РІР°Т›С‚РёРґР° РїСѓР» Т›РёСЃС‚РёСЂРјР°СЃР»РёРіРёРЅРіРёР·РЅРё РёР»С‚РёРјРѕСЃ Т›РёР»Р°РјРёР·. РЎРёР·РЅРёРЅРі СЃР°РјРёРјРёР№ С‚Р°Р±Р°СЃСЃСѓРјРёРЅРіРёР· РІР° СЌР·РіСѓ С‚РёР»Р°РєР»Р°СЂРёРЅРіРёР· Р±РёР· СѓС‡СѓРЅ СЌРЅРі Т›РёРјРјР°С‚Р»Рё ТіР°РґСЏРґРёСЂ.',
                gift77: 'Р‘Р°Р№СЂР°РјРёРјРёР· СѓС‡СѓРЅ РјР°С…СЃСѓСЃ Telegram РіСѓСЂСѓТіРё С‚Р°С€РєРёР» СЌС‚РёР»РіР°РЅ. РЈ РµСЂРґР° Т›СћС€РёРјС‡Р° РјР°СЉР»СѓРјРѕС‚Р»Р°СЂ Р±РёР»Р°РЅ С‚Р°РЅРёС€РёС€РёРЅРіРёР· ТіР°РјРґР° С‚СћР№ РєСѓРЅРёРґР°РіРё Т›СѓРІРѕРЅС‡Р»Рё Р»Р°ТіР·Р°Р»Р°СЂРЅРё С„РѕС‚Рѕ РІР° РІРёРґРµРѕР»Р°СЂ РѕСЂТ›Р°Р»Рё СѓР»Р°С€РёС€РёРЅРіРёР· РјСѓРјРєРёРЅ.',
                gift88: 'TelegramРіР° СћС‚РёС€',
                clos11: 'РўСћР№РіР° С…СѓС€ РєРµР»РёР±СЃРёР·!',
                clos22: 'Р‘Сѓ Р±Р°С…С‚Р»Рё РєСѓРЅРґР° Р±РёР· Р±РёР»Р°РЅ Р±РёСЂРіР° Р±СћР»РіР°РЅРёРЅРіРёР· СѓС‡СѓРЅ',
                clos33: 'СЃР°РјРёРјРёР№ РјРёРЅРЅР°С‚РґРѕСЂС‡РёР»РёРє Р±РёР»РґРёСЂР°РјРёР·.',
                clos44: 'ТІСѓСЂРјР°С‚ Р±РёР»Р°РЅ,',
                share11: 'РўРђРљР›РР¤РќРћРњРђРќР РЈР›РђРЁРРќР“',
                share22: 'Р”СћСЃС‚Р»Р°СЂРёРЅРіРёР·РіР° РµС‚РєР°Р·РёРЅРі',
                share33: 'РўР°РєР»РёС„РЅРѕРјР°РЅРё СЏТ›РёРЅР»Р°СЂРёРЅРіРёР·РіР° ТіР°Рј СѓР»Р°С€РёРЅРі вЂ” СѓР»Р°СЂ ТіР°Рј Р±РёР·РЅРёРЅРі Р±Р°Р№СЂР°РјРёРјРёР·РіР° С‚Р°РєР»РёС„ Т›РёР»РёРЅРіР°РЅ!',
                share44: 'РќСѓСЃС…Р° РѕР»РёС€',
                share55: 'ТІР°РІРѕР»Р° РЅСѓСЃС…Р°Р»Р°РЅРґРё!',
                date11: '25 РёСЋР»СЊ 2026 | 17:00',
                date22: 'Р­РЅРі РіСћР·Р°Р» РєСѓРЅРґР° Р±РёР· Р±РёР»Р°РЅ Р±РёСЂРіР° Р±СћР»РіР°РЅРёРЅРіРёР· СѓС‡СѓРЅ С‚Р°С€Р°РєРєСѓСЂ!'
            },
            en: { 
                title: 'YOU HAVE RECEIVED AN INVITATION', 
                instruction: 'Click the lock', 
                instruction1: 'to open the invitation',
                heros1: 'Wedding Invitation',
                heros2: 'July 25, 2026 | 17:00',
                herodate: 'Your presence is the most precious gift to us',
                timerlabel: 'TIME REMAINING UNTIL THE WEDDING',
                unit11: 'days',
                unit22: 'hours',
                unit33: 'minutes',
                unit44: 'seconds',
                scroll11: 'scroll down',
                tag11: 'Dear Guests',
                quote11: 'We wish to celebrate this day, which is so dear to us, together with you. We would be delighted to have you share in our joy.',
                cal11: 'COUNTING DAYS',
                cal22: 'Wedding Calendar',
                cal33: 'SEPTEMBER 2026',
                cale1: 'Mon',
                cale2: 'Tue',
                cale3: 'Wed',
                cale4: 'Thu',
                cale5: 'Fri',
                cale6: 'Sat',
                cale7: 'Sun',
                notetext1: 'heart вЂ” wedding day',
                detcd1: 'About Our Wedding',
                detcd2: 'Event Details',
                detcd3: 'Location',
                detcd4: 'Namangan viloyati Pop tumani "Miss Madina Majmuasi" to\'yxonasi',
                detcd5: 'Open on map в†’',
                detcd6: 'Time',
                detcd7: 'July 25, 2026, 17:00',
                detcd8: 'Doors open from 12:00',
                detcd9: 'Dress Code',
                detcd10: 'Optional. Please come in whatever clothing you feel most comfortable in.',
                detcd11: 'Format',
                detcd12: 'Halal. The event will be held without alcoholic beverages',
                detcd13: 'Symbol of Respect and Purity',
                detcd14: 'Your smile is our greatest decoration. Thank you in advance for contributing to an atmosphere of respect and warmth.',
                galler1: 'RESTAURANT ADDRESS', 
                galler2: 'Restaurant photos',
                galler3: 'Exterior', 
                galler4: '"Miss Madina Majmuasi" restaurant',
                galler5: 'Namangan region, Pop district',
                galler6: 'Interior', 
                galler7: 'Luxurious interior',
                galler8: 'Bright and spacious halls, comfortable atmosphere for guests',
                locat1: 'LOCATION AND DIRECTIONS', 
                locat2: 'Find us',
                locat3: '"Miss Madina Majmuasi" restaurant',
                locat4: 'Namangan region, Pop district', 
                locat5: 'Get directions', 
                guest11: 'from 1 to 5',
                gift11: 'Gifts',
                gift22: 'Requests to Guests',
                gift33: 'The most important thing for us is your presence by our side on this special wedding evening. We truly appreciate your attention and participation!',
                gift44: 'If you would like to make us even happier, we would be sincerely grateful if you present your gift to our young family in the form of an envelope.',
                gift55: 'Dear guests!',
                gift66: 'We kindly ask you not to give money during the dances. Your sincere smiles and warm wishes are the most valuable gift for us.',
                gift77: 'A special Telegram group has been created for our celebration. There you can find additional information and share joyful moments from the wedding day through photos and videos.',
                gift88: 'Go to Telegram',
                clos11: 'Welcome to the wedding!',
                clos22: 'We express our sincere gratitude for',
                clos33: 'being with us on this happy day.',
                clos44: 'Sincerely,',
                share11: 'SHARE THE INVITATION',
                share22: 'Tell your friends',
                share33: 'Share the invitation with your loved ones вЂ” they are also invited to our celebration!',
                share44: 'Copy',
                share55: 'Link copied!',
                date11: 'July 25, 2026 | 17:00',
                date22: 'Thank you for being with us on this most beautiful day!'
            }
        };
        
        if (translations[lang]) {
            const t = translations[lang];
            document.querySelector('.unlock-title').textContent = t.title;
            document.querySelector('.unlock-instruction').textContent = t.instruction;
            document.querySelector('.unlock1-instruction1').textContent = t.instruction1;
            document.querySelector('.heros1').textContent = t.heros1;
            document.querySelector('.heros2').textContent = t.heros2;
            document.querySelector('.hero-date').textContent = t.herodate;
            document.querySelector('.timer-label').textContent = t.timerlabel;
            document.querySelector('.unit11').textContent = t.unit11;
            document.querySelector('.unit22').textContent = t.unit22;
            document.querySelector('.unit33').textContent = t.unit33;
            document.querySelector('.unit44').textContent = t.unit44;
            document.querySelector('.scroll11').textContent = t.scroll11;
            document.querySelector('.tag11').textContent = t.tag11;
            document.querySelector('.quote11').textContent = t.quote11;
            document.querySelector('.cal11').textContent = t.cal11;
            document.querySelector('.cal22').textContent = t.cal22;
            document.querySelector('.cal33').textContent = t.cal33;
            document.querySelector('.cale1').textContent = t.cale1;
            document.querySelector('.cale2').textContent = t.cale2;
            document.querySelector('.cale3').textContent = t.cale3;
            document.querySelector('.cale4').textContent = t.cale4;
            document.querySelector('.cale5').textContent = t.cale5;
            document.querySelector('.cale6').textContent = t.cale6;
            document.querySelector('.cale7').textContent = t.cale7;
            document.querySelector('.notetext1').textContent = t.notetext1;
            document.querySelector('.detcd1').textContent = t.detcd1;
            document.querySelector('.detcd2').textContent = t.detcd2;
            document.querySelector('.detcd3').textContent = t.detcd3;
            document.querySelector('.detcd4').textContent = t.detcd4;
            document.querySelector('.detcd5').textContent = t.detcd5;
            document.querySelector('.detcd6').textContent = t.detcd6;
            document.querySelector('.detcd7').textContent = t.detcd7;
            document.querySelector('.detcd8').textContent = t.detcd8;
            document.querySelector('.detcd9').textContent = t.detcd9;
            document.querySelector('.detcd10').textContent = t.detcd10;
            document.querySelector('.detcd11').textContent = t.detcd11;
            document.querySelector('.detcd12').textContent = t.detcd12;
            document.querySelector('.detcd13').textContent = t.detcd13;
            document.querySelector('.detcd14').textContent = t.detcd14;
            document.querySelector('.galler1').textContent = t.galler1;
            document.querySelector('.galler2').textContent = t.galler2;
            document.querySelector('.galler3').textContent = t.galler3;
            document.querySelector('.galler4').textContent = t.galler4;
            document.querySelector('.galler5').textContent = t.galler5;
            document.querySelector('.galler6').textContent = t.galler6;
            document.querySelector('.galler7').textContent = t.galler7;
            document.querySelector('.galler8').textContent = t.galler8;
            document.querySelector('.locat1').textContent = t.locat1;
            document.querySelector('.locat2').textContent = t.locat2;
            document.querySelector('.locat3').textContent = t.locat3;
            document.querySelector('.locat4').textContent = t.locat4;
            document.querySelector('.locat5').textContent = t.locat5;
            document.querySelector('.guest11').textContent = t.guest11;
            document.querySelector('.gift11').textContent = t.gift11;
            document.querySelector('.gift22').textContent = t.gift22;
            document.querySelector('.gift33').textContent = t.gift33;
            document.querySelector('.gift44').textContent = t.gift44;
            document.querySelector('.gift55').textContent = t.gift55;
            document.querySelector('.gift66').textContent = t.gift66;
            document.querySelector('.gift77').textContent = t.gift77;
            document.querySelector('.gift88').textContent = t.gift88;
            document.querySelector('.clos11').textContent = t.clos11;
            document.querySelector('.clos22').textContent = t.clos22;
            document.querySelector('.clos33').textContent = t.clos33;
            document.querySelector('.clos44').textContent = t.clos44;
            document.querySelector('.share11').textContent = t.share11;
            document.querySelector('.share22').textContent = t.share22;
            document.querySelector('.share33').textContent = t.share33;
            document.querySelector('.share44').textContent = t.share44;
            document.querySelector('.share55').textContent = t.share55;
            document.querySelector('.date11').textContent = t.date11;
            document.querySelector('.date22').textContent = t.date22;
        }
        translateRsvpSection(lang);
    });
});

document.querySelector('.lang-btn[data-lang="uz"]').classList.add('active');

function translateRsvpSection(lang) {
    const translations = {
        ru: {
            tag: 'РџРћР”РўР’Р•Р Р”РРўР• РЎР’РћР• РџР РРЎРЈРўРЎРўР’РР•',
            title: 'Р‘СѓРґСЊС‚Рµ СЃ РЅР°РјРё',
            nameLabel: 'РРјСЏ РіРѕСЃС‚СЏ',
            namePlaceholder: 'Р’РІРµРґРёС‚Рµ РІР°С€Рµ РёРјСЏ',
            guestsLabel: 'РљРѕР»РёС‡РµСЃС‚РІРѕ РіРѕСЃС‚РµР№',
            attendanceLabel: 'Р’С‹ РїСЂРёРґРµС‚Рµ РЅР° СЃРІР°РґСЊР±Сѓ?',
            attendanceYes: 'Р”Р°, СЃ СѓРґРѕРІРѕР»СЊСЃС‚РІРёРµРј',
            attendanceNo: 'Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, РЅРµ СЃРјРѕРіСѓ РїСЂРёР№С‚Рё',
            commentLabel: 'Ваши пожелания',
            commentPlaceholder: 'Ваши пожелания',
            submitBtn: 'РћС‚РїСЂР°РІРёС‚СЊ',
            noteText: 'РћР±СЏР·Р°С‚РµР»СЊРЅС‹Рµ РїРѕР»СЏ',
            toastMessage: 'РЎРїР°СЃРёР±Рѕ! Р’Р°С€ РѕС‚РІРµС‚ СѓСЃРїРµС€РЅРѕ СЃРѕС…СЂР°РЅРµРЅ'
        },
        uz: {
            tag: 'ISHTIROKINGIZNI TASDIQLANG',
            title: 'Biz bilan boвЂling',
            nameLabel: 'Mehmon ismi',
            namePlaceholder: 'Ismingizni kiriting',
            guestsLabel: 'Mehmonlar soni',
            attendanceLabel: "To'yga kelasizmi?",
            attendanceYes: 'Ha, mamnuniyat bilan',
            attendanceNo: 'Afsuski, kela olmayman',
            commentLabel: 'Tilak so\'zlaringiz',
            commentPlaceholder: 'Sizning tilaklaringiz',
            submitBtn: 'Yuborish',
            noteText: 'Majburiy maydonlar',
            toastMessage: 'Rahmat! Javobingiz muvaffaqiyatli saqlandi'
        },
        uzk: {
            tag: 'РРЁРўРР РћРљРРќР“РР—РќР РўРђРЎР”РТљР›РђРќР“',
            title: 'Р‘РёР· Р±РёР»Р°РЅ Р±СћР»РёРЅРі',
            nameLabel: 'РњРµТіРјРѕРЅ РёСЃРјРё',
            namePlaceholder: 'РСЃРјРёРЅРіРёР·РЅРё РєРёСЂРёС‚РёРЅРі',
            guestsLabel: 'РњРµТіРјРѕРЅР»Р°СЂ СЃРѕРЅРё',
            attendanceLabel: "РўСћР№РіР° РєРµР»Р°СЃРёР·РјРё?",
            attendanceYes: 'ТІР°, РјР°РјРЅСѓРЅРёСЏС‚ Р±РёР»Р°РЅ',
            attendanceNo: 'РђС„СЃСѓСЃРєРё, РєРµР»Р° РѕР»РјР°Р№РјР°РЅ',
            commentLabel: 'Тилак сўзларингиз',
            commentPlaceholder: 'Сизнинг тилакларингиз',
            submitBtn: 'Р®Р±РѕСЂРёС€',
            noteText: 'РњР°Р¶Р±СѓСЂРёР№ РјР°Р№РґРѕРЅР»Р°СЂ',
            toastMessage: 'Р Р°ТіРјР°С‚! Р–Р°РІРѕР±РёРЅРіРёР· РјСѓРІР°С„С„Р°Т›РёСЏС‚Р»Рё СЃР°Т›Р»Р°РЅРґРё'
        },
        en: {
            tag: 'CONFIRM YOUR ATTENDANCE',
            title: 'Be with us',
            nameLabel: 'Guest name',
            namePlaceholder: 'Enter your name',
            guestsLabel: 'Number of guests',
            attendanceLabel: 'Will you attend the wedding?',
            attendanceYes: 'Yes, with pleasure',
            attendanceNo: 'Unfortunately, I cannot come',
            commentLabel: 'Your wishes',
            commentPlaceholder: 'Your wishes',
            submitBtn: 'Submit',
            noteText: 'Required fields',
            toastMessage: 'Thank you! Your response has been successfully saved'
        }
    };

    const t = translations[lang] || translations.uz;
    const rsvpSection = document.querySelector('.rsvp-section');
    if (!rsvpSection) return;

    const tag = rsvpSection.querySelector('.tag');
    if (tag) tag.textContent = t.tag;

    const title = rsvpSection.querySelector('.sec-title');
    if (title) title.innerHTML = t.title;

    const formLabels = rsvpSection.querySelectorAll('.form-label .label-text');
    if (formLabels[0]) formLabels[0].textContent = t.nameLabel;
    if (formLabels[1]) formLabels[1].textContent = t.guestsLabel;
    if (formLabels[2]) formLabels[2].textContent = t.attendanceLabel;
    if (formLabels[3]) formLabels[3].textContent = t.commentLabel;

    const nameInput = rsvpSection.querySelector('.form-input');
    if (nameInput) nameInput.placeholder = t.namePlaceholder;

    const textarea = rsvpSection.querySelector('.form-textarea');
    if (textarea) textarea.placeholder = t.commentPlaceholder;

    const radioTexts = rsvpSection.querySelectorAll('.radio-text');
    if (radioTexts[0]) radioTexts[0].textContent = t.attendanceYes;
    if (radioTexts[1]) radioTexts[1].textContent = t.attendanceNo;

    const submitBtn = rsvpSection.querySelector('.submit-btn .btn-text');
    if (submitBtn) submitBtn.textContent = t.submitBtn;

    const noteText = rsvpSection.querySelector('.form-note .note-text');
    if (noteText) noteText.textContent = t.noteText;

    const toastSpan = document.querySelector('#toastMessage span');
    if (toastSpan) toastSpan.textContent = t.toastMessage;
}

// ========== AJAX FORM SUBMISSION ==========
(function() {
    const form = document.getElementById('rsvpForm');
    const toast = document.getElementById('toastMessage');
    
    function getFormData() {
        const nameInput = form.querySelector('.form-input');
        const guestCountSpan = document.querySelector('.guest-count');
        const attendanceRadio = form.querySelector('input[name="attendance"]:checked');
        const textarea = form.querySelector('.form-textarea');
        
        return {
            name: nameInput ? nameInput.value.trim() : '',
            guestName: nameInput ? nameInput.value.trim() : '',
            guestCount: guestCountSpan ? parseInt(guestCountSpan.textContent) : 1,
            numberOfGuests: guestCountSpan ? parseInt(guestCountSpan.textContent) : 1,
            attendance: attendanceRadio ? attendanceRadio.value : 'yes',
            willAttend: attendanceRadio ? (attendanceRadio.value === 'yes') : true,
            comment: textarea ? textarea.value.trim() : ''
        };
    }
    
    function resetForm() {
        const nameInput = form.querySelector('.form-input');
        const guestCountSpan = document.querySelector('.guest-count');
        const textarea = form.querySelector('.form-textarea');
        const yesRadio = form.querySelector('input[value="yes"]');
        
        if (nameInput) nameInput.value = '';
        if (guestCountSpan) guestCountSpan.textContent = '1';
        if (textarea) textarea.value = '';
        if (yesRadio) yesRadio.checked = true;
        
        const minusBtn = document.querySelector('.guest-minus');
        const plusBtn = document.querySelector('.guest-plus');
        if (window.guestCounter) window.guestCounter = 1;
    }
    
    function showToast(message) {
        if (!toast) return;
        
        const toastSpan = toast.querySelector('span');
        if (toastSpan && message) {
            toastSpan.textContent = message;
        }
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
    
    function validateForm(data) {
        if (!data.name) {
            const nameInput = form.querySelector('.form-input');
            if (nameInput) {
                nameInput.style.borderColor = '#363636';
                nameInput.focus();
            }
            return false;
        }
        return true;
    }
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = getFormData();
            
            if (!validateForm(formData)) {
                return;
            }
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn?.querySelector('.btn-text')?.textContent || 'Yuborish';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                const btnText = submitBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = 'Yuborilmoqda...';
            }
            
            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    await loadGuestsFromDB();
                    resetForm();
                    showToast();
                } else {
                    console.error('Server error:', result.error);
                    showToast('Xatolik yuz berdi. Iltimos, qaytadan urinib koвЂring.');
                }
            } catch (error) {
                console.error('Network error:', error);
                showToast('Tarmoq xatosi. Iltimos, internet aloqangizni tekshiring.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector('.btn-text');
                    if (btnText) btnText.textContent = originalBtnText;
                }
            }
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const footerTrigger = document.querySelector('.footer-names');
    const guestSection = document.getElementById('guests123');
    
    let clickCount = 0;
    let lastClickTime = 0;

    const PASSWORD = "1234"; // в†ђ Р·Р°РґР°Р№ СЃРІРѕР№ РїР°СЂРѕР»СЊ

    if (footerTrigger && guestSection) {
        footerTrigger.addEventListener('click', () => {
            const currentTime = new Date().getTime();
            
            if (currentTime - lastClickTime > 1500) {
                clickCount = 0;
            }
            
            clickCount++;
            lastClickTime = currentTime;

            if (clickCount === 3) {
                
                const userPassword = prompt("Parolni kiriting:");

                if (userPassword === PASSWORD) {
                    // РїРµСЂРµРєР»СЋС‡РµРЅРёРµ РІРёРґРёРјРѕСЃС‚Рё
                    if (guestSection.style.display === 'block') {
                        guestSection.style.display = 'none';
                    } else {
                        guestSection.style.display = 'block';
                    }
                } else {
                    alert("Parol notoвЂgвЂri вќЊ");
                }

                clickCount = 0;
            }
        });
    }
});













// ========== COUPLE SLIDER ==========
(function() {
    const track = document.getElementById('sliderTrack');
    const slider = document.getElementById('coupleSlider');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    if (!track || !slider) return;

    let currentIndex = 0;
    const slidesCount = 2; // We have 2 images
    let startX = 0;
    let endX = 0;
    let intervalId;

    function showSlide(index) {
        if (index < 0) index = slidesCount - 1;
        if (index >= slidesCount) index = 0;
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        intervalId = setInterval(nextSlide, 3000); // 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    slider.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, {passive: true});

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        if (startX - endX > 30) {
            nextSlide(); // swiped left
        } else if (endX - startX > 30) {
            prevSlide(); // swiped right
        }
        startAutoSlide();
    }, {passive: true});

    startAutoSlide();
})();

