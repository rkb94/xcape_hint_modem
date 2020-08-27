import {Component} from '@angular/core';

var roomNum = '2'; // 방 번호 변경
var roomSite = 'https://xcapehint.herokuapp.com/page/xcape_gangnam/room' + roomNum + '_gangnam.html'

var bell = new Audio('assets/mp3/bell.mp3');

window.addEventListener( 'message', function( e ) {
  if(e.data == 'receiveHint'){
    bell.play();
  }
} );

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
  
  playVideo(){
    let video = <HTMLMediaElement>document.getElementById('myvideo');
    video.src = 'assets/video/room' + roomNum + '.mp4';
    video.style.width = "100%";
    video.play();
    document.querySelector('ion-content').scrollToBottom(200);
  }
  
  resetPage(){
    let iframe = document.getElementById('mainPage') as HTMLIFrameElement;
    iframe.contentWindow.postMessage('resetPage', roomSite);
    document.getElementById('mainPage').style.display = "none";
    let video = <HTMLMediaElement>document.getElementById('myvideo');
    let audio = <HTMLMediaElement>document.getElementById("myAudio");
    video.style.display = "block";
    video.pause();
    video.currentTime = 1;
    audio.pause();
    audio.currentTime = 0;
    document.querySelector('ion-content').scrollToTop(200);
  }

  videoEnd(){
    let audio = <HTMLMediaElement>document.getElementById("myAudio");
    audio.play();
    audio.loop = true;
    document.getElementById('myvideo').style.display = "none";
    document.getElementById('mainPage').style.display = "block";
    let iframe = document.getElementById('mainPage') as HTMLIFrameElement;
    iframe.contentWindow.postMessage('playStart', roomSite);
  }
}
