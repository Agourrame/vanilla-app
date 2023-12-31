import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vanillaloading',
  templateUrl: './vanillaloading.page.html',
  styleUrls: ['./vanillaloading.page.scss'],
})
export class VanillaloadingPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000)
  }

}
