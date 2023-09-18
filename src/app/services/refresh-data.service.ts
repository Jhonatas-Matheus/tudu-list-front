import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TaskService } from './task.service';
import { Store } from '@ngrx/store';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class RefreshDataService {
  public triggerRefreshData!: BehaviorSubject<boolean>
  constructor(
    private taskService: TaskService,
    private store: Store<Task>
  ) {
    this.triggerRefreshData = new BehaviorSubject<boolean>(false)
    this.triggerRefreshData.subscribe((value)=>{
      // const specificTaskSubscription =  this.taskService.
    })
    // this.
  }

  public refreshData(){
    this.triggerRefreshData.next(!this.triggerRefreshData.value)
  }

}
