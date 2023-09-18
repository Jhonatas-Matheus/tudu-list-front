import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private snackBarText!: Subject<string>
  constructor() {
    this.snackBarText = new Subject<string>()
    this.snackBarText.next('Teste')
  }

  public setTextSnackBar(text: string){
  }
  public getTextSnackBar(): Observable<string>{
    return this.snackBarText
  }
  
}
