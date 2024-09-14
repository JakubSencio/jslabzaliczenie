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
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load sound: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    } catch (error) {
        console.error(`Error playing sound: ${error}`);
    }
}

function playAllTracks() {
    const trackUrls = Object.values(sounds);
    trackUrls.forEach(url => playSound(url));
}
