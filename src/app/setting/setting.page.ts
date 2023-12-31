import { Component, OnInit } from '@angular/core';
import { LoginservService } from '../Services/loginserv.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private loginserv:LoginservService) { }

  logout(){
    this.loginserv.logout();
  }

  ngOnInit() {
  }


  toggledark(event:any){
      if(event.detail.checked){
        document.body.setAttribute('color-theme','dark')
      }else{
        document.body.setAttribute('color-theme','light')
      }
  }

}
