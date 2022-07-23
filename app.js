// Initialize the Variables : 

let songIndex = 0;
let audioElement = new Audio("Music/Baarishon Mein.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songName = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById("masterSongName");
let songItemPlay = document.getElementsByClassName("songItemPlay");
let timeStamp = document.getElementsByClassName("timestamp");
let backgroundImage = document.getElementById("backgroundImg");

let songs = [ 
    {songName : "Baarishon Mein" , filePath : "Music/Baarishon Mein.mp3" , coverPath : "covers/1.jpg"},
    {songName : "Ab Phirse Jab Baarish" , filePath : "Music/Ab Phirse Jab Baarish.mp3" , coverPath : "covers/2.jpg"},
    {songName : "Asal Mein" , filePath : "Asal Mein.mp3" , coverPath : "covers/3.jpg"},
    {songName : "Baarish Lete Aana" , filePath : "Baarish Lete Aana.mp3" , coverPath : "covers/4.jpg"},
    {songName : "Ye Baarish" , filePath : "Ye Baarish.mp3" , coverPath : "covers/5.jpg"},
    {songName : "Memories" , filePath : "Memories.mp3" , coverPath : "covers/6.jpg"},
]

songName.forEach((element , i) => {
    element.getElementsByClassName("coverImg")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click' , (e)=>{
    
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');
        gif.style.opacity = 1;
        TimeStamp();
        backgroundImage.innerHTML = `<img src ="${songs[songIndex].coverPath}">`;
        makeAllPause();
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('bi-pause');
        masterPlay.classList.add('bi-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }

})

let updateTimer;

updateTimer = setInterval(TimeStamp, 1000);

audioElement.addEventListener('timeupdate' , () => { 

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100 ;
})

function TimeStamp () {
    
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);

    if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
    if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
    if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    document.getElementById("timeStampStart").innerText = `${currentMinutes}:${currentSeconds}`;
    document.getElementById("timeStampEnd").innerText = `${durationMinutes}:${durationSeconds}`;

}

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element , index) => {
        if(index == songIndex){
            element.classList.remove('bi-pause');
            element.classList.add('bi-play');
        }
    })
}

const makeAllPause = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element , index) => {
        if(index == songIndex){
            element.classList.remove('bi-play');
            element.classList.add('bi-pause');
        }
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click' , (e) => {
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        masterSongName.innerText =  songs[songIndex].songName;
        backgroundImage.innerHTML = `<img src ="${songs[songIndex].coverPath}">`;
        audioElement.src = `Music/${songs[songIndex].songName}.mp3`;

        e.target.classList.remove('bi-play');
        e.target.classList.add('bi-pause');    
        
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');



    })
})

document.getElementById('next').addEventListener('click' , (e) => {

    if(songIndex >= 5){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }

    let clickEvent = new MouseEvent('click');

    audioElement.src = `Music/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText =  songs[songIndex].songName;
    backgroundImage.innerHTML = `<img src ="${songs[songIndex].coverPath}">`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('bi-play');
    masterPlay.classList.add('bi-pause');

})

document.getElementById('previous').addEventListener('click' , () => {
    if(songIndex <= 0){
        songIndex = 5;
    }
    else{
        songIndex = songIndex - 1;
    }
    
    audioElement.src = `Music/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText =  songs[songIndex].songName;
    backgroundImage.innerHTML = `<img src ="${songs[songIndex].coverPath}">`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('bi-play');
    masterPlay.classList.add('bi-pause');
})


