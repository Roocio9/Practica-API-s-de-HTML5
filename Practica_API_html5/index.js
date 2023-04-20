if (window.File && window.FileReader && window.FileList) {
  // El navegador es compatible con las APIs que necesitamos
  console.log("Todas las APIs soportadas");
} else {
  // El navegador no es compatible
  alert('La API de FILE no es soportada en este navegador."');
};
const videoInput = document.getElementById('videoInput');
const videoPlayer = document.getElementById('videoPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const volumeUpButton = document.getElementById('volumeUpButton');
const volumeDownButton = document.getElementById('volumeDownButton');
const errorMessage = document.getElementById('errorMessage');

function handleFileSelect(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const src = document.createAttribute('src');
    src.value = e.target.result;
    videoPlayer.setAttributeNode(src);
    errorMessage.innerHTML = '<p>Cargando...</p>';
  }
  reader.readAsDataURL(file);
}

videoInput.addEventListener('change', function(event) {
  const file = videoInput.files[0];
  const fileType = file.type;
  const validFileType = ['video/mp4', 'video/webm', 'video/ogg'];
  if (validFileType.includes(fileType)) {
    handleFileSelect(event);
    alert('El archivo se está cargando. Por favor, espere un momento.');
    videoPlayer.play();
  } else {
    alert('El archivo de video no es compatible.');
  }
});

playButton.addEventListener('click', function() {
  videoPlayer.play();
});

pauseButton.addEventListener('click', function() {
  videoPlayer.pause();
});

volumeUpButton.addEventListener('click', function() {
  if (videoPlayer.volume < 1.0) {
    videoPlayer.volume += 0.1;
  }
});

volumeDownButton.addEventListener('click', function() {
  if (videoPlayer.volume > 0.0) {
    videoPlayer.volume -= 0.1;
  }
});

videoPlayer.addEventListener('error', function() {
  switch (videoPlayer.error.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      errorMessage.innerHTML = 'La carga del video fue abortada.';
      break;
    case MediaError.MEDIA_ERR_NETWORK:
      errorMessage.innerHTML = 'Ocurrió un error de red durante la carga del video.';
      break;
    case MediaError.MEDIA_ERR_DECODE:
      errorMessage.innerHTML = 'No se pudo decodificar el video.';
      break;
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      errorMessage.innerHTML = 'El archivo de video no es compatible.';
      break;
    default:
      errorMessage.innerHTML = 'Ocurrió un error durante la carga del video.';
      break;
  }
});

