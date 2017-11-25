import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { EvaluationPage } from '../evaluation/evaluation';



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
    console.log('ionViewDidLoad MainPage');
  }


  goEvaluation(){
    this.navCtrl.push("EvaluationPage");
  }
  goProfile(){
    this.navCtrl.push('ProfilePage');
  }
  changeMenu(menu) {
    // Disables all other sidemenus
    Object.keys(this.MENU).map(k => this.menuCtrl.enable(false, this.MENU[k]));

    // Enables then open the selected menu
    this.menuCtrl.enable(true, menu);
    this.menuCtrl.open(menu);
  }

}
