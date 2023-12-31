import { Component, OnInit } from '@angular/core';
import { ProductservService } from '../Services/productserv.service';
import { user } from '../Module/user';
import { LoginservService } from '../Services/loginserv.service';
import { Product } from '../Module/Product';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  users: user[] = [];
  allproduct: Product[] = [];
  productwithpro: Product[] = [];
  card: Product[] = [];
  order: number;
  togglep: boolean = true;

  constructor(
    private proserv: ProductservService,
    private loginserv: LoginservService
  ) {
    const app = initializeApp(environment.firebase);
    setTimeout(() => {
      this.togglep = false;
    }, 4000);
  }

  addtomycard(product: Product) {
    this.card.push(product);
    this.users.forEach((e) => {
      this.loginserv.updatemycard(e, this.card);
    });
  }
  getpropro(pro: Product) {
    this.proserv.getproinfo(pro);
  }

  get: string = this.loginserv.getuseremail();

  ngOnInit() {
    this.order = 0;

    this.proserv.getpro().subscribe((item) => {
      this.allproduct = item;
    });

    this.proserv.getproductwithcondition('promotion', 0).subscribe((item) => {
      this.productwithpro = item;
    });

    this.loginserv.getUserByEmail('email', this.get).subscribe((item) => {
      this.users = item;
      this.users.forEach((e) => {
        this.card = e.Products;
      });

      this.card.map((e, i, a) => {
        this.order = i += 1;
      });
    });
  }

  logut() {
    this.loginserv.logout();
  }

  async handleRefresh(event) {
    this.togglep = true;
    setTimeout(() => {
      this.togglep = false;
      event.target.complete();
    }, 2000);
  }
}
