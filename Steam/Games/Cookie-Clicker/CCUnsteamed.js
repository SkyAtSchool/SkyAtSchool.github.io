(function() {
    var audio;
    var prevCookieClicks = Game.cookieClicks;
    var prevElderWrath = Game.elderWrath; // Track the previous Elder Wrath state
    var prevAscendTimer = Game.AscendTimer; // Track the previous Ascend Timer value
    var hasRunOnce = false; // Flag to track if the code has run once
    var activeAudioURL = ''; // To track the active audio URL

    // Preload the audio files
    var clickAudio = new Audio('https://github.com/SkyAtSchool/SkyAtSchool.github.io/raw/main/Steam/Games/Cookie-Clicker/music/02.%20Click.flac');
    clickAudio.preload = 'auto';

    var hoverAudio = new Audio('https://github.com/SkyAtSchool/SkyAtSchool.github.io/raw/main/Steam/Games/Cookie-Clicker/music/01.%20Hover.flac');
    hoverAudio.preload = 'auto';

    var elderWrathAudio = new Audio('https://github.com/SkyAtSchool/SkyAtSchool.github.io/raw/main/Steam/Games/Cookie-Clicker/music/03.%20Grandma%20Pocalypse.flac'); // Replace with the actual URL
    elderWrathAudio.preload = 'auto';

    var ascendAudio = new Audio('https://github.com/SkyAtSchool/SkyAtSchool.github.io/raw/main/Steam/Games/Cookie-Clicker/music/04.%20Ascend.flac'); // Replace with the actual URL
    ascendAudio.preload = 'auto';

    function fadeOut(audio) {
        var initialVolume = audio.volume;
        var fadeDuration = 2000; // 3 seconds in milliseconds
        var fadeIntervalTime = 150; // Interval time for updating the volume
    
        var volumeStep = initialVolume / (fadeDuration / fadeIntervalTime);
        var currentVolume = initialVolume;
    
        var fadeInterval = setInterval(function() {
            if (currentVolume > 0) {
                currentVolume -= volumeStep;
                audio.volume = Math.max(currentVolume, 0); // Ensure volume doesn't go negative
            } else {
                audio.pause();
                audio.volume = initialVolume; // Reset volume to original value
                clearInterval(fadeInterval);
            }
        }, fadeIntervalTime);
    }
    
    


    function updateAudio() {
        var currentCookieClicks = Game.cookieClicks;
        var currentElderWrath = Game.elderWrath;
        var currentAscendTimer = Game.AscendTimer;
        var currentOnAscend = Game.OnAscend;

        if (!hasRunOnce || currentCookieClicks !== prevCookieClicks || currentElderWrath !== prevElderWrath || currentAscendTimer !== prevAscendTimer) {
            if (currentElderWrath === 3 && activeAudioURL !== elderWrathAudio.src) {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.muted = true;
                }
                audio = elderWrathAudio;
                audio.volume = 1.0
                audio.loop = true; // Enable looping
                activeAudioURL = elderWrathAudio.src; // Update active audio URL
                audio.muted = false;
            } else if (currentCookieClicks !== 0 && activeAudioURL !== clickAudio.src) {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.muted = true;
                }
                audio = clickAudio;
                audio.volume = 1.0
                audio.loop = true; // Enable looping
                activeAudioURL = clickAudio.src; // Update active audio URL
                audio.muted = false;
            } else if (currentCookieClicks === 0 && activeAudioURL !== hoverAudio.src) {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.muted = true;
                }
                audio = hoverAudio;
                audio.volume = 1.0
                audio.loop = true; // Enable looping
                activeAudioURL = hoverAudio.src; // Update active audio URL
                audio.muted = false;
            }

            // Check if ascending
            if (currentOnAscend === 1 && activeAudioURL !== ascendAudio.src) {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.muted = true;
                }
                audio = ascendAudio;
                audio.volume = 1.0
                audio.loop = true; // Enable looping
                activeAudioURL = ascendAudio.src; // Update active audio URL
                audio.muted = false;
            }

            // Mute audio when AscendTimer is not equal to 0
            if (currentAscendTimer !== 0) {
                if (audio) {
                    fadeOut(audio);
                }
            }

            audio.addEventListener('canplay', () => {
                audio.play();
            });

            prevCookieClicks = currentCookieClicks;
            prevElderWrath = currentElderWrath;
            prevAscendTimer = currentAscendTimer;
            hasRunOnce = true; // Set the flag to true after the first run
        }
    }

    updateAudio();

    window.addEventListener('blur', () => {
        if (audio) {
            audio.muted = true;
        }
    });

    window.addEventListener('focus', () => {
        if (audio) {
            audio.muted = false;
        }
    });

    setInterval(updateAudio, 1); // Check for updates every millisecond

    // Function to get the active audio URL
    function getActiveAudioURL() {
        return activeAudioURL;
    }

    // Now you can call getActiveAudioURL() to retrieve the active audio URL
})();
