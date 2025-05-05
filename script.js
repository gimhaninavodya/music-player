let currentIndex = 0;
let isReplayEnabled = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const albumArt = document.getElementById("album-art");
const songTitle = document.getElementById("title");
const artistName = document.getElementById("artist");
const replayBtn = document.getElementById("replay-btn");

// Load and prepare song
function loadSong(index, autoplay = false) {
  const song = songs[index];
  albumArt.src = song.image;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  audio.src = song.src;
  progressBar.value = 0;

  // Wait until metadata is ready
  audio.addEventListener("loadedmetadata", () => {
    if (autoplay) {
      audio.play();
      playBtn.querySelector("img").src = "images/stop.png";
    } else {
      playBtn.querySelector("img").src = "images/play.png";
    }
  }, { once: true });
}

// Load the first song
loadSong(currentIndex);

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  const icon = playBtn.querySelector("img");
  if (audio.paused) {
    audio.play();
    icon.src = "images/stop.png";
  } else {
    audio.pause();
    icon.src = "images/play.png";
  }
});

// Next song
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex, true);
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex, true);
});

// Progress bar updates
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;
    progressBar.style.background = `linear-gradient(to right, #AF52DE ${percentage}%, #ddc5f7 ${percentage}%)`;
  }
});

// Seek functionality
progressBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

replayBtn.addEventListener("click", () => {
  isReplayEnabled = !isReplayEnabled;
  replayBtn.style.color = isReplayEnabled ? "#AF52DE" : "black";

  // Toggle visual style by adding/removing 'active' class
  replayBtn.classList.toggle("active", isReplayEnabled);
});


// Auto-play next song when current one ends
audio.addEventListener("ended", () => {
  if (isReplayEnabled) {
    // Add visual cue
    replayBtn.classList.add("replaying");

    // Replay the song
    audio.currentTime = 0;
    audio.play();
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex, true);
  }
});

