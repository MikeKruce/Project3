// pwa.js

// Check if the service worker API is available
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Handle PWA installation
let deferredPrompt;
const installButton = document.getElementById('installButton');
const iosInstallBanner = document.getElementById('iosInstallBanner');
const iosDismissButton = document.getElementById('dismissIosBanner');

// Show the install button only if the user hasn't installed the app
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

// Handle the iOS-specific installation banner
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

if (isIos() && !isInStandaloneMode()) {
  iosInstallBanner.style.display = 'block';

  iosDismissButton.addEventListener('click', () => {
    iosInstallBanner.style.display = 'none';
  });
}
