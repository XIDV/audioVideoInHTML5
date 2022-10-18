document.addEventListener('DOMContentLoaded', dcl => {
    console.log('Document is ready ...');

    
    // Custom-Audio-Controls Konfiguration ####################################
    // Controls
    // const bspl1bAudio = document.querySelector('#bspl1bAudio');
    // const showTimeDuration = document.querySelector('#showTimeDuration');
    // const setVolumeSlider = document.querySelector('#setVolume');
    // const setDurationSlider = document.querySelector('#durationSlider');
    // // Hilfsvariablen
    // let isOverDurSlider = false;
    // let showDuration = 0;

    // Creating an custom-audio-player-Object (cap)
    const cap = {
        audioElement: document.querySelector('#bspl1bAudio'),
        mediaDurationTime: '',
        nowInputCDslider: false,
        
        ppButton: document.querySelector('#bspl1bPlayPause'),
        displayTD: document.querySelector('#showTimeDuration'),
        cdSlider: document.querySelector('#durationSlider'),
        muteButton: document.querySelector('#cMute'),
        volSlider: document.querySelector('#setVolume'),

        playPause() {
            let state = 0;
            if(this.audioElement.paused) {
                this.audioElement.play();
                state = 0;
            } else {
                this.audioElement.pause();
                state = 1;
            }
            this.changeButton('ppButton', state);
        },

        setMute() {
            let state = 0;
            if(this.audioElement.muted) {
                this.audioElement.muted = false;
                state = 0;
            } else {
                this.audioElement.muted = true;
                state = 1;
            }
            this.changeButton('muteButton', state);
        },

        initalizeUI() {
            const mediaDuration = this.audioElement.duration;
            this.mediaDurationTime = getTimeDuration(mediaDuration);
            this.displayTD.textContent = `0 / ${this.mediaDurationTime}`;
            this.cdSlider.setAttribute('max', mediaDuration);
        },

        updateUI() {
            const mediaTime = this.audioElement.currentTime;
            if(!this.nowInputCDslider) {
                this.displayTD.textContent = `${getTimeDuration(mediaTime)} / ${this.mediaDurationTime}`;
                this.cdSlider.value = mediaTime;
            }
        },

        lockCDslider() {
            this.nowInputCDslider = true; 
        },

        setTime() {
            this.audioElement.currentTime = parseFloat(this.cdSlider.value);
            this.nowInputCDslider = false;
        },

        setDisplayTime() {
            this.displayTD.textContent = `${getTimeDuration(this.cdSlider.value)} / ${this.mediaDurationTime}`;
        },

        // Das muss einfacher gehen ....
        changeButton(name, state) {
            console.log(name);
            const buttonImg = this[name].querySelector('img');
            if(name == 'ppButton') {
                if(state == 0) {
                    buttonImg.setAttribute('src', 'media/cuiIMG/pause-solid.svg');
                } else {
                    buttonImg.setAttribute('src', 'media/cuiIMG/play-solid.svg');
                }
            } else if(name == 'muteButton') {
                if(state == 0) {
                    buttonImg.setAttribute('src', 'media/cuiIMG/volume-xmark-solid.svg');
                } else {
                    buttonImg.setAttribute('src', 'media/cuiIMG/volume-high-solid.svg');
                }
            } else {
                console.log('Unbekannte Button-Signatur!');
            }
        }

    }

    cap.audioElement.addEventListener('loadedmetadata', e => cap.initalizeUI());
    cap.audioElement.addEventListener('timeupdate', e => cap.updateUI());
    
    cap.ppButton.addEventListener('click', e => cap.playPause());
    cap.muteButton.addEventListener('click', e => cap.setMute());
    
    cap.cdSlider.addEventListener('mousedown', e => cap.lockCDslider());
    cap.cdSlider.addEventListener('input', e => cap.setDisplayTime());
    cap.cdSlider.addEventListener('mouseup', e => cap.setTime());
    


    // // 
    // bspl1bAudio.addEventListener('loadedmetadata', e => {
    //     console.log('Metadata loaded');
    // });

    // // EL f. Anzeige von currentTime und duration, sowie setDurationSlider
    // bspl1bAudio.addEventListener('timeupdate', e => {
    //     const mediaCurrentTime = Math.round(e.target.currentTime);
    //     showTimeDuration.textContent = `${getTimeDuration(mediaCurrentTime)} / ${showDuration}`;

    //     if(!isOverDurSlider) {
    //         setDurationSlider.value = mediaCurrentTime;
    //     }

    // });

    // // EL f. Initiale Anzeige von showTimeDuration
    // bspl1bAudio.addEventListener('canplaythrough', e => {
    //     const mediaDuration = Math.round(e.target.duration);
    //     showTimeDuration.textContent = `0 / ${mediaDuration}`;
    //     setDurationSlider.setAttribute('max', `${mediaDuration}`);
    //     e.target.volume = .5;
    //     showDuration = getTimeDuration(Math.round(e.target.duration));
    // });
    
    // // EL f. Start/Pause-Button
    // document.querySelector('#bspl1bPlayPause').addEventListener('click', e => {
    //     const playPauseImg = e.target.querySelector('img');
    //     if(bspl1bAudio.paused) {
    //         bspl1bAudio.play();
    //         playPauseImg.setAttribute('src', 'media/cuiIMG/pause-solid.svg');
    //         playPauseImg.setAttribute('alt', 'Pause Audio');
    //     } else {
    //         bspl1bAudio.pause();
    //         playPauseImg.setAttribute('src', 'media/cuiIMG/play-solid.svg');
    //         playPauseImg.setAttribute('alt', 'Play Audio');
    //     }
    // });

    // // EL f. setVolumeSlider
    // setVolumeSlider.addEventListener('input', e => {
    //     bspl1bAudio.volume = parseFloat(e.target.value) / 100;
    // });

    // // EL f. Steuerung des Wertes von isOverSlider-Hilfsvariablen
    // setDurationSlider.addEventListener('mouseover', e => {
    //     isOverDurSlider = true;
    // });
    // setDurationSlider.addEventListener('mouseleave', e => {
    //     isOverDurSlider = false;
    // });

    // // EL f. Wertzuweisung von currentTime von bspl1bAudio i. A. von setDurationSlider value
    // setDurationSlider.addEventListener('mouseup', e => {
    //     bspl1bAudio.currentTime = parseFloat(e.target.value);
    // });

    // // EL f. mute-Button
    // document.querySelector('#cMute').addEventListener('click', e => {
    //     const isMuted = e.target.dataset.ismuted;
    //     const isMutedImg = e.target.querySelector('img');
    //     if(isMuted == 'false') {
    //         e.target.dataset.ismuted = 'true';
    //         isMutedImg.setAttribute('src', 'media/cuiIMG/volume-high-solid.svg');
    //         bspl1bAudio.muted = true;
    //     } else {
    //         e.target.dataset.ismuted = 'false';
    //         isMutedImg.setAttribute('src', 'media/cuiIMG/volume-xmark-solid.svg');
    //         bspl1bAudio.muted = false;
    //     }
    // });

});


function getTimeDuration(trackSeconds) {
    const minutes = Math.floor(trackSeconds / 60);
    const seconds = Math.floor(trackSeconds % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}