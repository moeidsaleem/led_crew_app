import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';

/**
 * Generated class for the LocationInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-info',
  templateUrl: 'location-info.html',
})
export class LocationInfoPage {

  constructor(private toast:ToastController, private user:User,public navCtrl: NavController, public navParams: NavParams) {
  }

  onSubmit(){
    //this.user.dummyData.location_info = this.location_data;
    console.log(this.user.dummyData.location_info);
     let b=  this.toast.create({
      message:'Location Info Updated.',
      duration:1200
    })
    b.present();
    this.navCtrl.pop();
    //this.user.dummyData.location_info = this.location_data;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationInfoPage');
  }

}
