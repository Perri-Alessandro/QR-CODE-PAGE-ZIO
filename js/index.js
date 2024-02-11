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

  volumeIcon.addEventListener(
    "touchstart",
    function (event) {
      handleVolumeTouch(event);

      event.preventDefault();
    },
    { passive: false }
  );

  volumeIcon.addEventListener(
    "touchmove",
    function (event) {
      handleVolumeTouch(event);

      event.preventDefault();
    },
    { passive: false }
  );

  volumeIcon.addEventListener("touchend", function (event) {
    handleVolumeTouch(event);

    event.preventDefault();
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

  progressBar.addEventListener(
    "touchstart",
    function (event) {
      isDragging = true;
      if (isPlaying) {
        handleTouch(event);
      }
    },
    { passive: true }
  );

  progressBar.addEventListener(
    "touchmove",
    function (event) {
      if (isDragging) {
        handleTouch(event);
      }
    },
    { passive: true }
  );

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

  function handleVolumeTouch(event) {
    const barHeight = volumeSlider.clientHeight;
    const touchY =
      event.touches[0].clientY - volumeSlider.getBoundingClientRect().top;
    const percentage = 100 - (touchY / barHeight) * 100; // Invertito per iniziare dall'alto

    // Aggiorna il volume dell'audioPlayer
    audioPlayer.volume = percentage / 100;
    // volumeSlider.value = audioPlayer.volume;
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
  });

  //////////// GESTIONE DINAMICA DELLA SESSIONE MULTIMEDIALE (RIPRODUZIONE DA BACKGROUND IN MOBILE) PER OGNI PAGINA //////////////////////
  class MediaSessionHandler {
    constructor(title, artist, album, artworkSrc) {
      this.title = title;
      this.artist = artist;
      this.album = album;
      this.artworkSrc = artworkSrc;
    }

    setupMediaSession() {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.title,
          artist: this.artist,
          album: this.album,
          artwork: [
            { src: this.artworkSrc, sizes: "96x96", type: "image/jpeg" },
          ],
        });
      }
    }
  }

  const mediaSessionData = {
    "bacialaquestaterra.html": new MediaSessionHandler(
      "BACIALA QUESTA TERRA",
      "Cataldo Perri",
      "Bastimenti",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/1b19440f1acec101f1a965e2fe33a9d18a2d6cc5/assets/image/IMG-20240203-WA0016.jpg"
    ),
    "ilMioSud.html": new MediaSessionHandler(
      "IL MIO SUD",
      "Cataldo Perri",
      "Guellarè",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240203-WA0015.jpg"
    ),
    "diCieloEmare.html": new MediaSessionHandler(
      "DI CIELO E MARE",
      "Cataldo Perri",
      "Bastimenti",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240203-WA0020.jpg"
    ),
    "argentina.html": new MediaSessionHandler(
      "ARGENTINA",
      "Cataldo Perri",
      "Bastimenti",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240203-WA0021.jpg"
    ),
    "lacollinadelvento.html": new MediaSessionHandler(
      "LA COLLINA DEL VENTO",
      "Cataldo Perri",
      "Calarbresh",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240204-WA0052.jpg"
    ),
    "andyvaripapa.html": new MediaSessionHandler(
      "ANDY VARIPAPA",
      "Cataldo Perri",
      "Calarbresh",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240204-WA0050.jpg"
    ),

    "tarabella.html": new MediaSessionHandler(
      "TARABELLA",
      "Cataldo Perri",
      "Guellarè",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240204-WA0050.jpg"
    ),

    "lauraeilsultano.html": new MediaSessionHandler(
      "LAURA E IL SULTANO",
      "Cataldo Perri",
      "Rotte Saracene",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/1b19440f1acec101f1a965e2fe33a9d18a2d6cc5/assets/image/IMG-20240203-WA0016.jpg"
    ),

    "ionio.html": new MediaSessionHandler(
      "IONIO",
      "Cataldo Perri",
      "Rotte Saracene",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240203-WA0020.jpg"
    ),

    "giochid'alba.html": new MediaSessionHandler(
      "GIOCHI D'ALBA",
      "Cataldo Perri",
      "Bastimenti",
      "https://raw.githubusercontent.com/Perri-Alessandro/QR-CODE-PAGE-ZIO/main/assets/image/IMG-20240203-WA0015.jpg"
    ),
  };

  // Ottieni il nome della pagina corrente
  const currentPage = window.location.pathname.split("/").pop();

  // Ottieni le informazioni sulla sessione multimediale per la pagina corrente
  const currentMediaSession = mediaSessionData[currentPage];

  if (currentMediaSession) {
    currentMediaSession.setupMediaSession();
  }
  /////////////////////
});
/////////////
