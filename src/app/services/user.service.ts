import { HttpClient, HttpErrorResponse, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto, Data, DataLoginResponse, LoginUserDto, ResponseCreateUserDto, ResponseLoginUserDto, ResponseValidateToken } from '../interfaces/user';
import { BehaviorSubject, Observable, Subject, catchError, finalize, take, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { Member } from '../interfaces/task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  public currentUser!: BehaviorSubject<DataLoginResponse | undefined>
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private taskService: TaskService,
    ) {
    this.currentUser = new BehaviorSubject<DataLoginResponse | undefined>(undefined)

  }

  public findUserByEmail(email: string): Observable<Member>{
    return this.http.post<Member>(`${this.baseUrl}/users/find_by_email`, {email})
  }

  public registerUser(payload: CreateUserDto): Observable<ResponseCreateUserDto>{
    return this.http.post<ResponseCreateUserDto>(`${this.baseUrl}/auth`,payload)
  }
  
  public loginUser(payload: LoginUserDto): Observable<ResponseLoginUserDto>{
    this.loaderService.loading.next(true)
    return this.http.post<ResponseLoginUserDto>(`${this.baseUrl}/auth/sign_in`, payload).pipe(
      catchError(this.handleError),
      finalize(()=>{
        this.taskService.fetchTasks()
      })
    )
  }

  public tokenValidate(){
    return this.http.get<ResponseValidateToken>(`${this.baseUrl}/auth/validate_token`)
  }

  public setUserData(userData: DataLoginResponse){
    this.currentUser.next(userData)
  }

  public getUserData(){
    return this.currentUser
  }
}
