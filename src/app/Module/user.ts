import {Product} from '../Module/Product'

export class user{
  id?:string;
  email:string;
  password?:string;
  image?:string;
  name?:string;
  adress?:string;
  phone?:number;
  Products?:Product[]=[];
}
