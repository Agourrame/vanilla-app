import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Order } from '../Module/Order';
import { user } from '../Module/user';
import { LoginservService } from '../Services/loginserv.service';
import { ProductservService } from '../Services/productserv.service';
@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.page.html',
  styleUrls: ['./moreinfo.page.scss'],
})
export class MoreinfoPage implements OnInit {

    emailuser:string=this.loginserv.getuseremail();
    theUser:user[];
    user:user;
    orders:Order[];

    name:string='';
    phone:string='';
    adresse:string='';
    iduser:string;

  constructor(private toastController: ToastController,
    private router:Router,
    private proserv:ProductservService,
    private loginserv:LoginservService) {

      this.loginserv.getUserByEmail("email",this.emailuser).subscribe(item =>{
        this.theUser=item;
        this.theUser.forEach(element => {
               this.iduser=element.id;
               this.user=element;
        });

      })
    }





  ngOnInit() {

  }


    sendorder(){
        this.loginserv.updateAccount(this.iduser,this.name,this.phone,this.adresse);
        this.loginserv.addorder(this.user);
        this.presentToast()
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

}
