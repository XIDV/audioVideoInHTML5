document.addEventListener('DOMContentLoaded', dcl => {
    console.log('Document is ready ...');

    // Creating an custom-audio-player-Object (cap) ###########################
    const cap = {
        // Definition der Eigenschaften von cap +++++++++++++++++++++++++++++++
        audioElement: document.querySelector('#bspl1bAudio'),
        mediaDurationTime: '',
        nowInputCDslider: false,
        
        ppButton: document.querySelector('#bspl1bPlayPause'),
        displayTD: document.querySelector('#showTimeDuration'),
        cdSlider: document.querySelector('#durationSlider'),
        muteButton: document.querySelector('#cMute'),
        volSlider: document.querySelector('#setVolume'),

        
        // Methoden von cap +++++++++++++++++++++++++++++++++++++++++++++++++++
        
        // Verarbeitung und Anpassung der Schaltflächen -----------------------
        playPause() {
            if(this.audioElement.paused) {
                this.audioElement.play();
                this.changeButton('ppButton', 'active');
            } else {
                this.audioElement.pause();
                this.changeButton('ppButton', 'inactive');
            }
        },

        setMute() {
            if(this.audioElement.muted) {
                this.audioElement.muted = false;
                if(this.audioElement.volume == 0) {
                    this.audioElement.volume = .25;
                    this.volSlider.value = .25;
                }
                this.changeButton('muteButton', 'active');
            } else {
                this.audioElement.muted = true;
                this.changeButton('muteButton', 'inactive');
            }
            
        },

        changeButton(name, state) {
            const buttonIcons = {
                ppButton: {
                    icons: {
                        active: 'media/cuiIMG/pause-solid.svg',
                        inactive: 'media/cuiIMG/play-solid.svg'
                    }
                },
                muteButton: {
                    icons: {
                        active: 'media/cuiIMG/volume-xmark-solid.svg',
                        inactive: 'media/cuiIMG/volume-high-solid.svg'
                    }
                }
            };
            
            const buttonImg = this[name].querySelector('img');
            buttonImg.setAttribute('src', buttonIcons[name].icons[state]);
            
        },

        // Initialiserung und Anpassung während der Wiedergabe ----------------
        initalizeUI() {
            const mediaDuration = this.audioElement.duration;
            this.mediaDurationTime = getTimeDuration(mediaDuration);
            this.displayTD.textContent = `0 / ${this.mediaDurationTime}`;
            this.cdSlider.setAttribute('max', mediaDuration);
            console.log(this.volSlider.value);
            this.audioElement.volume = this.volSlider.value / 100;
        },

        updateUI() {
            const mediaTime = this.audioElement.currentTime;
            if(!this.nowInputCDslider) {
                this.displayTD.textContent = `${getTimeDuration(mediaTime)} / ${this.mediaDurationTime}`;
                this.cdSlider.value = mediaTime;
            }
        },

        // Verarbeitung d. Slider-Inputs --------------------------------------
        // f. cdSlider
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

        // f. volSlider
        setVolume() {
            const currentVol = this.volSlider.value;
            this.audioElement.volume = currentVol;
            if(currentVol == 0 && !this.audioElement.muted) {
                this.setMute();
            } else if(currentVol > 0 && this.audioElement.muted) {
                this.setMute();
            }
        }

        // ####################################################################

    }

    //EL f. cap
    cap.audioElement.addEventListener('loadedmetadata', e => cap.initalizeUI());
    cap.audioElement.addEventListener('timeupdate', e => cap.updateUI());
    
    cap.ppButton.addEventListener('click', e => cap.playPause());
    cap.muteButton.addEventListener('click', e => cap.setMute());
    
    cap.cdSlider.addEventListener('mousedown', e => cap.lockCDslider());
    cap.cdSlider.addEventListener('input', e => cap.setDisplayTime());
    cap.cdSlider.addEventListener('mouseup', e => cap.setTime());

    cap.volSlider.addEventListener('input', e => cap.setVolume());

});


function getTimeDuration(trackSeconds) {
    const minutes = Math.floor(trackSeconds / 60);
    const seconds = Math.floor(trackSeconds % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}