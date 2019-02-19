var playerVideo, view, timer, videoPreloader;

var btnPlay, full;

var hour, min, seg, currentHour, currentMin, currentSeg;

var intervalTimer;

var barProgress, videoLoader, progress;

var pctSeek, pctBar;

var slider, sliderVol, drag;

var btnVol;

var stopB;

var prev, next;

function prepare(elem) {
    if(playerVideo != elem){
        playerVideo = elem;

        prev = playerVideo.querySelector('.video_rewind');

        prev.addEventListener('click',rewind );

        next = playerVideo.querySelector('.video_fast');

        next.addEventListener('click', fast);

        view = playerVideo.querySelector(".video_view");

        timer = playerVideo.querySelector('.video_time');

        stopB = playerVideo.querySelector(".video_stop");

        stopB.addEventListener('click', stop);

        btnVol = playerVideo.querySelector('.video_volume');

        btnVol.addEventListener('click', mute);

        barProgress = playerVideo.querySelector('.video_progress_bar');

        videoLoader = playerVideo.querySelector('.video_loader');

        progress = playerVideo.querySelector('.video_progress');

        barProgress.addEventListener('click', seeker);

        btnPlay = playerVideo.querySelector('.video_play');

        btnPlay.addEventListener('click', play);

        slider = playerVideo.querySelector('.slide');

        sliderVol = playerVideo.querySelector('.slider_vol');

        drag = false;

        slider.addEventListener('mousedown', starDrag);

        slider.addEventListener('mouseup', starDrag);

        slider.addEventListener('mousemove', showVolume);

        intervalTimer = setInterval(updateTimer, 100);

        videoPreloader = playerVideo.querySelector('.video_preloader');

        view.addEventListener('waiting', loader);

        view.addEventListener('playing', loader);

        full = playerVideo.querySelector('.video_screen');

        full.addEventListener('click', fullScreen);

        view.addEventListener('click', play);


    }
}

function fullScreen(){
    if(!document.webkitFullscreenElement){
        playerVideo.webkitRequestFullscreen();
    }else{
        document.webkitExitFullscreen();
    }

}
function rewind() {
    var vid = document.getElementById("myVideo");
    vid.currentSeg = vid.currentSeg - 10;

}

function fast() {
    var vid = document.getElementById("myVideo");
    vid.currentSeg = vid.currentSeg + 10;
}

function stop() {
    var vid = document.getElementById("myVideo");
    if(vid.played.length != 0) {
        if (vid.played.start(0) == 0 && !vid.paused) {
            vid.pause();
            vid.currentTime = 0;
            btnPlay.style.backgroundImage = "url(../_imagens/play-button.png)";
        }else{
            vid.pause();
            vid.currentTime = 0;
            btnPlay.style.backgroundImage = "url(../_imagens/play-button.png)";
        }

}



}

function loader(event) {
    switch (event.type) {
        case 'waiting':
        videoPreloader.style.display = "block";
        break;
        case 'playing':
            videoPreloader.style.display = "none";
            break;
    }
}

function mute() {
    var vid = document.getElementById("myVideo");
    if(!vid.muted){
        vid.muted = true;
        btnVol.style.backgroundImage = "url(../_imagens/volume-off.png)";
    }else{
        vid.muted = false;
        btnVol.style.backgroundImage = "url(../_imagens/reduced-volume.png)";
    }

}

function starDrag(event) {
    if(event.type == "mousedown"){
        drag = true;
    }else{
        drag = false;
    }

}

function showVolume(event) {
    var vid = document.getElementById("myVideo");
    if(drag){
        var w = slider.clientWidth - 2;
        var x = event.clientX - slider.offsetLeft;
        var pctVol = x / w;

        if(x <= 80) {
            sliderVol.style.width = x + "px";
            vid.volume = pctVol;

            if(pctVol <= 0){
                    btnVol.style.backgroundImage = "url(../_imagens/volume-off.png)";
            }else if(pctVol>0 && pctVol<=0.5){
                btnVol.style.backgroundImage = "url(../_imagens/reduced-volume.png)";
            }else{
                btnVol.style.backgroundImage = "url(../_imagens/speaker-filled-audio-tool.png)";
            }

        }else{

        }
    }else{

    }
}

function seeker() {
    var vid = document.getElementById("myVideo");
    pctBar = (event.clientX / barProgress.clientWidth) *100;
    vid.currentTime = (vid.duration * pctBar)/ 100;
}

function play() {
    var vid = document.getElementById("myVideo");
    if(vid.played.length != 0) {
        if (vid.played.start(0) == 0 && !vid.paused) {
            vid.pause();
            btnPlay.style.backgroundImage = "url(../_imagens/play-button.png)";

        }else{
            vid.play();
            btnPlay.style.backgroundImage = "url(../_imagens/pause.png)";
        }
    }else {
        vid.play();
        btnPlay.style.backgroundImage = "url(../_imagens/pause.png)";
    }


}

function updateTimer() {
    var vid = document.getElementById("myVideo");

    bufferedEnd = vid.buffered.end(vid.buffered.length - 1);
    videoLoader.style.width = String((bufferedEnd / vid.duration )*100)+'%';

    pctSeek = (vid.currentTime / vid.duration)*100;
    progress.style.width = String(pctSeek)+"%";


    var vid = document.getElementById("myVideo");
    hour = Math.floor(vid.duration / 3600);
    min = Math.floor(vid.duration / 60);
    seg = Math.floor(((vid.duration / 60)% 1)*60);

    currentHour = Math.floor(vid.currentTime / 3600);
    currentMin = Math.floor(vid.currentTime / 60);
    currentSeg= Math.floor(((vid.currentTime /60)% 1)*60);
    var timeConverted = converteTimer(currentHour, currentMin, currentSeg) +' '+converteTimer(hour, min, seg);
    if(timer != null){
        timer.innerHTML = timeConverted;
    }

}

function converteTimer(horas, minutos, segundos){
    if(horas < 10 && horas > 0){
        horas = '0'+String(horas)+":";
    }else{
        horas = '';
    }
    if(minutos < 10){
        minutos = '0'+String(minutos);
    }else if (minutos >59) {
        minutos = minutos - (Math.floor(minutos/60)*60);
    }

    if(segundos < 10){
        segundos = '0'+String(segundos);
    }
    return String(horas)+String(minutos)+':'+String(segundos);
}