import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { EvaluationPage } from '../evaluation/evaluation';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
import { TabsPage } from '../tabs/tabs'


interface Employee{
  email:string,
  password:string,
  position:string

}

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  employeeCollection:AngularFirestoreCollection<Employee>;
  private evaluationCollection: AngularFirestoreCollection<any>;  
  employees:Observable<Employee[]>;
  evaluations;

  
  constructor(private afs:AngularFirestore,public user:User,public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController) {
      this.evaluationCollection = this.afs.collection('evaluations', ref=>{
        if(this.user.uid){
          return ref.where('userid', '==',this.user.uid)
          
        }else{
          return ref.where('userid','==','CvJ3dliJYSNGTS24NbmXv9GCIvz1');
        }
      });
      this.evaluations = this.evaluationCollection.valueChanges();
      

  }

  MENU = {
    DEFAULT: 'menu-components',
    MATERIAL: 'menu-material',
    AVATAR: 'menu-avatar',
  };

  ionViewDidLoad() {
    this.user.fetchProfile();
    console.log('ionViewDidLoad MainPage');
    this.user.getBulbs();
    
  }


  getDate(x){
    let date= new Date(x);
    let today = new Date();
    let months = today.getMonth() - date.getMonth();
    let days = today.getDay() - date.getDay();
    let years = today.getFullYear() - date.getFullYear();
    //console.log(months);
    if(years>0){
      return years + ' Year ago';
    }else if(years== 0 && months>0){
       return months + ' months ago.'    
    }else if(years==0 && months==0){
      
      return days + ' days ago';
    }


  }

  goEvaluation(){
    this.navCtrl.push("LocationInfoPage");
  }
  goProfile(){
    this.navCtrl.push("ProfilePage");
  }
  changeMenu(menu) {
    // Disables all other sidemenus
    Object.keys(this.MENU).map(k => this.menuCtrl.enable(false, this.MENU[k]));

    // Enables then open the selected menu
    this.menuCtrl.enable(true, menu);
    this.menuCtrl.open(menu);
  }

}
