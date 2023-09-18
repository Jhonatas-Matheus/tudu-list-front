import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeScreenComponent } from './components/home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowTaskComponent } from './components/show-task/show-task.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component'; 
import { LoaderComponent } from '../shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CalenderComponent } from './components/calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  
  declarations: [
    DashboardComponent,
    HomeScreenComponent,
    CreateTaskFormComponent,
    ShowTaskComponent,
    SnackBarComponent,
    DialogComponent,
    CalenderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FullCalendarModule
    
  ],
  exports:[
    HomeScreenComponent
  ]
})
export class DashboardModule { }
