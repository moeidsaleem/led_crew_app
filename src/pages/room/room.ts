import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides, ToastController, AlertController} from 'ionic-angular';
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

  constructor(private alertCtrl:AlertController,private toast:ToastController,public user:User,public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }


  addRoom(){
    //submit the previous room data 
    this.user.dummyData.rooms.push(this.user.dummyRoom);
    console.log(this.user.dummyData);



    //  Shall clear the Dummy Room Data or not?
    

    //generate a toast
    this.getToast('Room Added!',1500).present();


    // Go TO the first slide
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Save Room Data?',
      message: 'Do you want to add another room data or finish to save data and go back?',
      buttons: [
        {
          text: 'Add Room',
          handler: () => {
            console.log('Add more rooms');
            this.addRoom();
             

          }
        },
        {
          text: 'Finish',
          handler: () => {
            console.log('Agree clicked');
            this.addRoom();
            //clear room data 
            this.user.clearRoom();
            this.navCtrl.setRoot('RoomsPage');
            
          }
        }
      ]
    });
    confirm.present();
  }


/* Extra funtions */
getToast(msg, duration){
  return this.toast.create({
    message:msg,
    duration:duration
  });
}
}
