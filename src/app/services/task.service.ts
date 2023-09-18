import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ObservedValueOf,
  Subject,
  catchError,
  finalize,
  take,
  throwError,
} from 'rxjs';
import { CreateTask, Task } from '../interfaces/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DisplayMode } from '../interfaces/screen';
import { Store } from '@ngrx/store';
import { setTask } from '../store/task.actions';
import { CommentService } from './comment.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks!: BehaviorSubject<Task[]>;
  public taskScreenMode!: BehaviorSubject<DisplayMode>;
  private baseUrl = 'http://localhost:3000/task';
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  constructor(
    private http: HttpClient,
    private store: Store<Task>,
    private commentService: CommentService,
    private loaderService: LoaderService
  ) {
    this.tasks = new BehaviorSubject<Task[]>([]);
    this.loaderService.loading.next(true);
    http
      .get<Task[]>(this.baseUrl)
      .pipe(
        take(1),
        finalize(() => this.loaderService.loading.next(false))
      )
      .subscribe((tasks) => {
        this.tasks.next(tasks);
      });
  }

  public switchTaskSection(switchTo: DisplayMode) {
    this.taskScreenMode.next(switchTo);
  }

  public deleteTask(taskId: string) {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${taskId}`);
  }

  public createTask(payload: CreateTask) {
    return this.http.post(this.baseUrl, payload);
  }

  public addUserToTask(payload: {
    task_id: string;
    user_id: string;
  }): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/add_user/`, payload);
  }

  public addSubtasktoTask(payload: {
    task_id: string;
    subtask: {
      title: string;
      status: number;
    };
  }) {
    this.loaderService.loadingSpecificTasks.next(true)
   return this.http.post<any>(`${this.baseUrl}/subtask/${payload.task_id}`,payload.subtask)
  }

  public fetchTasks(): Observable<Task[]> {
    this.loaderService.loading.next(true);
    return this.http.get<Task[]>(this.baseUrl).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.loaderService.loading.next(false);
      })
    );
  }

  public fetchTasksTest() {
    this.loaderService.loading.next(true);
    return this.http
      .get<Task[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loaderService.loading.next(false);
        })
      )
      .subscribe((value) => {
        this.tasks.next(value);
      });
  }

  public fetchSpecificTask(taskId: string) {
    this.loaderService.loadingSpecificTasks.next(true);
    this.http
      .get<Task[]>(`${this.baseUrl}/${taskId}`)
      .pipe(
        take(1),
        catchError(this.handleError),
        finalize(() => this.loaderService.loadingSpecificTasks.next(false))
      )
      .subscribe((task) => {
        this.store.dispatch(setTask(task[0]));
        this.commentService.getCommentsOfTask(taskId);
      });
  }
  public updateTask(taskId:string, payload:any){
    this.loaderService.loadingSpecificTasks.next(true)
    return this.http.patch<any>(`${this.baseUrl}/${taskId}`,payload)
  }

  public changeTaskToDone(taskId: string): Observable<{ message: string }> {
    this.loaderService.loading.next(true);
    return this.http
      .put<{ message: string }>(`${this.baseUrl}/${taskId}`, '')
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.fetchTasks()
            .pipe(take(1))
            .subscribe((tasks) => {
              this.tasks.next(tasks);
            });
        })
      );
  }
  public changeSubtaskToDone(payload:{
    subtask_id:string,
    task_id:string
  }){
    this.loaderService.loadingSpecificTasks.next(true)
    return this.http.post<any>(`${this.baseUrl}/subtask/`,payload)
  }
}
