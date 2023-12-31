import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../Module/Product';
import { user } from '../Module/user';
import { LoginservService } from '../Services/loginserv.service';
import { ProductservService } from '../Services/productserv.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.page.html',
  styleUrls: ['./mycards.page.scss'],
})
export class MycardsPage implements OnInit {

  users:user[]=[];
  card:Product[]=[];
  name:string='';
  phone:string='';
  adresse:string='';
  user:user;
  iduser:string;
  checknumber:string;
  successufullytoggle:boolean=false;

  constructor( private alertController: AlertController,
    private proserv:ProductservService,
    private loginserv:LoginservService,
    public router:Router,
    private toastController: ToastController
   ) { }

  get:string=this.loginserv.getuseremail();
  total:number;
  order:number;
  toggleopen:boolean=false;
  index:number;

  isloading(){
    return this.loginserv.getisloaiding();
  }

  ngOnInit() {

    this.proserv.numberofcard(this.order);
    this.loginserv.getUserByEmail("email",this.get).subscribe(item=>{
      this.users=item;

      this.users.forEach(e => {
         this.card=e.Products;
     });

     this.users.forEach(element => {
      this.iduser=element.id;
      this.user=element;
      this.checknumber=element.name;
     });

    this.total=0;
    this.order=0;
    this.card.forEach(x=>{
      this.total+=(x.price*x.order);
      this.order++;
    })


    })

  }

  removecard(pro:Product){

    this.card=this.card.filter((e)=>{
      return e!=pro;
    })
    this.users.forEach((e)=>{
      this.loginserv.updatemycard(e,this.card);
    })
  }


addorder(pro:Product){
  this.card.forEach(e => {
    if(e==pro){
      e.order++;
    }
  });
  this.users.forEach((e)=>{
    this.loginserv.updatemycard(e,this.card);
  })
}

incorder(pro:Product){
  this.card.forEach(e => {
    if(e==pro){
      if(e.order==1)return;
      e.order--;
    }
  });
  this.users.forEach((e)=>{
    this.loginserv.updatemycard(e,this.card);
  })
}



  async presentAlert(pro:Product) {
    const alert = await this.alertController.create({
      header: 'do you wanna delete this card',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //not secsucc
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.removecard(pro);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'your cammand has send seccssec',
      duration: 2000,
      icon: 'checkmark-done-outline'
    });

     this.router.navigate(['/home']);

    await toast.present();
  }


  updateuser(){
    this.loginserv.updateAccount(this.iduser,this.name,this.phone,this.adresse);
  }

  sendorder(){
    this.toggleopen=false;
    this.successufullytoggle=true;
    this.loginserv.addorder(this.user);
    setTimeout(() => {
      this.successufullytoggle=false;
      this.router.navigate(['/home'])
    }, 3000)
  }

  openmodel(){
    this.toggleopen=!this.toggleopen;
  }
}
