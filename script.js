// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackSpeedSlider = player.querySelector('input[name="playbackSpeed"]');
const rewindButton = player.querySelector('.rewind');
const forwardButton = player.querySelector('.forward');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// Build functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleVolumeUpdate() {
    video.volume = volumeSlider.value;
}

function handlePlaybackSpeedUpdate() {
    video.playbackRate = playbackSpeedSlider.value;
}

function rewind() {
    video.currentTime -= 10;
}

function forward() {
    video.currentTime += 25;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleVolumeUpdate);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedUpdate);
rewindButton.addEventListener('click', rewind);
forwardButton.addEventListener('click', forward);

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
