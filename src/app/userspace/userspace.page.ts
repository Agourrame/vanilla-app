import { Component, OnInit } from '@angular/core';
import { user } from '../Module/user';
import { LoginservService } from '../Services/loginserv.service';

@Component({
  selector: 'app-userspace',
  templateUrl: './userspace.page.html',
  styleUrls: ['./userspace.page.scss'],
})
export class UserspacePage implements OnInit {

  constructor(private loginserv:LoginservService) { }

  useremail:string=this.loginserv.getuseremail();
  user:user[]=[];
  username:string;
  phoneuser:number;
  useradresse:string;
  userimage:string;
  toggle:boolean=false;
  userid:string;

  ngOnInit() {
     this.loginserv.getUserByEmail("email",this.useremail).subscribe(item=>{
             this.user=item;

             this.user.forEach(x=>{
              this.username=x.name;
              this.phoneuser=x.phone;
              this.useradresse=x.adress;
              this.userid=x.id;
              this.userimage=x.image;
             });
     });
  }

  logout(){
    this.loginserv.logout();

  }

  googlelogout(){
    this.loginserv.Googlelogout();
  }

  updatebtn(){
     this.toggle=!this.toggle;
     console.log(this.toggle)
     console.log(this.userid);
  }

  updateinfo(){
    this.toggle=!this.toggle;
    this.loginserv.updateAccount(this.userid,this.username,this.phoneuser.toString(),this.useradresse);
  }

}
