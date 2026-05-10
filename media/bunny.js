(function () {
  'use strict';

  const vscode = acquireVsCodeApi();

  const bunny = document.getElementById('bunny');
  const mouth = document.getElementById('mouth');
  const carrotContainer = document.getElementById('carrotContainer');
  const heartsContainer = document.getElementById('heartsContainer');
  const tearsContainer = document.getElementById('tearsContainer');
  const zzzContainer = document.getElementById('zzzContainer');
  const messageBox = document.getElementById('messageBox');
  const xpBar = document.getElementById('xpBar');
  const xpLabel = document.getElementById('xpLabel');
  const levelDisplay = document.getElementById('levelDisplay');
  const streakDisplay = document.getElementById('streakDisplay');
  const bestStreakDisplay = document.getElementById('bestStreakDisplay');
  const carrotsDisplay = document.getElementById('carrotsDisplay');
  const petNameDisplay = document.getElementById('petName');
  const cryContainer = document.getElementById('cryContainer');
  const resetBtn = document.getElementById('resetBtn');

  const SUCCESS_MESSAGES = [
    'Great run! Keep it up!',
    'Your code works! The bunny is proud!',
    'Perfect! Have a carrot!',
    'Excellent work! +10 XP!',
    'Bunny is doing a happy dance!'
  ];

  const ERROR_MESSAGES = [
    'Oops! Errors are part of learning, try again!',
    'Don\'t give up! The bunny believes in you!',
    'That\'s okay, fix it and run again!',
    'Every bug you fix makes you stronger!',
    '+2 XP just for trying!'
  ];

  const STREAK_MESSAGES = {
    3: '3 in a row! Bonus XP! The bunny is excited!',
    5: '5 streak! Golden carrot unlocked!',
    10: '10 streak! You\'re on fire!'
  };

  let currentState = 'idle';
  let soundEnabled = true;

  function setState(state) {
    if (!bunny) return;
    bunny.className = 'bunny ' + state;
    currentState = state;
  }

  function updateStats(payload) {
    if (levelDisplay) levelDisplay.textContent = 'Lv.' + payload.level;
    if (streakDisplay) streakDisplay.textContent = String(payload.streak || 0);
    if (carrotsDisplay) carrotsDisplay.textContent = String(payload.carrotsEaten || 0);
    if (bestStreakDisplay) bestStreakDisplay.textContent = String(payload.bestStreak || 0);
    if (petNameDisplay && payload.petName) petNameDisplay.textContent = payload.petName;

    const xp = payload.xp || 0;
    const level = payload.level || 1;
    const xpInLevel = xp - (level - 1) * 100;
    const percent = Math.min(100, xpInLevel);
    if (xpBar) xpBar.style.width = percent + '%';
    if (xpLabel) xpLabel.textContent = xp + ' XP';
  }

  function showMessage(text) {
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.style.opacity = '1';
    setTimeout(() => { messageBox.style.opacity = '0'; }, 3500);
  }

  function spawnHearts(count) {
    if (!heartsContainer) return;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '❤️';
      heart.style.left = (20 + Math.random() * 70) + '%';
      heart.style.top = (30 + Math.random() * 30) + '%';
      heart.style.animationDelay = (i * 0.15) + 's';
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }
  }

  function showSuccess(payload) {
    setState('happy');
    if (carrotContainer) {
      carrotContainer.classList.add('visible');
      setTimeout(() => carrotContainer.classList.remove('visible'), 1200);
    }
    spawnHearts(4);
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(e => e.classList.add('happy'));

    const streak = payload.streak || 0;
    let msg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
    if (STREAK_MESSAGES[streak]) {
      msg = STREAK_MESSAGES[streak];
      setTimeout(() => setState('celebrating'), 1300);
    }
    showMessage(msg);

    setTimeout(() => {
      setState('idle');
      eyes.forEach(e => e.classList.remove('happy'));
    }, 2500);
  }

  function showError() {
    setState('sad');
    if (mouth) mouth.classList.add('sad');
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(e => e.classList.add('sad'));

    if (cryContainer) {
      cryContainer.classList.add('visible');
      setTimeout(() => cryContainer.classList.remove('visible'), 2200);
    }

    if (tearsContainer) {
      tearsContainer.classList.add('visible');
      tearsContainer.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const tear = document.createElement('div');
        tear.className = 'tear';
        tear.style.animationDelay = (i * 0.25) + 's';
        tearsContainer.appendChild(tear);
      }
    }

    const msg = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
    showMessage(msg);

    setTimeout(() => {
      setState('idle');
      if (mouth) mouth.classList.remove('sad');
      eyes.forEach(e => e.classList.remove('sad'));
      if (tearsContainer) {
        tearsContainer.classList.remove('visible');
        tearsContainer.innerHTML = '';
      }
    }, 2500);
  }

  function showDeath(payload) {
    setState('dead');
    if (mouth) mouth.classList.add('dead');
    showMessage('The bunny has fallen... 💀');

    setTimeout(() => {
      setState('idle');
      if (mouth) mouth.classList.remove('dead');
      updateStats(payload);
      showMessage('A new bunny has been born! 🐣');
    }, 3000);
  }

  function showSleeping() {
    setState('sleeping');
    if (zzzContainer) zzzContainer.classList.add('visible');
  }

  function hideSleeping() {
    if (zzzContainer) zzzContainer.classList.remove('visible');
  }

  window.addEventListener('message', (event) => {
    const message = event.data;

    switch (message.type) {
      case 'init':
        updateStats(message.payload);
        setState('idle');
        soundEnabled = message.payload.enableSounds !== false;
        break;

      case 'setState':
        if (message.payload.state === 'running') {
          hideSleeping();
          setState('running');
          showMessage('Running your code...');
        } else if (message.payload.state === 'sleeping') {
          showSleeping();
        }
        break;

      case 'runResult':
        if (message.payload.status === 'dead') {
          showDeath(message.payload);
        } else {
          updateStats(message.payload);
          var failed = message.payload.status !== 'success'
            || !!message.payload.stderr
            || message.payload.exitCode !== 0;
          if (!failed) {
            showSuccess(message.payload);
          } else {
            showError();
          }
        }
        break;

      case 'statsReset':
        updateStats(message.payload);
        setState('idle');
        showMessage('Stats reset! Fresh start!');
        break;
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      vscode.postMessage({ type: 'resetStatsRequested' });
    });
  }

  setState('idle');

  vscode.postMessage({ type: 'webviewReady' });
}());
