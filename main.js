document.addEventListener('DOMContentLoaded', dcl => {
    console.log('Document is ready ...');

    
    // Custom-Audio-Controls Konfiguration ####################################
    // Controls
    const bspl1bAudio = document.querySelector('#bspl1bAudio');
    const showTimeDuration = document.querySelector('#showTimeDuration');
    const setVolumeSlider = document.querySelector('#setVolume');
    const setDurationSlider = document.querySelector('#durationSlider');
    // Hilfsvariablen
    let isOverDurSlider = false;

    // EL f. Anzeige von currentTime und duration, sowie setDurationSlider
    bspl1bAudio.addEventListener('timeupdate', e => {
        const mediaCurrentTime = Math.round(e.target.currentTime);
        showTimeDuration.value = `${mediaCurrentTime} / ${Math.round(e.target.duration)}`;

        if(!isOverDurSlider) {
            setDurationSlider.value = mediaCurrentTime;
        }

    });

    // EL f. Initiale Anzeige von showTimeDuration
    bspl1bAudio.addEventListener('canplaythrough', e => {
        const mediaDuration = Math.round(e.target.duration);
        showTimeDuration.value = `0 / ${mediaDuration}`;
        setDurationSlider.setAttribute('max', `${mediaDuration}`);
    });
    
    // EL f. Start/Pause-Button
    document.querySelector('#bspl1bPlayPause').addEventListener('click', e => {
        if(bspl1bAudio.paused) {
            bspl1bAudio.play();
            e.target.textContent = 'Pause';
        } else {
            bspl1bAudio.pause();
            e.target.textContent = 'Play';
        }
    });

    // EL f. setVolumeSlider
    setVolumeSlider.addEventListener('input', e => {
        bspl1bAudio.volume = parseFloat(e.target.value) / 100;
    });

    // EL f. Steuerung des Wertes von isOverSlider-Hilfsvariablen
    setDurationSlider.addEventListener('mouseover', e => {
        isOverDurSlider = true;
    });
    setDurationSlider.addEventListener('mouseleave', e => {
        isOverDurSlider = false;
    });

    // EL f. Wertzuweisung von currentTime von bspl1bAudio i. A. von setDurationSlider value
    setDurationSlider.addEventListener('mouseup', e => {
        bspl1bAudio.currentTime = parseFloat(e.target.value);
    });

});