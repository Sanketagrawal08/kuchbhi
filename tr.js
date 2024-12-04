document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playPauseButton = document.getElementById("play-pause");
    const stopButton = document.getElementById("stop");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");
    const songListElement = document.getElementById("song-list");
    const audioSource = document.getElementById("audio-source");
  
    // Array of song objects (name and path to the audio file)
    const songs = [
      { name: "Song 1", path: "assests/Darmiyaan_Full_Song_with_Lyrics__Shafqat_Amanat_Ali_Khan__Clinton_Cerejo_(128k).mp3" },
      { name: "Song 2", path: "assests/Ek_Din_Mohabbat_Odh_Kark_Din_Gali_Ke_Mod_ParTeri_Hatheli_Par___Jubin_Nautiyal___Abir_Mix_layers(128k).mp3" },
      { name: "Song 3", path: "assests/Heartless_-_Badshah_ft._Aastha_Gill____O.N.E._ALBUM___Lyrics_Video.mp3" }
    ];
  
    // Populate the song list
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.name;
      li.addEventListener("click", () => playSong(song));
      songListElement.appendChild(li);
    });
  
    // Play the selected song
    function playSong(song) {
      audioSource.src = song.path;
      audio.load(); // Reload the audio element with the new source
      audio.play();
      playPauseButton.textContent = "Pause";
      updateDuration();
    }
  
    // Update the duration display once the audio metadata is loaded
    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration;
      durationDisplay.textContent = formatTime(duration);
      progressBar.max = duration;
    });
  
    // Play or pause the audio
    playPauseButton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "Pause";
      } else {
        audio.pause();
        playPauseButton.textContent = "Play";
      }
    });
  
    // Stop the audio
    stopButton.addEventListener("click", () => {
      audio.pause();
      audio.currentTime = 0;
      playPauseButton.textContent = "Play";
    });
  
    // Update the progress bar and current time
    audio.addEventListener("timeupdate", () => {
      const currentTime = audio.currentTime;
      currentTimeDisplay.textContent = formatTime(currentTime);
      progressBar.value = currentTime;
    });
  
    // Sync the progress bar with the audio currentTime when user drags it
    progressBar.addEventListener("input", () => {
      audio.currentTime = progressBar.value;
    });
  
    // Update the duration display
    function updateDuration() {
      const duration = audio.duration;
      durationDisplay.textContent = formatTime(duration);
    }
  
    // Format time (mm:ss)
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  })
  