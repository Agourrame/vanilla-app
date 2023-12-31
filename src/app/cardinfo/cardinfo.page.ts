import { Component, OnInit } from '@angular/core';
import { Product } from '../Module/Product';
import { user } from '../Module/user';
import { LoginservService } from '../Services/loginserv.service';
import { ProductservService } from '../Services/productserv.service';

@Component({
  selector: 'app-cardinfo',
  templateUrl: './cardinfo.page.html',
  styleUrls: ['./cardinfo.page.scss'],
})
export class CardinfoPage implements OnInit {

  constructor(private proserv:ProductservService,private loginserv:LoginservService) { }

  products:Product[]=[];
  users:user[]=[];
  card:Product[]=[];
  order:number;
  a:number=0;
  get:string=this.loginserv.getuseremail();
  toggle:boolean=false;
  islogin:boolean=this.loginserv.getislogin();

  addtomycard(product:Product){

    this.card.forEach((e)=>{
        if(e.id==product.id){
          this.a=1;
        }
    });

    if(this.a==1){
        return;
    }else{
      this.card.push(product);
      this.users.forEach((e)=>{
        this.loginserv.updatemycard(e,this.card);
      })
    }

  }

  removemycard(product:Product){
    this.toggle=!this.toggle;

    this.card=this.card.filter((e)=>{
      return e!=product;
    })

    this.users.forEach((e)=>{
      this.loginserv.updatemycard(e,this.card);
    })
  }


  ngOnInit() {
  this.products=this.proserv.getget();
  this.order=0;

  this.loginserv.getUserByEmail("email",this.get).subscribe(item=>{
    this.users=item;
    this.users.forEach(e => {
       this.card=e.Products;
   });
  });

  this.card.map((e,i,a) => {
    this.order=(i+=1);
});



}

  changetoggle(){
    this.toggle=!this.toggle;
    console.log(this.toggle)
  }

}

// {
//   name:"samasung",
//   price:2000,
//   title:"samsung galaxy 128gb 6ram",
//   image:[
//     "../../assets/icon/samasung.png",
//     "https://firebasestorage.googleapis.com/v0/b/agoshop-ae14b.appspot.com/o/img%2FS21%20ultra.jpg?alt=media&token=5cc84310-f947-44b8-bc1b-acbf3d29ba35",
//     "https://images.samsung.com/is/image/samsung/p6pim/fr/sm-s906bidgeub/gallery/fr-galaxy-s22-plus-s906-417743-sm-s906bidgeub-531556817"
//   ],
//   type:"hello world"
// }
