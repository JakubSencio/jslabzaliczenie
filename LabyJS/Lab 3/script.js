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
        console.log(`Playing sound: ${sound}`);
        playSound(sound);
    } 
});

function playSound(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.arrayBuffer();
        })
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
            console.log(`Sound played: ${url}`);
        })
        .catch(error => console.error(`Error playing sound: ${error}`));
}

function playAllTracks() {
    const trackUrls = Object.values(sounds);
    trackUrls.forEach(url => playSound(url));
}