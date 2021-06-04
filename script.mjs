const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// song lists
const songs = ["Kutti_Story", "Never_Give_Up"];
let songIndex = 1;

// load
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./coverMusic/${song}.jfif`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  const noOfSongs = songs.length;
  if (songIndex > 0 && songIndex < noOfSongs) {
    songIndex--;
  } else {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  const noOfSongs = songs.length;
  if (songIndex >= 0 && songIndex < noOfSongs - 1) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(event) {
  const { currentTime, duration } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// events
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) return pauseSong();
  playSong();
});

prevBtn.addEventListener("click", prevSong);

nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
