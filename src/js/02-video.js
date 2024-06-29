
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

const STORAGE_KEY = 'videoplayer-current-time';

// Funcție pentru a salva timpul de redare în local storage
const saveCurrentTime = throttle((data) => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

// Ascultă evenimentul de timeupdate și salvează timpul curent
player.on('timeupdate', saveCurrentTime);

// La reîncărcarea paginii, setează timpul curent salvat
const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime).catch((error) => {
    console.error('Error setting current time:', error);
  });
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}

// Funcție pentru a comuta modul fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    enterFullscreen(iframe);
  } else {
    exitFullscreen();
  }
}

// Ascultă evenimentul de apăsare a tastei 'F'
document.addEventListener('keydown', (event) => {
  if (event.key === 'f' || event.key === 'F') {
    toggleFullscreen();
  }
});