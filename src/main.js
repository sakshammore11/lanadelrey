import { albums, moods } from './data.js';

// DOM Elements
const albumsContainer = document.getElementById('albums-container');
const ambientGlow = document.getElementById('ambient-glow');
const searchInput = document.getElementById('search-input');
const searchSection = document.getElementById('search-section');

// Toast System
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
let toastTimeout;

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('opacity-0', '-translate-y-10');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-10');
  }, 3000);
}

// Particle System
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    container.appendChild(particle);
  }
}

// Render Albums
function renderAlbums(query = '') {
  albumsContainer.innerHTML = '';
  
  albums.forEach(album => {
    const filteredSongs = album.songs.filter(song => 
      song.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSongs.length === 0 && !album.title.toLowerCase().includes(query.toLowerCase())) {
      return;
    }
    
    const songsToRender = query && !album.title.toLowerCase().includes(query.toLowerCase()) ? filteredSongs : album.songs;

    const section = document.createElement('div');
    section.className = 'fade-in opacity-0 translate-y-10 transition-all duration-1000 ease-out';
    
    section.innerHTML = `
      <div class="mb-12 border-b border-white/10 pb-4 flex flex-col md:flex-row items-end justify-between" 
           data-glow="${album.theme.glow}">
        <div>
          <h2 class="font-playfair text-4xl md:text-5xl font-bold mb-2">${album.title}</h2>
          <p class="font-inter text-white/40 tracking-widest uppercase text-sm">${album.year}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${songsToRender.map(song => `
          <div class="song-card group glass-card p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
               data-song="${song.replace(/"/g, '&quot;')}" data-album="${album.title.replace(/"/g, '&quot;')}">
            <div class="song-card-content">
              <h3 class="font-playfair text-xl mb-6 group-hover:text-white text-white/90 transition-colors">${song}</h3>
              
              <div class="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-xs tracking-widest uppercase text-white/40">Copy / Search</span>
                <div class="flex gap-2">
                   <button class="spotify-btn action-btn w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-type="spotify">
                     <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.72 12.9c.36.181.54.78.241 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                   </button>
                   <button class="youtube-btn action-btn w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-type="youtube">
                     <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                   </button>
                </div>
              </div>
            </div>
            <!-- Glow background specific to album -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${album.theme.color} to-transparent z-0"></div>
          </div>
        `).join('')}
      </div>
    `;
    albumsContainer.appendChild(section);

    // Setup intersection observer for fade-in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          // Change ambient glow
          const header = entry.target.querySelector('[data-glow]');
          if (header) {
            ambientGlow.style.backgroundColor = header.dataset.glow;
          }
        }
      });
    }, { threshold: 0.1, rootMargin: "-50px" });

    observer.observe(section);
  });

  attachCardEvents();
}

// Interactivity for Cards
function attachCardEvents() {
  const cards = document.querySelectorAll('.song-card');
  cards.forEach(card => {
    card.addEventListener('click', async (e) => {
      const songName = card.dataset.song;
      const query = `Lana Del Rey ${songName}`;
      
      // If clicked on specific buttons
      const btn = e.target.closest('.action-btn');
      if (btn) {
        if (btn.dataset.type === 'spotify') {
          showToast('Opening Spotify...');
          window.open(`https://open.spotify.com/search/${encodeURIComponent(query)}`, '_blank');
        } else if (btn.dataset.type === 'youtube') {
          showToast('Opening YouTube...');
          window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
        }
        return;
      }

      // Default click: Copy and Spotify
      try {
        await navigator.clipboard.writeText(query);
        showToast('Copied to clipboard. Opening Spotify...');
        setTimeout(() => {
          window.open(`https://open.spotify.com/search/${encodeURIComponent(query)}`, '_blank');
        }, 800);
      } catch (err) {
        showToast('Failed to copy text');
      }
    });
  });
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
  renderAlbums(e.target.value);
});

// Random Mixer
const mixerTrigger = document.getElementById('mixer-trigger');
const mixerModal = document.getElementById('mixer-modal');
const closeMixer = document.getElementById('close-mixer');
const mixerContent = document.getElementById('mixer-content');

// Elements inside mixer
const moodEl = document.getElementById('mixer-mood');
const songEl = document.getElementById('mixer-song');
const albumEl = document.getElementById('mixer-album');

function getRandomSong() {
  const allSongs = [];
  albums.forEach(a => {
    a.songs.forEach(s => {
      allSongs.push({ song: s, album: a.title });
    });
  });
  const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  return { ...randomSong, mood: randomMood };
}

mixerTrigger.addEventListener('click', () => {
  const data = getRandomSong();
  
  moodEl.textContent = data.mood;
  songEl.textContent = data.song;
  albumEl.textContent = data.album;
  
  // Attach current song data for buttons inside modal
  const mixerCard = document.getElementById('mixer-card');
  mixerCard.dataset.song = data.song;
  
  mixerModal.classList.remove('hidden');
  // Trigger reflow
  void mixerModal.offsetWidth;
  mixerModal.classList.remove('opacity-0');
  mixerContent.classList.remove('scale-95');
  mixerContent.classList.add('scale-100');
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

// Mixer card buttons logic
document.getElementById('mixer-card').addEventListener('click', async (e) => {
  const songName = document.getElementById('mixer-card').dataset.song;
  const query = `Lana Del Rey ${songName}`;
  
  const btn = e.target.closest('.action-btn');
  if (btn) {
    if (btn.classList.contains('spotify-btn')) {
      showToast('Opening Spotify...');
      window.open(`https://open.spotify.com/search/${encodeURIComponent(query)}`, '_blank');
    } else if (btn.classList.contains('youtube-btn')) {
      showToast('Opening YouTube...');
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(query);
    showToast('Copied to clipboard. Opening Spotify...');
    setTimeout(() => {
      window.open(`https://open.spotify.com/search/${encodeURIComponent(query)}`, '_blank');
    }, 800);
  } catch (err) {}
});

// Scroll interactions
const enterBtn = document.getElementById('enter-btn');
enterBtn.addEventListener('click', () => {
  searchSection.classList.remove('opacity-0', 'translate-y-10');
  searchInput.focus();
  albumsContainer.scrollIntoView({ behavior: 'smooth' });
});

// Init
createParticles();
renderAlbums();

// Initial animations
setTimeout(() => {
  searchSection.classList.remove('opacity-0', 'translate-y-10');
}, 1000);
