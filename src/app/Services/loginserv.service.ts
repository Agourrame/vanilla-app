import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth,signInWithCredential,PhoneAuthProvider,RecaptchaVerifier, signInWithPopup,sendPasswordResetEmail,createUserWithEmailAndPassword,signInWithPhoneNumber, signInWithEmailAndPassword ,signOut,GoogleAuthProvider,FacebookAuthProvider, onAuthStateChanged } from "firebase/auth";
import { user } from '../Module/user';
import { addDoc, collection, Firestore, doc, query, where, getDocs, collectionData, updateDoc, deleteDoc, docData, docSnapshots, getFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastController, isPlatform } from '@ionic/angular';

import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth';
import { NonNullableFormBuilder } from '@angular/forms';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class LoginservService  {
  islogin:boolean=false;
  isloading:boolean=false;
  issinup:boolean=false;

  thenewuser:string='';
  theidofuser:string='';



  constructor(private router:Router,public fire:Firestore,private toastController: ToastController) {
    if(!isPlatform('capacitor')){
        GoogleAuth.initialize();
    }
   }

  getisloaiding(){
    return this.isloading;
  }

  getidofuser(){
    return this.getidofuser;
  }

  getuseremail(){
     return this.thenewuser
  }

  getislogin(){
    return this.islogin;
  }
  getissinup(){
    return this.issinup;
  }

  loginwithgoogle(){

    if(this.islogin){return;}

    this.isloading=true;
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((result) => {
      const credential:any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      this.islogin=true;
      this.router.navigate(['/home'])

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      this.islogin=false;

    })
    .finally(()=>(this.isloading=false));
}

logout(){

  this.Googlelogout();

  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.

    this.router.navigate(['/vanillaloading']);

    this.islogin=false;
  }).catch((error) => {
    // An error happened.
  });
}


   sinup(userd:user){

    if(this.issinup){return;}
    this.issinup=true;
    this.isloading=true;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth,userd.email,userd.password)
      .then((userCredential) => {
        userd.id=this.theidofuser.toString();
        this.adduser(userd);
        this.router.navigate(['/loginpage']);
      })
      .catch((error) => {
          alert("this email already exist !!")
      })
      .finally(()=>(this.isloading=false))

   }

   login(form:user){

    if(this.islogin){return;}
    this.isloading=true;

   const auth = getAuth();
  signInWithEmailAndPassword(auth,form.email,form.password)
 .then((user) => {
   if(user){
     this.thenewuser=user.user.email;
     console.log(user.user.email);
     console.log();
   }
        this.islogin=true;
        //alert("you login seccss")
        this.router.navigate(['/home']);
   })
     .catch((error) => {
        this.islogin=false;
        alert("your email or password are not correct !!")
   })

      .finally(()=>(this.isloading=false));
   }


   adduser(form:user){
    const db=collection(this.fire,'users')
    addDoc(db,form)
    .then((doc)=>{
      this.theidofuser=doc.id;
        console.log(doc.id);
    })
    .catch(()=>{
      alert("no added !!!");
    })
   }

   getUserByEmail(email:string,value:string):Observable<user[]>{
    const cards=collection(this.fire,'users');

    const q=query(cards,where(email,"==",value));

    return collectionData(q,{idField:'id'}) as Observable<user[]>;
  }

  updatemycard(userd:user,cards:any){
    const washingtonRef = doc(this.fire,"users",userd.id);
    updateDoc(washingtonRef, {
       Products:cards
    });
  }

  updateAccount(userdid:string,name:string,phone:string,adresse:string){
    const washingtonRef = doc(this.fire,"users",userdid);
    updateDoc(washingtonRef, {
       name:name,
       phone:phone,
       adress:adresse
    });
  } 


  addorder(user:user){
    this.isloading=true;
    const db=collection(this.fire,'Orders')
    addDoc(db,user)
    .then((doc)=>{
      //this.router.navigate(['/home'])
     // this.presentToast('top');
    })
    .catch(()=>{
      alert("no added !!!");
    })
    .finally(()=>{
      this.isloading=false;
    })
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'your order sent successfully',
      duration: 1500,
      position: position
    });

    await toast.present();
  }


  // reCaptchaVerfy:any;
  // testVerificationCode:any = "123456"

  // getOTP(number:any){
  //   const auth = getAuth();
  //   this.reCaptchaVerfy = new RecaptchaVerifier('sin-in-phone',{'size': 'invisible'},auth);

  //     signInWithPhoneNumber(auth,number,this.reCaptchaVerfy)
  //     .then((confirmationResult) => {
  //       this.reCaptchaVerfy.confirmationResult=confirmationResult;

  //     console.log(confirmationResult);
  //     localStorage.setItem('verificationId',JSON.stringify(confirmationResult.verificationId))
  //   //console.log(confirmationResult.verificationId)
  //     return confirmationResult.confirm(this.testVerificationCode)
  //     }).catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //     })

  // }

  // siginphone(v:any,o:any){
  //   const auth = getAuth();
  //   const credential = PhoneAuthProvider.credential(v,o);
  //   signInWithCredential(auth,credential)
  //   .then((res)=>{
  //     console.log(res);
  //   })
  // }

  // reCaptchaVerfy:any;

  // signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
  //   return new Promise<any>((resolve, reject) => {
  //     const auth = getAuth();
  //     this.reCaptchaVerfy = new RecaptchaVerifier('sin-in-phone',{'size': 'invisible'},auth);
  //     signInWithPhoneNumber(auth,phoneNumber, recaptchaVerifier)
  //       .then((confirmationResult) => {
  //         this.reCaptchaVerfy.confirmationResult = confirmationResult;
  //         resolve(confirmationResult);
  //       }).catch((error) => {
  //         console.log(error);
  //         reject('SMS not sent');
  //       });
  //   });
  // }

  // async enterVerificationCode(code) {
  //   return new Promise<any>((resolve, reject) => {
  //     const auth = getAuth();
  //     this.reCaptchaVerfy = new RecaptchaVerifier('sin-in-phone',{'size': 'invisible'},auth);
  //     this.reCaptchaVerfy.confirmationResult.confirm(code).then(async (result) => {
  //       console.log(result);
  //       const user = result.user;
  //       resolve(user);
  //     }).catch((error) => {
  //       reject(error.message);
  //     });

  //   });
  // }

  user=null;
  test:boolean=true;

  usergo:user={
    id:'',
    password:'',
    email:'',
    image:'',
    adress:'',
    name:'',
    phone:0,
    Products:[]
  }


  async Googleionic(){



  this.user= await GoogleAuth.signIn();
  console.log('user : ',this.user.email);


  if(this.islogin){return;}

  const querySnapshot = await getDocs(collection(this.fire, "users"));
   querySnapshot.forEach((doc) => {

     if(doc.data().email===this.user.email){

           console.log(this.user)
           this.thenewuser=doc.data().email;

           this.islogin=true;
           this.router.navigate(['/home']);
           this.test=false;

          return;
     }
   });

   if(this.test){

      this.usergo.image=this.user.imageUrl;
      this.usergo.email=this.user.email;

      this.adduser(this.usergo);
      this.thenewuser=this.user.email;

      this.islogin=true;
      this.router.navigate(['/home']);
   }


  }


  async Googlelogout(){
    await GoogleAuth.signOut();
    this.user=null;
  }




}
