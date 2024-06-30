
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


const saveCurrentTime = throttle((data) => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);


player.on('timeupdate', saveCurrentTime);


const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime).catch((error) => {
    console.error('Error setting current time:', error);
  });
}

// use F key to get in and out of fullscreen

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { 
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { 
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { 
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { 
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { 
    document.msExitFullscreen();
  }
}


function toggleFullscreen() {
  if (!document.fullscreenElement && 
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    enterFullscreen(iframe);
  } else {
    exitFullscreen();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'f' || event.key === 'F') {
    toggleFullscreen();
  }
});