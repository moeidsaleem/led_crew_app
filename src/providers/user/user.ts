import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { APP_ID_RANDOM_PROVIDER } from '@angular/core/src/application_tokens';


export interface employee{
  id:string,
  name:string,
  email:string,
  password:string,
  position:string
}

export interface evaluation{
  userid:string,
  id:string,
  business_name:string,
  utility:string,
  type:string,
  hours:string,
  person:string,
  phone:Number,
  date:Date,
  address:Object,
  rooms:Array<string>,

}
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */



@Injectable()
export class User {
  _user: any;
  uid;

//dummy ID = CvJ3dliJYSNGTS24NbmXv9GCIvz1

  
  public dummyRoom= {
    room_type:'',
    existingLights:{
      existing_fixture:'',
      no_of_fixture:null,
      existing_bulb:'',
      wattage:'',
      no_of_bulb:null,
      img:''
    },
    replacement:{
      replace:false,
      bulb_type:'',
      wattage:'',
      special_instruction:'',

    }

  }
 public dummyData={
    location_info:{
      business_name:'',
      address:'',
      utility:'',
      type:'',
      hours:'',
      person:'',
      phone:'',
      date:''
    },
    rooms:[],
    userid:this.uid || 'CvJ3dliJYSNGTS24NbmXv9GCIvz1'

  }

  empCollection: AngularFirestoreCollection<employee>;
  evaluationCollection: AngularFirestoreCollection<any>;
  
  constructor(private fb:AngularFireDatabase, private afs:AngularFirestore,public api: Api,private afAuth: AngularFireAuth) {

    this.empCollection = afs.collection<employee>('employees');
    this.evaluationCollection = afs.collection('evaluations');


    


    
   }

data;



clearEvaluation(){
  this.dummyData={
    location_info:{
      business_name:'',
      address:'',
      utility:'',
      type:'',
      hours:'',
      person:'',
      phone:'',
      date:''
    },
    rooms:[],
    userid:''

  }

}
clearRoom(){
  this.dummyRoom= {
    room_type:'',
    existingLights:{
      existing_fixture:'',
      no_of_fixture:null,
      existing_bulb:'',
      wattage:'',
      no_of_bulb:null,
      img:''
    },
    replacement:{
      replace:false,
      bulb_type:'',
      wattage:'',
      special_instruction:'',

    }

  }

}




   addEvalution(){
     //first we will get the data from service
     let data = this.dummyData;
      if(this.uid){
        this.dummyData.userid = this.uid
      }else{
        this.dummyData.userid = 'CvJ3dliJYSNGTS24NbmXv9GCIvz1';
      }
      console.log(data);
      
     //now push the data to the firebase
     this.evaluationCollection.add(data);
       }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    console.log(accountInfo);
     let seq=   this.afAuth.auth
    .signInWithEmailAndPassword(accountInfo.email,accountInfo.password).then(resp=>{
      this.uid = resp.uid;
      console.log(resp.uid);
    this.afs.collection('employees').doc(resp.uid).snapshotChanges().subscribe(res=>{
      console.log(res.payload.data);
    })
    })
    return seq;
  }


fetchEvaluations(){

}

 
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq=   this.afAuth.auth
    .createUserWithEmailAndPassword(accountInfo.email,accountInfo.password);

    seq.then((res: any) => {
      console.log(res);
      
      let data ={
        email:accountInfo.email,
        password:accountInfo.password,
        name:accountInfo.name,
        position:'',
        id:res.uid
      }
      this.empCollection.doc(res.uid).set(data).then(res=>{
        console.log(res);
        this._user = data;
        console.log('user added');
        this._loggedIn(accountInfo);
        
      },err=>{
        console.log(err);
      })




      // let userObj = this.fb.object('users/'+res.uid);
      // accountInfo.uid = res.uid;
      // accountInfo.premium = false;
      // accountInfo.language ='';
      // accountInfo.learning ='';
      // console.log(accountInfo);
      // userObj.set(accountInfo).then(r=>{
      //   console.log('user added');
      //   this._loggedIn(accountInfo);
        
      // });
      // If the API returned a successful response, mark the user as logged in
   
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  userObservable(uid){
   return this.fb.object('users/'+uid);
    
  }
  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp)  {
    console.log(resp);
    this._user = resp;
  }
  setLang(item){
    this.userObservable(this._user.uid).update({
      language:item.name
    }).then(()=>{
      this.userObservable(this._user.uid).valueChanges().subscribe(res=>{
        this._user = res;
        console.log(this._user);
    })

  });
  }




  setLearn(item){
    this.userObservable(this._user.uid).update({
      learning:item.name
    }).then(()=>{
      this.userObservable(this._user.uid).valueChanges().subscribe(res=>{
        this._user = res;
        console.log(this._user);
    })

  });


  }

  getWord(){
    return this.fb.object('languages/'+this._user.learning).valueChanges(); 
  }
}
