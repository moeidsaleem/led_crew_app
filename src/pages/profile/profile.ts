import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { ToastService } from '../../providers/util/toast.service';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private callNumber: CallNumber,public user:User,public toastCtrl: ToastService,public navCtrl: NavController, public navParams: NavParams) {
  }
  
evaluations;
  ionViewDidLoad() {
 
      this.user.fetchProfile()
    console.log('ionViewDidLoad ProfilePage');
    this.user.fetchEvaluations(100).subscribe(res=>{
      console.log(res);
      this.evaluations = res; 
      
      
    })
  }

  call(num){    
      this.callNumber.callNumber(num, false)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
   }

  goSetting(){
    this.navCtrl.push('ProfileSettingsPage')
  }


  following = false;
  // user = {
  //   name: 'Paula Bolliger',
  //   avatar: 'assets/img/avatar/girl-avatar.png',
  //   cover: 'assets/img/background/background-5.jpg',
  //   occupation: 'Designer',
  //   location: 'Seattle, WA',
  //   description: 'A wise man once said: The more you do something, the better you will become at it.',
  //   followers: 456,
  //   following: 1052,
  //   posts: 35
  // };

  posts = [
    {
      postImageUrl: 'assets/img/background/background-2.jpg',
      text: `I believe in being strong when everything seems to be going wrong.
             I believe that happy girls are the prettiest girls.
             I believe that tomorrow is another day and I believe in miracles.`,
      date: 'November 5, 2016',
      likes: 12,
      comments: 4,
      timestamp: '11h ago'
    },
    {
      postImageUrl: 'assets/img/background/background-3.jpg',
      text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
      date: 'October 23, 2016',
      likes: 30,
      comments: 64,
      timestamp: '30d ago'
    },
    {
      postImageUrl: 'assets/img/background/background-4.jpg',
      date: 'June 28, 2016',
      likes: 46,
      text: `Hope is the thing with feathers that perches in the soul
             and sings the tune without the words And never stops at all.`,
      comments: 66,
      timestamp: '4mo ago'
    },
  ];



  follow() {
    this.following = !this.following;
    this.toastCtrl.create('Follow user clicked');
  }

  imageTapped(post) {
    this.toastCtrl.create('Post image clicked');
  }

  comment(post) {
    this.toastCtrl.create('Comments clicked');
  }

  like(post) {
    this.toastCtrl.create('Like clicked');
  }

}
