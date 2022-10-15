document.addEventListener('DOMContentLoaded', dcl => {
    console.log('Document is ready ...');

    const bspl1bAudio = document.querySelector('#bspl1bAudio');

    document.querySelector('#bspl1bPlayPause').addEventListener('click', e => {
        if(bspl1bAudio.paused) {
            bspl1bAudio.play();
            e.target.textContent = 'Pause';
        } else {
            bspl1bAudio.pause();
            e.target.textContent = 'Play';
        }
    });


    bspl1bAudio.addEventListener('play', e => {
        const showTimeDuration = document.querySelector('#showTimeDuration');
        setInterval(() => {
            showTimeDuration.value = `${Math.round(e.target.currentTime)} / ${Math.round(e.target.duration)}`;

        }, 1000);
    });

});