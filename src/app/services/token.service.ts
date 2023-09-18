import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  private tokenKey = 'token:tudu-list'
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }
  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }
}
