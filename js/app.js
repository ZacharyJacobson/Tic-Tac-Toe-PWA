if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/pwa/service_worker.js")
    .then(res => console.log("service worker registered"))
    .catch(err => console.log("service worker not registered", err))
}

include('js/board_setup.js');

function include(file) {
	console.log("TEST");
  const script = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementsByTagName('head').item(0).appendChild(script);
}