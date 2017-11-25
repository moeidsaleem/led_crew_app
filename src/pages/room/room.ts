import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides, ToastController} from 'ionic-angular';
import { User } from '../../providers/user/user';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  constructor(private toast:ToastController,public user:User,public navCtrl: NavController, public navParams: NavParams) {
  }

  @ViewChild('slider') slider: Slides;
  
  slideNext() {
    console.log(this.user.dummyRoom);
    this.slider.slideNext();
  }
  slidePrevious() {
    console.log(this.user.dummyRoom);    
    this.slider.slidePrev();
  }

  goToSlider(num) {
    this.slider.slideTo(num);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }


  finish(){
    //first push the room data to dummyData 
    this.user.dummyData.rooms.push(this.user.dummyRoom);
    console.log(this.user.dummyData);

    //clear Room data
    this.user.clearRoom();

    //generate a toast
    this.getToast('Room Added!',1200).present();

    //goBack 
    this.navCtrl.pop();
  }
  addRoom(){
    //submit the previous room data 
    this.user.dummyData.rooms.push(this.user.dummyRoom);
    console.log(this.user.dummyData);


    //generate a toast
    this.getToast('Room Added!',1500).present();

    // Go TO the first slide
    this.slider.slideTo(1);
  }


/* Extra funtions */
getToast(msg, duration){
  return this.toast.create({
    message:msg,
    duration:duration
  });
}
}
