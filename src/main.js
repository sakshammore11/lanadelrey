import { albums, MOODS, moodQuotes } from './data.js';

// ==========================================
// DOM ELEMENTS
// ==========================================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const scrollProgress = document.getElementById('scroll-progress');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

const albumsContainer = document.getElementById('albums-container');
const ambientGlow = document.getElementById('ambient-glow');
const searchInput = document.getElementById('search-input');
const searchSection = document.getElementById('search-section');
const searchResultCount = document.getElementById('search-result-count');

const moodPillsContainer = document.getElementById('mood-pills');
const moodStatsContainer = document.getElementById('mood-stats');
const activeMoodBanner = document.getElementById('active-mood-banner');
const bannerEmoji = document.getElementById('banner-emoji');
const bannerMood = document.getElementById('banner-mood');
const bannerCount = document.getElementById('banner-count');
const clearMoodFilterBtn = document.getElementById('clear-mood-filter');
const moodTypewriter = document.getElementById('mood-typewriter');

// Song Drawer Elements
const songDrawer = document.getElementById('song-drawer');
const drawerHandle = document.getElementById('drawer-handle');
const drawerCloseBtn = document.getElementById('close-drawer');
const drawerMoodBadge = document.getElementById('drawer-mood-badge');
const drawerSongTitle = document.getElementById('drawer-song-title');
const drawerAlbumName = document.getElementById('drawer-album-name');
const drawerMoodQuote = document.getElementById('drawer-mood-quote');
const drawerSpotifyBtn = document.getElementById('drawer-spotify-link');
const drawerYoutubeBtn = document.getElementById('drawer-youtube-link');
const drawerCopyBtn = document.getElementById('drawer-copy-btn');

// Mixer Elements
const mixerTrigger = document.getElementById('mixer-trigger');
const mixerModal = document.getElementById('mixer-modal');
const closeMixer = document.getElementById('close-mixer');
const mixerContent = document.getElementById('mixer-content');
const mixerMoodEl = document.getElementById('mixer-mood');
const mixerMoodDescEl = document.getElementById('mixer-mood-desc');
const mixerSongEl = document.getElementById('mixer-song');
const mixerAlbumEl = document.getElementById('mixer-album');
const mixerCard = document.getElementById('mixer-card');
const mixerShuffleBtn = document.getElementById('mixer-shuffle-btn');

// Stats Elements
const heroSongCount = document.getElementById('hero-song-count');

// State
let currentMoodFilter = null;
let currentSearchQuery = '';
let allSongsList = [];

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
  buildGlobalSongList();
  animateHeroStats();
  initCustomCursor();
  initScrollProgress();
  createParticles();
  renderMoodSelector();
  renderAlbums();
  initTypewriter();
  setupIntersectionObservers();
}

// Build flat array of all songs with metadata
function buildGlobalSongList() {
  albums.forEach(album => {
    album.songs.forEach(songObj => {
      allSongsList.push({
        title: songObj.title,
        mood: songObj.mood,
        album: album.title,
        year: album.year,
        albumColor: album.theme.color,
        albumGlow: album.theme.glow
      });
    });
  });
}

// Animate Hero Song Count
function animateHeroStats() {
  const target = allSongsList.length;
  let current = 0;
  const duration = 2000;
  const stepTime = Math.abs(Math.floor(duration / target));
  
  const timer = setInterval(() => {
    current += 1;
    heroSongCount.textContent = current;
    if (current === target) {
      clearInterval(timer);
    }
  }, stepTime);
}

// ==========================================
// CUSTOM CURSOR & SCROLL
// ==========================================
function initCustomCursor() {
  if (window.innerWidth < 768) return; // Disable on mobile
  
  // Make cursor visible first
  cursorDot.style.opacity = '1';
  cursorRing.style.opacity = '1';

  window.addEventListener('mousemove', (e) => {
    // Update cursor position directly without translate
    cursorDot.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    cursorRing.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
  });

  // Hover states for the ring
  const interactables = document.querySelectorAll('button, a, .song-card, .mood-pill');
  
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('hover');
    });
  });

  // Magnetic Buttons effect
  const magneticEls = document.querySelectorAll('.magnetic-btn');
  magneticEls.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;
  });
}

// ==========================================
// UI / PARTICLES / TOAST
// ==========================================
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${Math.random() * 4 + 3}s`;
    container.appendChild(particle);
  }
}

let toastTimeout;
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('opacity-0', '-translate-y-16');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-16');
  }, 3000);
}

// Create a ripple effect on click
function createRipple(event, element) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
  const words = ['mood?', 'vibe?', 'aesthetic?', 'feeling?'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      moodTypewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      moodTypewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before new word
    }
    setTimeout(type, typeSpeed);
  }
  
  setTimeout(type, 1000);
}

// ==========================================
// MOOD SELECTOR & STATS
// ==========================================
function renderMoodSelector() {
  moodPillsContainer.innerHTML = '';
  moodStatsContainer.innerHTML = '';
  
  // Create 'All' pill
  const allPill = document.createElement('button');
  allPill.className = `mood-pill ${!currentMoodFilter ? 'active' : ''}`;
  allPill.innerHTML = `All Universe <span class="mood-pill-count">${allSongsList.length}</span>`;
  allPill.addEventListener('click', () => setMoodFilter(null));
  moodPillsContainer.appendChild(allPill);

  Object.entries(MOODS).forEach(([moodKey, moodData]) => {
    // Count songs in this mood
    const count = allSongsList.filter(s => s.mood === moodKey).length;
    const percentage = Math.round((count / allSongsList.length) * 100);
    
    // Create Pill
    const pill = document.createElement('button');
    pill.className = `mood-pill ${currentMoodFilter === moodKey ? 'active' : ''}`;
    pill.innerHTML = `<span class="mr-1">${moodData.emoji}</span> ${moodData.label} <span class="mood-pill-count">${count}</span>`;
    
    // Add hover color effect
    pill.addEventListener('mouseenter', () => {
      document.documentElement.style.setProperty('--mood-color', moodData.color);
      document.documentElement.style.setProperty('--mood-glow', moodData.glow);
    });
    
    pill.addEventListener('click', () => setMoodFilter(moodKey));
    moodPillsContainer.appendChild(pill);
    
    // Create Stat Bar
    const statItem = document.createElement('div');
    statItem.className = 'bg-white/[0.02] border border-white/5 p-4 rounded-xl backdrop-blur-sm';
    statItem.innerHTML = `
      <div class="flex justify-between items-end mb-2">
        <div class="flex items-center gap-2">
          <span class="text-lg">${moodData.emoji}</span>
          <span class="font-inter text-xs tracking-widest uppercase text-white/60">${moodData.label}</span>
        </div>
        <span class="font-playfair text-xl font-bold">${count}</span>
      </div>
      <div class="mood-stat-bar">
        <div class="mood-stat-bar-fill" style="width: 0%; background: ${moodData.gradient}"></div>
      </div>
    `;
    
    // Delay width for animation
    setTimeout(() => {
      const fill = statItem.querySelector('.mood-stat-bar-fill');
      if (fill) fill.style.width = `${percentage}%`;
    }, 500);

    moodStatsContainer.appendChild(statItem);
  });
  
  // Trigger stagger animation
  setTimeout(() => {
    moodPillsContainer.classList.add('revealed');
    moodStatsContainer.classList.add('revealed');
  }, 100);
}

function setMoodFilter(moodKey) {
  currentMoodFilter = moodKey;
  
  // Update Pills UI
  renderMoodSelector();
  
  if (moodKey) {
    const moodData = MOODS[moodKey];
    // Update theme vars
    document.documentElement.style.setProperty('--mood-color', moodData.color);
    document.documentElement.style.setProperty('--mood-glow', moodData.glow);
    
    // Update Banner
    bannerEmoji.textContent = moodData.emoji;
    bannerMood.textContent = moodData.label;
    bannerMood.style.color = moodData.color;
    bannerCount.textContent = allSongsList.filter(s => s.mood === moodKey).length;
    activeMoodBanner.classList.remove('hidden');
    
    // Ambient color shift
    ambientGlow.style.backgroundColor = moodData.color;
    ambientGlow.style.opacity = '0.4';
    
    showToast(`Filtering by: ${moodData.label}`);
  } else {
    activeMoodBanner.classList.add('hidden');
    document.documentElement.style.setProperty('--mood-color', '#ffffff');
    document.documentElement.style.setProperty('--mood-glow', 'rgba(255,255,255,0.4)');
    ambientGlow.style.backgroundColor = 'transparent';
  }
  
  // Re-render albums and scroll
  renderAlbums();
  
  const targetScroll = albumsContainer.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
}

clearMoodFilterBtn.addEventListener('click', () => setMoodFilter(null));

// ==========================================
// RENDER ALBUMS & SONGS
// ==========================================
function renderAlbums() {
  albumsContainer.innerHTML = '';
  let totalMatchCount = 0;
  
  albums.forEach(album => {
    // 1. Filter songs in this album by Mood and Search
    const visibleSongs = album.songs.map(song => {
      // Check mood match
      const moodMatch = !currentMoodFilter || song.mood === currentMoodFilter;
      // Check search match
      const searchMatch = !currentSearchQuery || 
                          song.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
                          album.title.toLowerCase().includes(currentSearchQuery.toLowerCase());
      
      const isVisible = moodMatch && searchMatch;
      if (isVisible) totalMatchCount++;
      
      return { ...song, isVisible };
    });

    // If album has no visible songs and album title doesn't match search, skip it
    if (visibleSongs.filter(s => s.isVisible).length === 0) return;

    // Create Album Section
    const section = document.createElement('div');
    section.className = 'reveal-section flex flex-col md:flex-row gap-8 lg:gap-16';
    
    // Desktop Album Header (Sticky Side)
    const headerHtml = `
      <div class="md:w-1/3 lg:w-1/4 shrink-0">
        <div class="sticky top-32 album-header pb-4 group" data-glow="${album.theme.glow}">
          <p class="font-inter text-white/30 tracking-[0.3em] uppercase text-[10px] mb-2 count-badge">
             <span>Vol. ${album.year}</span>
          </p>
          <h2 class="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">${album.title}</h2>
          <p class="font-inter text-xs text-white/40 tracking-widest uppercase count-badge">
             <span>${visibleSongs.filter(s=>s.isVisible).length} Tracks</span>
          </p>
        </div>
      </div>
    `;

    // Song Grid
    const songsHtml = `
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${visibleSongs.map(song => {
          const mData = MOODS[song.mood];
          const displayClass = song.isVisible ? 'filtered-match' : 'hidden'; // Using hidden instead of filtered-out for cleaner layout
          
          if(!song.isVisible) return '';

          return `
          <div class="song-card glass-card p-6 rounded-2xl ${displayClass}"
               data-title="${song.title.replace(/"/g, '&quot;')}"
               data-album="${album.title.replace(/"/g, '&quot;')}"
               data-mood="${song.mood}"
               data-color="${mData.color}">
            
            <div class="song-card-content">
              <div class="mood-badge" style="color: ${mData.color}; border-color: ${mData.color}40; background: ${mData.color}10;">
                <span>${mData.emoji}</span>
                <span>${mData.label}</span>
              </div>
              <h3 class="font-playfair text-xl mb-4 group-hover:text-white text-white/80 transition-colors leading-snug">${song.title}</h3>
              
              <div class="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-[10px] tracking-widest uppercase text-white/30 hover-underline">Listen</span>
                <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
            </div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${album.theme.color} to-transparent z-0"></div>
          </div>
        `}).join('')}
      </div>
    `;

    section.innerHTML = headerHtml + songsHtml;
    albumsContainer.appendChild(section);
  });

  // Update Search Stats
  if (currentSearchQuery) {
    searchResultCount.textContent = `Found ${totalMatchCount} matching ${totalMatchCount === 1 ? 'song' : 'songs'}`;
    searchResultCount.classList.remove('opacity-0');
  } else {
    searchResultCount.classList.add('opacity-0');
  }

  // If no results
  if (totalMatchCount === 0) {
    albumsContainer.innerHTML = `
      <div class="text-center py-20 reveal-section">
        <p class="font-playfair text-4xl text-white/30 mb-4">🥀</p>
        <h3 class="font-playfair text-2xl text-white/80 mb-2">No songs found</h3>
        <p class="font-inter text-sm text-white/40 tracking-widest uppercase">Lost in the universe...</p>
      </div>
    `;
  }

  attachCardEvents();
  observeReveals();
}

// 3D Tilt Effect & Click Events for Cards
function attachCardEvents() {
  const cards = document.querySelectorAll('.song-card:not(.hidden)');
  
  cards.forEach(card => {
    // 3D Hover Tilt
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });

    // Open Drawer
    card.addEventListener('click', (e) => {
      createRipple(e, card);
      
      const title = card.dataset.title;
      const album = card.dataset.album;
      const mood = card.dataset.mood;
      const mData = MOODS[mood];
      
      openSongDrawer(title, album, mData);
    });
  });
}

// ==========================================
// SEARCH LOGIC
// ==========================================
searchInput.addEventListener('input', (e) => {
  currentSearchQuery = e.target.value.trim();
  renderAlbums();
});

// ==========================================
// SONG DRAWER LOGIC
// ==========================================
function openSongDrawer(title, album, mData) {
  const query = `Lana Del Rey ${title}`;
  
  drawerSongTitle.textContent = title;
  drawerAlbumName.textContent = album;
  
  drawerMoodBadge.innerHTML = `<span>${mData.emoji}</span> ${mData.label}`;
  drawerMoodBadge.style.color = mData.color;
  drawerMoodBadge.style.borderColor = `${mData.color}40`;
  drawerMoodBadge.style.backgroundColor = `${mData.color}10`;
  
  // Set Quote
  drawerMoodQuote.textContent = moodQuotes[Object.keys(MOODS).find(k => MOODS[k] === mData)];

  // Update Links
  drawerSpotifyBtn.href = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
  drawerYoutubeBtn.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  
  // Copy Logic
  drawerCopyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(query);
      showToast('Copied! Opening Spotify...');
      setTimeout(() => {
        window.open(`https://open.spotify.com/search/${encodeURIComponent(query)}`, '_blank');
      }, 800);
    } catch (e) {
      showToast('Failed to copy text');
    }
  };

  // Open UI
  songDrawer.classList.add('open');
  
  // Dim background
  document.getElementById('albums-container').style.opacity = '0.3';
  document.getElementById('albums-container').style.filter = 'blur(5px)';
  document.getElementById('albums-container').style.transition = 'all 0.5s ease';
}

function closeSongDrawer() {
  songDrawer.classList.remove('open');
  document.getElementById('albums-container').style.opacity = '1';
  document.getElementById('albums-container').style.filter = 'none';
}

drawerCloseBtn.addEventListener('click', closeSongDrawer);
drawerHandle.addEventListener('click', closeSongDrawer);

// Close on outside click
document.addEventListener('click', (e) => {
  if (songDrawer.classList.contains('open') && 
      !songDrawer.contains(e.target) && 
      !e.target.closest('.song-card')) {
    closeSongDrawer();
  }
});

// ==========================================
// RANDOM MIXER (SOUL NEED)
// ==========================================
function setMixerData() {
  const randomSong = allSongsList[Math.floor(Math.random() * allSongsList.length)];
  const mData = MOODS[randomSong.mood];
  
  mixerMoodEl.textContent = mData.label;
  mixerMoodEl.style.color = mData.color;
  mixerMoodEl.style.textShadow = `0 0 40px ${mData.glow}`;
  
  mixerMoodDescEl.textContent = mData.description;
  mixerSongEl.textContent = randomSong.title;
  mixerAlbumEl.textContent = randomSong.album;
  
  const query = `Lana Del Rey ${randomSong.title}`;
  document.getElementById('mixer-spotify').href = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
  document.getElementById('mixer-youtube').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

mixerTrigger.addEventListener('click', () => {
  setMixerData();
  
  mixerModal.classList.remove('hidden');
  void mixerModal.offsetWidth; // trigger reflow
  mixerModal.classList.remove('opacity-0');
  mixerContent.classList.remove('scale-95');
  mixerContent.classList.add('scale-100');
});

mixerShuffleBtn.addEventListener('click', () => {
  // Animate out
  mixerContent.classList.add('opacity-0', 'scale-95');
  setTimeout(() => {
    setMixerData();
    // Animate in
    mixerContent.classList.remove('opacity-0', 'scale-95');
  }, 300);
});

function closeMixerModal() {
  mixerModal.classList.add('opacity-0');
  mixerContent.classList.remove('scale-100');
  mixerContent.classList.add('scale-95');
  setTimeout(() => {
    mixerModal.classList.add('hidden');
  }, 700);
}

closeMixer.addEventListener('click', closeMixerModal);
document.getElementById('mixer-backdrop').addEventListener('click', closeMixerModal);


// ==========================================
// OBSERVERS (Reveal on Scroll)
// ==========================================
function setupIntersectionObservers() {
  // General section reveal
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal-section').forEach(sec => sectionObserver.observe(sec));
  
  // Header Glow Shift observer
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !currentMoodFilter) { // Don't shift if mood filter is active
        const glow = entry.target.dataset.glow;
        if (glow) {
          ambientGlow.style.backgroundColor = glow;
          ambientGlow.style.opacity = '0.3';
        }
      }
    });
  }, { threshold: 0.5, rootMargin: "-100px 0px" });
  
  document.querySelectorAll('.album-header').forEach(header => headerObserver.observe(header));
}

// Function to call on re-renders
function observeReveals() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal-section:not(.visible)').forEach(sec => sectionObserver.observe(sec));
  
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !currentMoodFilter) {
        const glow = entry.target.dataset.glow;
        if (glow) {
          ambientGlow.style.backgroundColor = glow;
          ambientGlow.style.opacity = '0.3';
        }
      }
    });
  }, { threshold: 0.5, rootMargin: "-100px 0px" });
  
  document.querySelectorAll('.album-header').forEach(header => headerObserver.observe(header));
}

// Scroll interactions
document.getElementById('enter-btn').addEventListener('click', () => {
  document.getElementById('mood-selector-section').scrollIntoView({ behavior: 'smooth' });
});

// Start App
init();
