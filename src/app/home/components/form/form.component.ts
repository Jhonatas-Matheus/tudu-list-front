import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  animate,
  animateChild,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription, finalize, take } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 })),
]);
const exitTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('1s ease-in', style({ opacity: 0 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class FormComponent implements OnDestroy, OnInit{
  public email = new FormControl('', [Validators.required, Validators.email]);
  public firstName = new FormControl('', [Validators.required]);
  public lastName = new FormControl('',[Validators.required])
  public password = new FormControl('', [Validators.required]);
  public confirmPassword = new FormControl('', [Validators.required]);

  public hide = true;
  public showForm = false;
  public typeForm: TypeForm = 'login';

  private loginObservable!: Subscription
  private registerSubscription!: Subscription

  private loadingSubscription!: Subscription
  public  loading!: boolean
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private route: Router,
    ){}
  ngOnInit(): void {
    this.loadingSubscription = this.loaderService.loading.subscribe((value)=> {
      this.loading = value
    } )
  }
  ngOnDestroy(): void {
    this.loginObservable?.unsubscribe()
    this.registerSubscription?.unsubscribe()
    this.loadingSubscription?.unsubscribe()
  }

  public handleTypeForm(){
    if(this.typeForm === 'login'){
      const payload = {
        email: this.email.value as string,
        password: this.password.value as string,
      }
      this.userService.loginUser(payload).pipe(take(1),
      finalize(()=>{
        this.route.navigate(['dashboard'])
      })
      ).subscribe()
      return
    }

    if(this.typeForm === 'register'){
      const payload = {
        email: this.email.value as string,
        first_name: this.firstName.value as string,
        last_name: this.lastName.value as string,
        password: this.password.value as string,
        confirm_password: this.confirmPassword.value as string
      }
      this.registerSubscription = this.userService.registerUser(payload).subscribe((response)=>{
        this.route.navigate(['dashboard'])
      })
      setTimeout(()=>{
        this.loaderService.loading.next(false)
      },2000)
      return
    }

  }

  public isLogin(){
    return this.typeForm === 'login'
  }

  public isRegister(){
    return this.typeForm === 'register'
  }

  public setTypeForm(typeForm: TypeForm){
    this.typeForm = 'transition'
    setTimeout(()=>{
      this.typeForm = typeForm
    },1000)
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public handleShowForm(){
    this.showForm = !this.showForm
  }
}

type TypeForm = 'login' | 'register' | 'transition'
