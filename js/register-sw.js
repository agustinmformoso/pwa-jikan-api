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
  const alertOffline = document.getElementById('alert-offline');
  const alertOnline = document.getElementById('alert-online');
  alertOffline.className = 'alert alert-danger position-fixed top-0 end-0'
  alertOnline.className = 'd-none'
});

window.addEventListener('online', event => {
  document.querySelector('body').classList.remove('offline');

  const alertOffline = document.getElementById('alert-offline');
  const alertOnline = document.getElementById('alert-online');
  alertOffline.className = 'd-none'
  alertOnline.className = 'alert alert-success position-fixed top-0 end-0'

});

if (!navigator.onLine) {
  document.querySelector('body').classList.add('offline');
}