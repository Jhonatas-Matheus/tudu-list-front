import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading!: BehaviorSubject<boolean>
  public loadingSpecificTasks!: BehaviorSubject<boolean>
  constructor() { 
   this.loading = new BehaviorSubject<boolean>(false)
   this.loadingSpecificTasks = new BehaviorSubject<boolean>(false)
  }
}
