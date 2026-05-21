const audio = document.getElementById("radio");
const icon = document.getElementById("icon");
const playBtn = document.getElementById("playBtn");
const volumeSlider = document.getElementById("volume");
const equalizer = document.getElementById("equalizer");
const statusText = document.getElementById("statusText");
const errorMessage = document.getElementById("errorMessage");

function setStatus(text, isError = false) {
  statusText.textContent = text;
  statusText.classList.toggle('error', isError);
  if (!isError) {
    errorMessage.textContent = '';
  }
}

function toggleAudio(){
  if (audio.paused){
    audio.play().then(() => {
      setStatus('ON-AIR', false);
      icon.innerHTML = '❚❚';
      playBtn.classList.add('active');
      equalizer.classList.add('active');
    }).catch((err) => {
      showStreamError(err);
    });
  } else {
    audio.pause();
    setStatus('Pausado', false);
    icon.innerHTML = '▶';
    playBtn.classList.remove('active');
    equalizer.classList.remove('active');
  }
}

audio.addEventListener('error', () => {
  const err = audio.error ? new Error(audio.error.message || `Código ${audio.error.code}`) : new Error('Transmisión no disponible');
});

audio.addEventListener('stalled', () => {
  showStreamError(new Error('Transmisión estancada'));
});

audio.addEventListener('suspend', () => {
  showStreamError(new Error('Transmisión suspendida'));
});

audio.addEventListener('waiting', () => {
  showStreamError(new Error('Esperando datos del servidor'));
});

playBtn.addEventListener('click', toggleAudio);

volumeSlider.addEventListener('input', function(){
  audio.volume = this.value;
});
