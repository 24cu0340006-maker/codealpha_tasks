const audio =
    document.getElementById("audio");

const playButton =
    document.getElementById("play");

const prevButton =
    document.getElementById("prev");

const nextButton =
    document.getElementById("next");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const title =
    document.getElementById("song-title");

const artist =
    document.getElementById("artist");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const playlistElement =
    document.getElementById("playlist");


/* Songs */

const songs = [

    {
        title: "Dream",
        artist: "Artist One",
        file: "songs/song1.mp3"
    },

    {
        title: "Journey",
        artist: "Artist Two",
        file: "songs/song2.mp3"
    },

    {
        title: "Memories",
        artist: "Artist Three",
        file: "songs/song3.mp3"
    }

];


let currentSong = 0;


/* Load Song */

function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.file;

    updatePlaylist();

}


/* Play Song */

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}


/* Pause Song */

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


/* Play / Pause */

playButton.addEventListener(
    "click",
    function() {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* Previous */

prevButton.addEventListener(
    "click",
    function() {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* Next */

nextButton.addEventListener(
    "click",
    function() {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* Update Progress */

audio.addEventListener(
    "timeupdate",
    function() {

        if (audio.duration) {

            progress.value =
                (audio.currentTime /
                audio.duration) * 100;

        }

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


/* Load Duration */

audio.addEventListener(
    "loadedmetadata",
    function() {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* Change Progress */

progress.addEventListener(
    "input",
    function() {

        audio.currentTime =
            (progress.value / 100) *
            audio.duration;

    }
);


/* Volume */

volume.addEventListener(
    "input",
    function() {

        audio.volume = volume.value;

    }
);


/* Automatically play next song */

audio.addEventListener(
    "ended",
    function() {

        nextButton.click();

    }
);


/* Format Time */

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return minutes + ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0");

}


/* Playlist */

function createPlaylist() {

    songs.forEach(
        function(song, index) {

            const li =
                document.createElement("li");

            li.textContent =
                song.title + " - " +
                song.artist;

            li.addEventListener(
                "click",
                function() {

                    currentSong = index;

                    loadSong(currentSong);

                    playSong();

                }
            );

            playlistElement.appendChild(li);

        }
    );

}


/* Highlight Current Song */

function updatePlaylist() {

    const items =
        playlistElement.querySelectorAll("li");

    items.forEach(
        function(item, index) {

            item.classList.toggle(
                "active",
                index === currentSong
            );

        }
    );

}


/* Start */

createPlaylist();

loadSong(currentSong);