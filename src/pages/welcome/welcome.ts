// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, NavController, Slides, IonicPage, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';

/* 

*/

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-5.jpg';
  // Our translated text strings
  private loginErrorString: string;
  loading;
  loginAccount: { email: string, password: string } = {
    email: 'atrix@gmail.com',
    password: 'atrix123'
  };
  resetEmail;
  signupAccount: {name:string, email: string, password: string, confirmPassword:'' } = {
    name:'',
    email: '',
    password: '',
    confirmPassword:''
  };


  constructor(public navCtrl: NavController,   public user: User,
    private loader:LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,    
    public app: App) { }


  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToLogin() {
    this.slider.slideTo(1);
  }

  goToSignup() {
    this.slider.slideTo(2);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  presentLoading() {
    this.loading = this.loader.create({
     
    });
    this.loading.present();
    
  }

  presentAlert(heading, message) {
    this.loading.dismiss();
    this.loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: heading,
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

  }


  login() {
    this.presentLoading();
    this.user.login(this.loginAccount).then((resp)=>{
      this.presentAlert('Success','Logged in');      
      this.navCtrl.setRoot('MainPage');
    }, err=>{
      console.log(err);
     this.presentAlert('error',err);
     this.loginAccount ={email:'',password:''}
      //toast here


    });
    // this.navCtrl.push(HomePage);
  }

  signup() {
    this.presentLoading();
    let data = {name:this.signupAccount.name, email:this.signupAccount.email, password:this.signupAccount.password}
    this.user.signup(data).then((resp)=>{
      this.presentAlert('Success','Thanks for signing up!');      
      this.navCtrl.setRoot('MainPage');
    }, err=>{
      console.log(err);
     this.presentAlert('error',err);
     this.signupAccount ={name:'',email:'',password:'',confirmPassword:''}
      //toast here


    });
  
    // this.navCtrl.push(HomePage);
  }
  resetPassword() {
    this.presentAlert('aa','An e-mail was sent with your new password.');
  }



  
    // // Attempt to login in through our User service
    // doLogin() {
    //   let loading = this.loader.create({
    //     content: "Authenticating..",
    //   });
    //   loading.present();
    //   this.user.login(this.account).then((res: any) => {
    //     // If the API returned a successful response, mark the user as logged in
    //       console.log(res.uid);
    //       this.user.userObservable(res.uid).valueChanges().subscribe(res=>{
    //         this.user._user = res;
    //         console.log(this.user._user);
    //         this.user._loggedIn(res);        
    
    //     if(this.user._user.language!==''){
    //       this.navCtrl.setRoot('ItemDetailPage');
    //       setTimeout(function() {
    //         loading.dismiss();
            
    //       }, 700);        
    //     }else{
    //       loading.dismiss();        
    //       this.navCtrl.push('MainPage');
    //     }
    //   });
      
        
    //   }, err => {
    //     console.error('ERROR', err);
    //   }).catch( (err) => {
    //    // this.navCtrl.push(MainPage);
    //     // Unable to log in
    //     let toast = this.toastCtrl.create({
    //       message: this.loginErrorString,
    //       duration: 3000,
    //       position: 'top'
    //     });
    //     toast.present();
    //   });
    // }
}
