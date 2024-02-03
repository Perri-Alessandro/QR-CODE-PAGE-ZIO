// let annoCorrente = new Date().getFullYear();
// let eccolo = (document.getElementById("anno").textContent = annoCorrente);

///////////////////////////// Audio player
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const progressBar = document.getElementById("progressBar");
  const progress = document.getElementById("progress");
  const currentTime = document.getElementById("currentTime");
  const totalTime = document.getElementById("totalTime");
  const audioPlayer = document.getElementById("audioPlayer");
  const volumeSlider = document.getElementById("volumeSlider");
  const volumeIcon = document.getElementById("volumeIcon");
  const rewindButton = document.querySelector(".bi-arrow-clockwise");

  pauseButton.classList.add("d-none");

  let isPlaying = false;
  let isDragging = false;

  volumeIcon.addEventListener("click", function () {
    volumeSlider.hidden = !volumeSlider.hidden;
  });

  volumeSlider.addEventListener("input", function () {
    audioPlayer.volume = volumeSlider.value;
  });

  playButton.addEventListener("click", function () {
    togglePlayPause();
  });

  pauseButton.addEventListener("click", function () {
    togglePlayPause();
  });

  progressBar.addEventListener("touchstart", function (event) {
    isDragging = true;
    handleTouch(event);
  });

  progressBar.addEventListener("touchmove", function (event) {
    if (isDragging) {
      handleTouch(event);

      // Impedisci il comportamento predefinito di trascinamento sulla pagina al drag nel progresso della traccia da mobile
      event.preventDefault();
    }
  });

  progressBar.addEventListener("touchend", function () {
    isDragging = false;
  });

  function togglePlayPause() {
    if (isPlaying) {
      pauseButton.classList.add("d-none");
      playButton.classList.remove("d-none");
      audioPlayer.pause();
    } else {
      playButton.classList.add("d-none");
      pauseButton.classList.remove("d-none");
      audioPlayer.play();
    }

    isPlaying = !isPlaying;
  }

  function handleTouch(event) {
    const barWidth = progressBar.clientWidth;
    const touchX =
      event.touches[0].clientX - progressBar.getBoundingClientRect().left;
    const percentage = (touchX / barWidth) * 100;

    // Aggiorna il progresso della canzone
    audioPlayer.currentTime = (percentage / 100) * audioPlayer.duration;
  }

  audioPlayer.addEventListener("timeupdate", function () {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percentage}%`;

    currentTime.textContent = formatTime(audioPlayer.currentTime);
    totalTime.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener("ended", function () {
    pauseButton.classList.add("d-none");
    playButton.classList.remove("d-none");
    isPlaying = false;
  });

  // Funzione per formattare i tempi come MM:SS
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
  }

  progressBar.addEventListener("click", function (event) {
    const barWidth = progressBar.clientWidth;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const percentage = (clickX / barWidth) * 100;

    // Aggiorna il progresso della canzone
    audioPlayer.currentTime = (percentage / 100) * audioPlayer.duration;
  });

  rewindButton.addEventListener("click", function () {
    // Riavvolgi la canzone
    audioPlayer.currentTime = 0;

    updateProgressBarThumb(0);
  });
});
/////////////
