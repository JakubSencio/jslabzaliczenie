const sounds = {
    'z': 'WAV/kick.wav',
    'x': 'WAV/snare.wav',
    'c': 'WAV/tom.wav',
    'v': 'WAV/cymbal.wav',
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

document.addEventListener('keydown', (event) => {
    const sound = sounds[event.key];
    if (sound) {
        playSound(sound);
    } 
});

async function playSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
}

function playAllTracks() {
    const trackUrls = Object.values(sounds);
    trackUrls.forEach(url => playSound(url));
}