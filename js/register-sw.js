if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
    .then(reg => {
      console.log("Service worker esta listo!");
    });
} else {
  console.log("Service worker no soportado.");
}

window.addEventListener('offline', event => {
  document.querySelector('body').classList.add('offline');
  const alert = document.getElementById('alert-offline');
  alert.className = 'alert alert-danger position-fixed top-0 end-0'
});

window.addEventListener('online', event => {
  document.querySelector('body').classList.remove('offline');
});

if (!navigator.onLine) {
  document.querySelector('body').classList.add('offline');
}