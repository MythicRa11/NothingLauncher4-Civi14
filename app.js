/* -------------------------------------------------------------
   NOTHING OS 4.0 LAUNCHER - JAVASCRIPT LOGIC
   For Xiaomi 14 Civi Special Edition
   ------------------------------------------------------------- */

// --- Audio Synthesizer (Mechanical Nothing OS Clicks) ---
class NothingHaptics {
  constructor() {
    this.enabled = true;
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  click(type = 'soft') {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx || this.audioCtx.state === 'suspended') {
      this.audioCtx?.resume();
    }
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    if (type === 'tick') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else {
      // Soft mechanical click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.025);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    }
  }
}

const haptics = new NothingHaptics();

// --- Live Clock & Date ---
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const statusClock = document.getElementById('status-clock');
  const homeHour = document.getElementById('home-hour');
  const homeMin = document.getElementById('home-min');
  const homeDate = document.getElementById('home-date');

  if (statusClock) statusClock.textContent = `${hours}:${minutes}`;
  if (homeHour) homeHour.textContent = hours;
  if (homeMin) homeMin.textContent = minutes;

  if (homeDate) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    homeDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  }
}

setInterval(updateClock, 1000);
updateClock();

// --- Xiaomi 14 Civi Dynamic Pill & Island Interaction ---
const dynamicPill = document.getElementById('dynamic-pill');
let isPillExpanded = false;

function toggleDynamicPill(forceState) {
  isPillExpanded = forceState !== undefined ? forceState : !isPillExpanded;
  if (isPillExpanded) {
    dynamicPill.classList.add('expanded');
    haptics.click('toggle');
  } else {
    dynamicPill.classList.remove('expanded');
    haptics.click('soft');
  }
}

dynamicPill.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDynamicPill();
});

// --- Vintage Media Player Widget ---
const tracks = [
  { title: "Nothing OS 4.0 Soundscape", artist: "CIVI 14 • KINETIC AUDIO" },
  { title: "Resonance (Monochrome Mix)", artist: "NOTHING SOUND LAB" },
  { title: "Dot Matrix Pulse", artist: "CARL PEI & TEENAGE ENG." },
  { title: "Glyph Symphony in C Minor", artist: "NOTHING ACOUSTICS" }
];
let currentTrackIdx = 0;
let isPlaying = true;

const reel1 = document.getElementById('reel-1');
const reel2 = document.getElementById('reel-2');
const playPauseBtn = document.getElementById('btn-play-pause');
const playPauseIcon = document.getElementById('play-pause-icon');
const nextTrackBtn = document.getElementById('btn-next-track');
const trackTitleEl = document.getElementById('track-title');
const pillText = document.getElementById('pill-text');

function updatePlaybackUI() {
  const current = tracks[currentTrackIdx];
  trackTitleEl.textContent = current.title;
  pillText.textContent = `4.0 // ${current.title.toUpperCase().slice(0, 18)}`;

  if (isPlaying) {
    reel1.classList.add('spinning');
    reel2.classList.add('spinning');
    playPauseIcon.textContent = '⏸';
  } else {
    reel1.classList.remove('spinning');
    reel2.classList.remove('spinning');
    playPauseIcon.textContent = '▶';
  }
}

playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  isPlaying = !isPlaying;
  updatePlaybackUI();
  haptics.click('toggle');
});

nextTrackBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
  updatePlaybackUI();
  haptics.click('tick');
});

// --- Quick Toggles (Torch, Wi-Fi, Bluetooth, Theme) ---
const toggleTorch = document.getElementById('toggle-torch');
const torchOverlay = document.getElementById('torch-overlay');
const toggleWifi = document.getElementById('toggle-wifi');
const toggleBt = document.getElementById('toggle-bt');
const toggleDarkMode = document.getElementById('toggle-darkmode');

toggleTorch.addEventListener('click', (e) => {
  e.stopPropagation();
  const isActive = toggleTorch.classList.toggle('active');
  toggleTorch.classList.toggle('torch', isActive);
  torchOverlay.classList.toggle('active', isActive);
  haptics.click('toggle');
});

torchOverlay.addEventListener('click', () => {
  toggleTorch.classList.remove('active', 'torch');
  torchOverlay.classList.remove('active');
  haptics.click('soft');
});

toggleWifi.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleWifi.classList.toggle('active');
  haptics.click('toggle');
});

toggleBt.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleBt.classList.toggle('active');
  haptics.click('toggle');
});

function toggleThemeMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  toggleDarkMode.classList.toggle('active', newTheme === 'light');
  haptics.click('toggle');
}

toggleDarkMode.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleThemeMode();
});

// --- Dynamic Fitness Step Increment Simulation ---
let stepCount = 7420;
const stepGoal = 10000;
const stepCountEl = document.getElementById('step-count');
const fitnessPctEl = document.getElementById('fitness-pct');
const fitnessCircle = document.getElementById('fitness-circle');

function updateFitness(newSteps) {
  stepCount = newSteps;
  stepCountEl.textContent = stepCount.toLocaleString();
  const pct = Math.min(100, Math.round((stepCount / stepGoal) * 100));
  fitnessPctEl.textContent = `${pct}%`;
  
  // Total circumference is ~138 (2 * pi * 22)
  const maxDash = 138;
  const offset = maxDash - (maxDash * pct) / 100;
  fitnessCircle.style.strokeDashoffset = offset;
}

// Increment steps subtly on tap
document.querySelector('.widget-fitness').addEventListener('click', () => {
  updateFitness(stepCount + 150);
  haptics.click('tick');
});

// --- 2x2 Circular Folder & Modal ---
const circleFolder = document.getElementById('circle-folder');
const folderModal = document.getElementById('folder-modal');
const btnCloseFolder = document.getElementById('btn-close-folder');

circleFolder.addEventListener('click', (e) => {
  // If user clicked directly on a mini app inside the circular folder
  const miniApp = e.target.closest('.folder-mini-app');
  if (miniApp) {
    e.stopPropagation();
    launchApp(miniApp.getAttribute('data-app'));
    return;
  }
  // Otherwise open enlarged folder modal
  folderModal.classList.add('open');
  haptics.click('soft');
});

btnCloseFolder.addEventListener('click', () => {
  folderModal.classList.remove('open');
  haptics.click('soft');
});

folderModal.addEventListener('click', (e) => {
  if (e.target === folderModal) {
    folderModal.classList.remove('open');
    haptics.click('soft');
  }
});

// --- All Installed Apps Dataset for App Drawer (Monochrome Nothing OS 4.0 Style) ---
const installedApps = [
  { name: 'Browser', icon: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' },
  { name: 'Calculator', icon: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 14H7v-2h6v2zm4-4h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2zm0-6H7V5h10v2z"/></svg>' },
  { name: 'Calendar', icon: '<svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>' },
  { name: 'Camera', icon: '<svg viewBox="0 0 24 24"><path d="M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>', dot: true },
  { name: 'Clock', icon: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>' },
  { name: 'Discord', icon: '<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>' },
  { name: 'Files', icon: '<svg viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>' },
  { name: 'Gallery', icon: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>' },
  { name: 'GitHub', icon: '<svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>', dot: true },
  { name: 'Gmail', icon: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' },
  { name: 'Maps', icon: '<svg viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>' },
  { name: 'Messages', icon: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>' },
  { name: 'Netflix', icon: '<svg viewBox="0 0 24 24"><path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.912-8.317-5.83-16.634-8.73-24zm10.774 0v12.25c1.47.014 2.83.18 4.23.238V0zm-12.98 0v24c1.37-.058 2.76-.194 4.23-.238V0z"/></svg>' },
  { name: 'Notes', icon: '<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>' },
  { name: 'Phone', icon: '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>' },
  { name: 'Play Store', icon: '<svg viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 0 1-.61-.954V2.768c.137-.367.35-.694.609-.954zm11.235 9.134l2.274-1.314-10.99-6.35 8.716 7.664zm0 2.104l-8.716 7.664 10.99-6.35-2.274-1.314zm1.09-1.052l3.473 2.006c1.196.691 1.196 1.821 0 2.512l-3.473 2.006-2.528-2.262 2.528-2.262z"/></svg>' },
  { name: 'Recorder', icon: '<svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>', dot: true },
  { name: 'Reddit', icon: '<svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>' },
  { name: 'Settings', icon: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>' },
  { name: 'Spotify', icon: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.18.3-.56.39-.86.21-2.36-1.44-5.33-1.77-8.83-.97-.33.08-.66-.13-.74-.46-.08-.34.13-.66.46-.74 3.84-.88 7.12-.5 9.76 1.1.3.18.39.56.21.86zm1.22-2.72c-.23.37-.71.49-1.08.26-2.7-1.66-6.82-2.14-10.02-1.17-.41.12-.85-.11-.97-.52-.12-.41.11-.85.52-.97 3.66-1.11 8.2-.58 11.29 1.32.37.23.49.71.26 1.08zm.13-2.83c-3.24-1.92-8.58-2.1-11.69-1.15-.49.15-1.02-.13-1.17-.62-.15-.49.13-1.02.62-1.17 3.59-1.09 9.48-.88 13.2 1.33.44.26.59.84.33 1.28-.26.44-.84.59-1.29.33z"/></svg>', dot: true },
  { name: 'Telegram', icon: '<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z"/></svg>' },
  { name: 'WhatsApp', icon: '<svg viewBox="0 0 24 24"><path d="M12.031 0C5.398 0 .017 5.381.017 12.015c0 2.115.549 4.18 1.594 5.992L0 24l6.166-1.617c1.748.953 3.725 1.455 5.865 1.455 6.633 0 12.015-5.381 12.015-12.015S18.664 0 12.031 0zm0 21.996c-1.801 0-3.568-.484-5.117-1.402l-.367-.219-3.805.996 1.016-3.71-.24-.383a9.92 9.92 0 0 1-1.52-5.263c0-5.508 4.484-9.992 9.992-9.992 5.508 0 9.992 4.484 9.992 9.992 0 5.508-4.484 9.992-9.992 9.992zm5.477-7.48c-.3-.15-1.777-.875-2.05-1-.277-.125-.48-.188-.68.125-.2.312-.78 1-.957 1.2-.176.2-.352.227-.652.074-.3-.15-1.266-.465-2.41-1.484-.89-.797-1.492-1.78-1.668-2.082-.176-.3-.02-.465.13-.613.137-.137.3-.352.45-.527.15-.176.2-.3.3-.5.1-.2.05-.375-.023-.527-.074-.15-.68-1.637-.93-2.242-.246-.59-.496-.512-.68-.523h-.582c-.2 0-.523.074-.797.375s-1.047 1.023-1.047 2.496c0 1.473 1.074 2.898 1.223 3.098.15.2 2.113 3.227 5.117 4.527.715.312 1.273.496 1.707.633.719.23 1.375.195 1.895.121.582-.086 1.777-.727 2.027-1.43.25-.703.25-1.305.176-1.43-.075-.125-.274-.2-.574-.35z"/></svg>' },
  { name: 'X', icon: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
  { name: 'YouTube', icon: '<svg viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>', dot: true }
];

const drawerAppsList = document.getElementById('drawer-apps-list');
const drawerSearch = document.getElementById('drawer-search');
const appDrawer = document.getElementById('app-drawer');
const btnOpenDrawer = document.getElementById('btn-open-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const gestureBar = document.getElementById('gesture-bar');

function renderDrawerApps(apps) {
  drawerAppsList.innerHTML = '';
  apps.forEach(app => {
    const item = document.createElement('div');
    item.className = 'app-item';
    item.setAttribute('data-app', app.name);
    item.setAttribute('id', `drawer-app-${app.name.toLowerCase().replace(/\s+/g, '-')}`);

    item.innerHTML = `
      <div class="app-icon ${app.dot ? 'has-dot' : ''}">
        ${app.icon}
      </div>
      <span class="app-title">${app.name}</span>
    `;

    item.addEventListener('click', () => {
      launchApp(app.name, app.icon);
    });

    drawerAppsList.appendChild(item);
  });
}

// Initial render of drawer apps (sorted alphabetically)
installedApps.sort((a, b) => a.name.localeCompare(b.name));
renderDrawerApps(installedApps);

// Filter apps on search
drawerSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = installedApps.filter(app => app.name.toLowerCase().includes(query));
  renderDrawerApps(filtered);
});

// Open / Close Drawer
function openAppDrawer() {
  appDrawer.classList.add('open');
  drawerSearch.focus();
  haptics.click('soft');
}

function closeAppDrawer() {
  appDrawer.classList.remove('open');
  drawerSearch.value = '';
  renderDrawerApps(installedApps);
  haptics.click('soft');
}

btnOpenDrawer.addEventListener('click', openAppDrawer);
gestureBar.addEventListener('click', openAppDrawer);
btnCloseDrawer.addEventListener('click', closeAppDrawer);

// Alphabet scrubber jump
const scrubber = document.getElementById('alphabet-scrubber');
scrubber.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    const letter = e.target.textContent;
    const target = installedApps.find(app => app.name.toUpperCase().startsWith(letter));
    if (target) {
      const el = document.getElementById(`drawer-app-${target.name.toLowerCase().replace(/\s+/g, '-')}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        haptics.click('tick');
      }
    }
  }
});

// --- App Launch Screen Simulation ---
const appLaunchScreen = document.getElementById('app-launch-screen');
const appLaunchName = document.getElementById('app-launch-name');
const appLaunchIcon = document.getElementById('app-launch-icon');
const btnBackHome = document.getElementById('btn-back-home');

function launchApp(name, iconHtml) {
  closeAppDrawer();
  folderModal.classList.remove('open');
  appLaunchName.textContent = name.toUpperCase();
  
  if (iconHtml) {
    appLaunchIcon.innerHTML = iconHtml;
  } else {
    const found = installedApps.find(a => a.name === name);
    appLaunchIcon.innerHTML = found ? found.icon : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
  }

  appLaunchScreen.classList.add('open');
  haptics.click('toggle');
}

// Attach launchApp to all home screen app icons
document.querySelectorAll('.launcher-viewport .app-item, .dock-item[data-app]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const appName = el.getAttribute('data-app');
    if (appName) {
      launchApp(appName);
    }
  });
});

btnBackHome.addEventListener('click', () => {
  appLaunchScreen.classList.remove('open');
  haptics.click('soft');
});

// --- Top Desktop Bar Controls (Frame, Theme, Sound, Settings) ---
const deviceContainer = document.getElementById('device-container');
const btnToggleFrame = document.getElementById('btn-toggle-frame');
const btnToggleTheme = document.getElementById('btn-toggle-theme');
const btnToggleSound = document.getElementById('btn-toggle-sound');
const btnOpenSettings = document.getElementById('btn-open-settings');
const settingsModal = document.getElementById('settings-modal');
const btnCloseSettings = document.getElementById('btn-close-settings');
const chkAudio = document.getElementById('chk-audio');

btnToggleFrame.addEventListener('click', () => {
  const isFrameless = deviceContainer.classList.toggle('frameless');
  btnToggleFrame.querySelector('span').textContent = isFrameless ? 'Frame: OFF' : 'Frame: ON';
  btnToggleFrame.classList.toggle('active', !isFrameless);
  haptics.click('toggle');
});

btnToggleTheme.addEventListener('click', toggleThemeMode);

btnToggleSound.addEventListener('click', () => {
  haptics.enabled = !haptics.enabled;
  chkAudio.checked = haptics.enabled;
  btnToggleSound.classList.toggle('active', haptics.enabled);
  btnToggleSound.querySelector('span').textContent = haptics.enabled ? 'Sound: ON' : 'Sound: OFF';
  if (haptics.enabled) haptics.click('toggle');
});

chkAudio.addEventListener('change', (e) => {
  haptics.enabled = e.target.checked;
  btnToggleSound.classList.toggle('active', haptics.enabled);
  btnToggleSound.querySelector('span').textContent = haptics.enabled ? 'Sound: ON' : 'Sound: OFF';
});

btnOpenSettings.addEventListener('click', () => {
  settingsModal.classList.add('open');
  haptics.click('soft');
});

btnCloseSettings.addEventListener('click', () => {
  settingsModal.classList.remove('open');
  haptics.click('soft');
});

// Wallpaper selection
const civiScreen = document.getElementById('civi-screen');
document.querySelectorAll('.wall-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.wall-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const bg = thumb.getAttribute('data-bg');
    if (bg.includes('url') || bg.includes('assets')) {
      civiScreen.style.backgroundImage = `url('${bg}')`;
      civiScreen.style.background = '';
    } else {
      civiScreen.style.backgroundImage = 'none';
      civiScreen.style.background = bg;
    }
    haptics.click('tick');
  });
});

console.log("Nothing OS 4.0 Launcher for Xiaomi 14 Civi initialized successfully.");
