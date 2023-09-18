import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { catchError, finalize, map, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { DataLoginResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private route: Router,
    private loaderService: LoaderService
    ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    this.loaderService.loading.next(false)
    this.route.navigate(['/'])
    return of(false)
  }
  public userAuthenticated(){
    this.loaderService.loading.next(true)
    return this.userService.tokenValidate().pipe(
      map((response)=>{
        if(response.success){
          this.userService.setUserData(response.data)
        }
        return true
      })
      ).pipe(
        catchError((error: HttpErrorResponse)=>this.handleError(error)),
        finalize(()=> this.loaderService.loading.next(false))
      )
  }
  public userNotAuthenticated(){

  }
}
