import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'infoq1@atrixdigital.com',
    password: 'test123'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    private loader:LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }


 
  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loader.create({
      content: "Authenticating..",
    });
    loading.present();

    this.user.login(this.account).then((res: any) => {
      // If the API returned a successful response, mark the user as logged in
        console.log(res.uid);
        this.user.userObservable(res.uid).valueChanges().subscribe(res=>{
          this.user._user = res;
          console.log(this.user._user);
          this.user._loggedIn(res);        
  
      if(this.user._user.language!==''){
        this.navCtrl.setRoot('ItemDetailPage');
        setTimeout(function() {
          loading.dismiss();
          
        }, 700);        
      }else{
        loading.dismiss();        
        this.navCtrl.push(MainPage);
      }
    });
    
      
    }, err => {
      console.error('ERROR', err);
    }).catch( (err) => {
     // this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
