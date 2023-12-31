import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginguardGuard } from './Services/loginguard.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',

    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mycards',
    loadChildren: () => import('./mycards/mycards.module').then( m => m.MycardsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },

  {
    path: 'moreinfo',
    loadChildren: () => import('./moreinfo/moreinfo.module').then( m => m.MoreinfoPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cardinfo',
    loadChildren: () => import('./cardinfo/cardinfo.module').then( m => m.CardinfoPageModule)
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./loginpage/loginpage.module').then( m => m.LoginpagePageModule)
  },
  {
    path: 'sinuppage',
    loadChildren: () => import('./sinuppage/sinuppage.module').then( m => m.SinuppagePageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'userspace',
    canActivate:[LoginguardGuard],
    loadChildren: () => import('./userspace/userspace.module').then( m => m.UserspacePageModule)
  },
  {
    path: 'vanillaloading',
    loadChildren: () => import('./vanillaloading/vanillaloading.module').then( m => m.VanillaloadingPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
