import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken()
    if(token){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request).pipe(
      tap(event =>{
        if(event.type === HttpEventType.Response && event.headers.has('authorization')){
          const newToken = event.headers.get('authorization');
          if(newToken){
            const tokenValue = newToken.replace('Bearer', '');
            this.tokenService.setToken(tokenValue);
          }
        }
      })
    )
  }
}
