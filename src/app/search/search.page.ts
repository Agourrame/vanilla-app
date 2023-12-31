import { Component, OnInit } from '@angular/core';
import { Observable } from '@firebase/util';
import { Product } from '../Module/Product';
import { user } from '../Module/user';
import { LoginservService } from '../Services/loginserv.service';
import { ProductservService } from '../Services/productserv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private proserv:ProductservService,private loginserv:LoginservService) {
    setTimeout(() => {
      this.togglep=false;
    },2000)
  }
  products:Product[]=[];
  card:Product[]=[];
  users:user[]=[];

  search:string='';
  togglep:boolean=true;

  get:string=this.loginserv.getuseremail();

  addtomycard(product:Product){

    this.card.push(product);
    this.users.forEach((e)=>{
      this.loginserv.updatemycard(e,this.card);
    })
  }


  getpropro(pro:Product){
     this.proserv.getproinfo(pro);
  }




  ngOnInit() {

    this.proserv.getpro().subscribe(item=>{
      this.products=item;
    })



  }





}
