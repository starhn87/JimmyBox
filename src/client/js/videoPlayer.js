const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

window.addEventListener("load", () => {
  init();
});

const init = () => {
  video.load();

  playBtn.addEventListener("click", handlePlayClick);
  muteBtn.addEventListener("click", handleMute);
  volumeRange.addEventListener("input", handleVolumeChange);
  video.addEventListener("loadeddata", handleLoadedMetadata);
  video.addEventListener("timeupdate", handleTimeUpdate);
  video.addEventListener("ended", handleEnded);
  video.addEventListener("click", handleClick);
  videoContainer.addEventListener("mousemove", handleMouseMove);
  videoContainer.addEventListener("mouseleave", handleMouseLeave);
  timeline.addEventListener("input", handleTimelineChange);
  fullScreen.addEventListener("click", handleFullScreen);
  document.addEventListener("keydown", handleSpace);
};

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handlePause = () => {
  playBtn.innerText = "Play";
};

const handlePlay = () => {
  playBtn.innerText = "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volumeValue = value;
  video.volume = value;
};

const handleLoadedMetadata = () => {
  console.log(video.duration);
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;

  if (!fullscreen) {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  } else {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }

  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const {
    dataset: { id },
  } = videoContainer;

  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });

  playBtnIcon.classList = "fas fa-play";
};

const handleClick = () => {
  if (video.paused) {
    playBtnIcon.classList = "fas fa-pause";
    video.play();
  } else {
    playBtnIcon.classList = "fas fa-play";
    video.pause();
  }

  handleMouseMove();
};

const handleSpace = (event) => {
  const SPACE_BAR = 32;

  if (event.which === SPACE_BAR) {
    handleClick();
  }
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);
