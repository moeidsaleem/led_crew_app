import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../providers/user/user';
import { leave } from '@angular/core/src/profile/wtf_impl';

/**
 * Generated class for the EvaluationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})



export class EvaluationPage {

  private evaluationCollection: AngularFirestoreCollection<any>;
  evaluations;
  constructor(private loader:LoadingController,public alertCtrl: AlertController,public user:User,private afs:AngularFirestore,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluationPage');
    this.evaluationCollection = this.afs.collection('evaluations', ref=>{
      if(this.user.uid){
        return ref.where('userid', '==',this.user.uid)
        
      }else{
        return ref.where('userid','==',"CvJ3dliJYSNGTS24NbmXv9GCIvz1");
      }
    });
    this.evaluations = this.evaluationCollection.valueChanges();
    
  }

  completeEval(){
    //first prompt a confirm dialog 
    this.showConfirm('Complete Evaluation','Evaluation will be saved to database!').present();
    //first generate a loading 

  }

  submit(){
    //console.log(this.eval);
    const id = this.afs.createId();
    
    //this.empCollection.doc('moeid').set(ep)

  }


  //ALERT Controller 
  showConfirm(title, message) {
    return this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');

          }
        },
        {
          text: 'Finish',
          handler: () => {
            console.log('Agree clicked');
            //show loading
            this.getLoader(1000).present().then(()=>{

               //add to db 
                //return back to dashboard
              this.user.addEvalution();
              return;
            }).then(()=>{
              
              this.navCtrl.setRoot('MainPage');
              
            })
           
            

           


            
          }
        }
      ]
    });
  }


  /* Extra functions */

  getLoader(dur){
    return this.loader.create({
      duration:dur
    });
  }




}
