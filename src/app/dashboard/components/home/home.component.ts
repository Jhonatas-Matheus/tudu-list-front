import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { DisplayMode, SectionViewTitle } from 'src/app/interfaces/screen';
import { Subtask, Task } from 'src/app/interfaces/task';
import { CommentService } from 'src/app/services/comment.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/task.service';
import { setTask } from 'src/app/store/task.actions';
import { selectFeatureTask } from 'src/app/store/task.selector';
import { selectFeatureTasks } from 'src/app/store/tasks.selector';



const enterTransition = transition(':enter', [
  style({
    bottom: '-100%',
  }),
  animate('.5s linear', style({ bottom: '0' })),
]);
const exitTransition = transition(':leave', [
  style({
    bottom: '0',
  }),
  animate('.5s linear', style({ bottom: '-100%' })),
]);
const open = trigger('open', [enterTransition]);
const close = trigger('close', [exitTransition]);




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[open,
    close]
})
export class HomeScreenComponent implements OnInit, OnDestroy {

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
    private commentService: CommentService,
    private loaderService: LoaderService,
    private route: Router,
    private store: Store<Task>,
    private storeTasks: Store<Task[]>,
    // private route: Route,
    ){}

  public listOfTasks = [] as Task[]
  public sectionViewTitle!: SectionViewTitle

  public loader:boolean = false
  private loaderSubscription!: Subscription

  private sectionViewTitleSubscription!: Subscription

  public taskScreenMode!: ScreenMode
  private taskScreenModeSubscription!: Subscription
  private taskListSubscription!: Subscription
 
  private showSpecificTaskModalSubscription!: Subscription
  private createTaskModalSubscription!: Subscription
  private showCalenderModalSubscription!: Subscription
  private showProfileModalSubscription!: Subscription

  public showSpecificTaskLifeCycle!:boolean
  public showCalendarLifeCycle!: boolean
  private showSpecificTaskModal!: DisplayMode
  private createTaskModal!: DisplayMode
  private showCalenderModal!: DisplayMode
  private showProfileModal!: DisplayMode
  public bgTaskSpecifci!: string

  public handleModalCreateTask(){
    switch(this.createTaskModal){
      case 'open':
        return 'form-create-task--open'
      case 'close':
        return 'form-create-task--closed'
      default:
        return 'form-create-task--closed'
    }
  }

  public handleModalShowTask(){
    switch(this.showSpecificTaskModal){
      case 'open':
        return 'form-show-task--open'
      case 'close':
        return 'form-show-task--closed'
        default:
          return 'form-show-task--closed'
        }
  }
  public handleModalShowTaskLifeCycle(){
    let result
    setTimeout(()=>{
      switch(this.showSpecificTaskModal){
        case 'open':        
          result = true
          break
        case 'close':
          result = false
          break
        default:
          result = false
          break
      }
    },500)
    return result
  }

  public changeTaskToDone(task: Task){
    this.taskService.changeTaskToDone(task._id.$oid).pipe(take(1)).subscribe()
  }
  public handleRefresh(){
    this.taskService.fetchTasks()
  }
  public handleTaskDone(taskStatus: number){
    
    return taskStatus === 1
  }

  public handleTaskTitle(title: string){
    return title.split(' ')[0]
  }

  public handleTaskPriority(priority: number){
    switch(priority){
      case 1:
        // this.bgTaskSpecifci = 'bg-priority-one'
        return 'task-color-low--priority'
      case 2:
        // this.bgTaskSpecifci = 'bg-priority-two'
        return 'task-color-middle--priority'
      case 3:
        // this.bgTaskSpecifci = 'bg-priority-three'
        return 'task-color-high--priority'
      default:
        // this.bgTaskSpecifci = 'bg-priority-one'
        return 'task-color-low--priority'
    }
  }
  public handleTaskPriorityBg(priority: number){
    switch(priority){
      case 1:
        this.bgTaskSpecifci = 'bg-priority-one'
        break
      case 2:
        this.bgTaskSpecifci = 'bg-priority-two'
        break
      case 3:
        this.bgTaskSpecifci = 'bg-priority-three'
        break
      default:
        this.bgTaskSpecifci = 'bg-priority-one'
        break
    }
  }

  public handleTaskProgress(subtasks: Subtask[]){
    const totalOfTasks = subtasks.length
    const tasksDone = subtasks.filter((task)=> task.status === 1).length
    const calcOfPercent = (tasksDone) / totalOfTasks
    return calcOfPercent
  }

  public selectTask(task: Task){
    this.taskService.fetchSpecificTask(task._id.$oid)
    this.handleTaskPriorityBg(task.priority)
  }

  public handleOpenModalSpecificTask(task: Task){
    this.selectTask(task)
    this.modalService.createTaskModal.next('close')
    this.modalService.showCalenderModal.next('close')
    this.modalService.showProfileModal.next('close')
    this.modalService.showSpecificTaskModal.next('open')
  }

  public handleLogout(){
    localStorage.clear()
    this.route.navigate([''])
  }
  ngOnInit(): void {
    this.showSpecificTaskModalSubscription = this.modalService.showSpecificTaskModal.subscribe((value)=> {
      this.showSpecificTaskModal = value
      if(value === 'close'){
        this.showSpecificTaskLifeCycle = false
      }
      else{
        this.showSpecificTaskLifeCycle = true
      }
    })
    this.createTaskModalSubscription = this.modalService.createTaskModal.subscribe((value)=>  this.createTaskModal = value)
    this.showCalenderModalSubscription = this.modalService.showCalenderModal.subscribe((value)=> {
      this.showCalenderModal = value
      if(value === 'close'){
        this.showCalendarLifeCycle = false
      }
      else{
        this.showCalendarLifeCycle = true
      }
    } )
    this.showProfileModalSubscription = this.modalService.showProfileModal.subscribe((value)=> this.showProfileModal = value)
    this.sectionViewTitleSubscription = this.modalService.sectionViewTitle.subscribe((value)=> this.sectionViewTitle = value)
    this.modalService.sectionViewTitle.next('Tarefas')
    this.taskListSubscription = this.taskService.fetchTasksTest()
    this.taskListSubscription = this.taskService.tasks.subscribe((tasks)=>{
      this.listOfTasks = tasks
    })
    this.loaderSubscription = this.loaderService.loading.subscribe((value)=>{
      this.loader = value
    })
  }

  ngOnDestroy(): void {
    this.taskListSubscription.unsubscribe()
    this.showSpecificTaskModalSubscription.unsubscribe()
    this.createTaskModalSubscription.unsubscribe()
    this.showCalenderModalSubscription.unsubscribe()
    this.showProfileModalSubscription.unsubscribe()
    this.sectionViewTitleSubscription.unsubscribe()
  }

}


type ScreenMode = 'open' | 'close'

