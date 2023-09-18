import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeScreenComponent } from './dashboard/components/home/home.component';


const canAccessDashboardPage: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
  return inject(AuthService).userAuthenticated()
}

const canAccessLoginPagem: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
  return inject(AuthService).userAuthenticated()
}


const routes: Routes = [
  {path: '', component: HomeComponent,},
  {path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [canAccessDashboardPage],
    children: [
      {path: '', component: HomeScreenComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
