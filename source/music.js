let isPlaying = false;

const musicList = [
    new Audio("assets/audio/menu01.mp3"),
    new Audio("assets/audio/menu02.mp3")
];

function getRandomAudio(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function playAudio() {
    isPlaying = true;

    const audio = getRandomAudio(musicList);
    audio.loop = false;
    audio.play();

    audio.addEventListener('ended', function() {
        playAudio();
        isPlaying = false;
    });
}

document.addEventListener('click', function() {
    if(!isPlaying) {
        playAudio();
    }
});