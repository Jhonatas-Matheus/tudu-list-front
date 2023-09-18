import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { TransparentBgComponent } from './components/transparent-bg/transparent-bg.component';
// import { TransparentBgComponent } from './components/transparent-bg/transparent-bg.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TransparentBgComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class SharedModule { }
