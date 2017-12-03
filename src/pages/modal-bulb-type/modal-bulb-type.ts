import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../providers/providers';

/**
 * Generated class for the ModalBulbTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-bulb-type',
  templateUrl: 'modal-bulb-type.html',
})
export class ModalBulbTypePage {

  constructor(public user:User,public viewCtrl : ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  bulbs:any;
  ionViewDidLoad() {
    this.bulbs= this.user.getBulbs();      
    console.log('ionViewDidLoad ModalBulbTypePage');
  }
 public selected(val){
  console.log('ionViewDidLoad ModalPage');
  console.log(this.navParams.get('type'));
  let t = this.navParams.get('type');
  if(t === 'existing'){
    this.user.dummyExistingFixture.existing_bulb = val;
    
  }else if(t === 'replacement'){
    this.user.dummyExistingFixture.replacement_bulb = val;
    
  }
  this.viewCtrl.dismiss();
 }
  public closeModal(){
    this.viewCtrl.dismiss();
}

}
