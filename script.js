const songs = [
  { name: "Whistle Podu", url: "Whistle Podu.mp3", movie: "GOAT" },
  { name: "Spark", url: "Spark.mp3", movie: "GOAT" },
  { name: "Chinna Chinna Kangal", url: "Chinna Chinna Kangal.mp3", movie: "GOAT" },
  { name: "Sawadeekar", url: "Sawadeekar.mp3", movie: "vidamuyarchi" },
  { name: "Pathikichu", url: "Pathikichu.mp3", movie: "vidamuyarchi" },
  { name: "Thaniye", url: "Thaniye.mp3", movie: "vidamuyarchi" },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const searchInput = document.getElementById("search");
const playlist = document.getElementById("playlist");
const seekBar = document.getElementById("seek-bar");

let currentSongIndex = 0;

// Load songs into the playlist
function loadPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(index));
    playlist.appendChild(li);
  });
}

audio.addEventListener("timeupdate", () => {
  seekBar.value = audio.currentTime;
  seekBar.max = audio.duration;
});

// Seek to Position when Scrubber is Clicked
seekBar.addEventListener("input", () => {
  audio.currentTime = seekBar.value;
});

// Play a song by index
function playSong(index) {
  currentSongIndex = index;
  audio.src = songs[index].url;
  audio.play();
  playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
  highlightSong(index);
}

// Highlight the current song in the playlist
function highlightSong(index) {
  const items = playlist.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
  items[index].classList.add("active");
}

// Play or pause the current song
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
  } else {
    audio.pause();
    playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
  }
});

// Play the next song
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});

// Play the previous song
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});

// Search for a song by name or movie
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(query) || song.movie.toLowerCase().includes(query)
  );
  playlist.innerHTML = "";
  filteredSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(songs.indexOf(song)));
    playlist.appendChild(li);
  });
});

// Load the playlist when the page loads
loadPlaylist();
playSong(currentSongIndex);
