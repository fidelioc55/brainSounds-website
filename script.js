/* Progressive enhancement: the content and native audio players work without JS. */
(() => {
  'use strict';
  const audioTracks = [...document.querySelectorAll('audio')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videoFor = audio => audio.closest('.sample')?.querySelector('video');
  const stopAll = () => audioTracks.forEach(audio => audio.pause());

  audioTracks.forEach(audio => {
    const video = videoFor(audio);
    const sync = () => {
      if (video && video.readyState >= 1 && Number.isFinite(video.duration)) {
        video.currentTime = Math.min(audio.currentTime, video.duration);
      }
    };
    audio.addEventListener('play', () => {
      audioTracks.forEach(other => { if (other !== audio) other.pause(); });
      if (video && !reducedMotion.matches) {
        sync();
        video.play().catch(() => { /* Poster remains if playback is unavailable. */ });
      }
    });
    audio.addEventListener('pause', () => video?.pause());
    audio.addEventListener('ended', () => { video?.pause(); sync(); });
    audio.addEventListener('seeking', sync);
    video?.addEventListener('loadedmetadata', sync);
  });

  const filters = document.querySelector('.filters');
  const cards = [...document.querySelectorAll('.audio-card')];
  const count = document.querySelector('#example-count');
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      stopAll();
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let visible = 0;
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter;
        if (!card.hidden) visible++;
      });
      count.textContent = `${visible} ${visible === 1 ? 'example' : 'examples'}`;
    });
  }

  const setAnimation = (button, playing) => {
    const img = button.closest('.gif-card').querySelector('img');
    if (!img.dataset.poster) img.dataset.poster = img.getAttribute('src');
    img.src = playing ? img.dataset.animation : img.dataset.poster;
    button.setAttribute('aria-pressed', String(playing));
    button.innerHTML = playing ? 'Pause denoising sequence <span aria-hidden="true">Ⅱ</span>' : 'Play denoising sequence <span aria-hidden="true">▷</span>';
  };
  document.querySelectorAll('.animation-toggle').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const playing = button.getAttribute('aria-pressed') !== 'true';
      document.querySelectorAll('.animation-toggle[aria-pressed="true"]').forEach(other => setAnimation(other, false));
      setAnimation(button, playing);
    });
  });

  const dialog = document.querySelector('#figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = document.querySelector('#enlarged-image');
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        stopAll();
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        document.querySelector('#figure-caption').textContent = image.alt;
        dialog.showModal();
        document.body.classList.add('modal-open');
      });
    });
    document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      image.removeAttribute('src');
    });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAll();
      document.querySelectorAll('.animation-toggle[aria-pressed="true"]').forEach(button => setAnimation(button, false));
    }
  });
})();
