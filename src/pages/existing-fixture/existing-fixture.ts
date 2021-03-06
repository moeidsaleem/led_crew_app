import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, ToastController, Content, LoadingController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Camera ,CameraOptions} from '@ionic-native/camera';
/**
 * Generated class for the ExistingFixturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-existing-fixture',
  templateUrl: 'existing-fixture.html',
})
export class ExistingFixturePage {
bulbs:any;
pageid:any;

existingx:boolean;
replacementx:boolean;
generalx:boolean;



  constructor(public camera:Camera,private loading:LoadingController,private toast:ToastController,public modalCtrl:ModalController,
    public user:User,public navCtrl: NavController, public navParams: NavParams) {
  }
  @ViewChild(Content) content: Content;
  wattages;

  ionViewDidLoad() {
    this.wattages = this.user.getWattages();
  //  this.pageid = this.navCtrl.getActive().id.toString();
  //this.pageid ='a';
  this.generalx =true;
  this.replacementx  =false;
  this.existingx =false;
    console.log('ionViewDidLoad ExistingFixturePage');
    let l = this.loading.create();
    l.present();
   this.bulbs= this.user.getBulbs();  
   setTimeout(() => {
      l.dismiss();
   }, 1200);
   
  }


  
  addAnother(){
    //save the current 
    this.user.dummyRoom.existingFixtures.push(this.user.dummyExistingFixture);
    //clear the current
    this.user.clearExistingFixture();

    //show some loading
    let loader =this.loading.create();
    loader.present();
    setTimeout(()=>{
      this.content.scrollToTop();      
      loader.dismiss();
       //generate a toast
    this.getToast(' Fixture Added!',900).present();
    this.goToSlide(0, 'general');
    },1200);
    
      

  }
  scrollToTop() {
    this.content.scrollToTop();
  }

  saveExistingFixture() {
    //first add the dummy ExistingFixture data to the dummyRoom
    this.user.dummyRoom.existingFixtures.push(this.user.dummyExistingFixture);

    console.log(this.user.dummyRoom);

    //clear Dummy Existing Fixture data
   this.user.clearExistingFixture();

    //generate a toast
    this.getToast('Existing Fixture Added!',1200).present();

    //goBack 
    this.navCtrl.push('RoomPage');
  }



openTypeModal(type){
  let data = {type:type}
  let modal = this.modalCtrl.create('ModalBulbTypePage',data);  
  modal.present();
}


sourceSelection;
//camera functions
takePicture(source){
  if(source=="camera"){
     this.sourceSelection = this.camera.PictureSourceType.CAMERA
}else if(source=="gallery"){
     this.sourceSelection = this.camera.PictureSourceType.PHOTOLIBRARY
}
   this.camera.getPicture({
     sourceType:this.sourceSelection,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE
 //      targetWidth: 1000,
 //      targetHeight: 1000
   }).then((imageData) => {
     // imageData is a base64 encoded string
       this.user.dummyExistingFixture.img = "data:image/jpeg;base64," + imageData;
    
   }, (err) => {
       console.log(err);
   });
}

// Slider functions
 // Slider methods
 @ViewChild('slider') slider: Slides;
//  @ViewChild('innerSlider') innerSlider: Slides;


 slideNext(page) {
  this.slider.slideNext();
  this.checkk(page);
}

slidePrevious() {
  this.slider.slidePrev();
}
goToSlide(x,page) {
  this.slider.slideTo(x);
   this.checkk(page);
}

checkk(value){
  console.log(value);

if(value =='general'){
  this.generalx = true;
  this.existingx =false;
  this.replacementx = false;
}else if(value == 'existing'){
  this.generalx = false;
  this.existingx =true;
  this.replacementx = false;
}else if(value =='replacement'){
  this.generalx = false;
  this.existingx =false;
  this.replacementx = true;
}else if(value =='final'){
  this.generalx = false;
  this.existingx =false;
  this.replacementx = false;
}
 
  
}

/* Extra funtions */
getToast(msg, duration){
  return this.toast.create({
    message:msg,
    duration:duration
  });
}




}
