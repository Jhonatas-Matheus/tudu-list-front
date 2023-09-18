import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Member, Task } from 'src/app/interfaces/task';
import { UserService } from 'src/app/services/user.service';
import { Store, select } from '@ngrx/store';
import { selectFeatureTask } from 'src/app/store/task.selector';
import { Form, FormControl, Validators } from '@angular/forms'; 
import { ModalService } from 'src/app/services/modal.service';
import { addSubtask, updateProp } from 'src/app/store/task.actions';
import { CommentService } from 'src/app/services/comment.service';
import { Observable, Subject, Subscription, finalize, pipe, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoaderService } from 'src/app/services/loader.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {
  public currentTask!: Task
  public titleInput!: FormControl
  public descriptionInput!: FormControl
  public deadlineInput!: FormControl
  public subtask!: FormControl
  public comment!: FormControl
  public member!: FormControl
  public loader:boolean = false
  public  displayOwner: boolean = false
  public taskMode: 'read' | 'write' = 'read'
  private loaderSubscription!: Subscription
  constructor(
      private taskService: TaskService,
      private userService: UserService,
      private snackbarService: SnackBarService,
      private commentService: CommentService,
      private modalService: ModalService,
      private loaderService: LoaderService,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
      private store: Store<Task>
      ){}

  private addLeadingZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }

  public handleOpenSnackBar(text: string) {
    this.snackbarService.setTextSnackBar(text)
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
      data: 'Não é possível fazer um comentário em branco'
    });
  }

  public handleCloseModalSpecificTask(){
    this.modalService.createTaskModal.next('close')
    this.modalService.showCalenderModal.next('close')
    this.modalService.showProfileModal.next('close')
    this.modalService.showSpecificTaskModal.next('close')
    this.modalService.sectionViewTitle.next('Tarefas')
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.member.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addMember(result)
    });
  }


  public updateCurrrentTask(propName:string, value:any){
    const payload = {
      [propName]: value
    }
    this.store.dispatch(updateProp(payload))
  }

  public addMember(email:string){
    this.userService.findUserByEmail(email).pipe(take(1)).subscribe((data)=>{
      let currentMembers = [...this.currentTask.members]
      currentMembers.push(data)
      this.updateCurrrentTask('members', currentMembers)
      this.taskService.addUserToTask({task_id: this.currentTask._id.$oid, user_id: data.id}).pipe(take(1)).subscribe()
    })
  }

  public handleTaskTitle(priority: number){
      switch(priority){
        case 1:
          return 'title-priority-one'
        case 2:
          return 'title-priority-two'
        case 3:
          return 'title-priority-three'
        default:
          return 'title-priority-one'
      }
    }
  
  public handleSubTaskToDone(currentSubtaskId:string){
    const payload= {
      task_id: this.currentTask._id.$oid,
      subtask_id: currentSubtaskId
    }
    this.taskService.changeSubtaskToDone(payload)
    .pipe(
      take(1),
      finalize(()=> this.taskService.fetchSpecificTask(this.currentTask._id.$oid))
        ).subscribe()
    return
  }

  public confirmUpdate(){
    this.currentTask
    const {subtasks, comments, members, ...payload} = this.currentTask
    this.taskService.updateTask(this.currentTask._id.$oid,payload).pipe(
      take(1),
      finalize(()=> this.taskService.fetchSpecificTask(this.currentTask._id.$oid))
        ).subscribe()
    return
  }

  public changeTaskMode(){
    if(this.taskMode === 'read'){
      return this.taskMode = 'write'
    }
    return this.taskMode = 'read'
  }

  public handleTaskMode(){
    switch(this.taskMode){
      case 'read':
        return true
      case 'write':
        return false
      default:
        return false
    }
  }

  public handleDeleteTask(){
    this.taskService.deleteTask(this.currentTask._id.$oid).pipe(
      take(1),
      finalize(()=>{
        this.taskService.fetchTasks().pipe(
          take(1),
          finalize(()=>{
            this.modalService.showSpecificTaskModal.next('close')
          })
          ).subscribe((value)=>{
            this.taskService.tasks.next(value)
          })
      })
    ).subscribe()
  }

  public displayOwnerComands(){
    let result
    this.userService.currentUser.pipe(
      take(1)
    ).subscribe((user)=>{
      this.displayOwner = user?.id === this.currentTask.owner
      result = user?.id === this.currentTask.owner
    })
    return result
  }

  public handleDataCreatedComment(date: string){
    const currentDate = new Date();
    const providedDate = new Date(date);
    const timeDiff = providedDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(daysDiff === 0){
      return 'Hoje'
    }
    if(daysDiff > 1){
      return `${daysDiff} dias atrás`
    }
    return `${daysDiff} dia atrás.`
  }

  public handleDisableInputComment(){}

  public makeComment(){
    const comment ={
     content: this.comment.value,
     task_id: this.currentTask._id.$oid
    }

    if(this.comment.valid){
      this.commentService.addComment(comment).pipe(take(1)).subscribe()
      this.taskService.fetchSpecificTask(this.currentTask._id.$oid)
      this.comment.reset()
      return
    }
    this.handleOpenSnackBar('')
  }

  public addSubtask(){
    const payload = {
      task_id: this.currentTask._id.$oid,
      subtask:{
        title: this.subtask.value as string,
        status: 0
      }
    }
    this.taskService.addSubtasktoTask(payload)
      .pipe(
        take(1),
        finalize(()=> this.taskService.fetchSpecificTask(this.currentTask._id.$oid))
        ).subscribe()
    this.subtask.reset()
    return
  }

  public handleDate(datetimeStr: string){
    const datetimeObj = new Date(datetimeStr);
    const year = datetimeObj.getUTCFullYear();
    const month = this.addLeadingZero(datetimeObj.getUTCMonth() + 1);
    const day = this.addLeadingZero(datetimeObj.getUTCDate());
    return `${year}-${month}-${day}`;
  }
  public handleColorBadgeCategory(priority: number){
    switch(priority){
      case 1:
        return 'category-badge-default'
      case 2:
        return 'category-badge-warning'
      case 3:
        return 'category-badge-danger'
      default:
        return 'category-badge-default'
    }

  }
  ngOnInit(): void {
    this.member = new FormControl('', Validators.required)
    this.comment = new FormControl('',Validators.required)
    this.store.select(selectFeatureTask).subscribe((task)=>{
      this.currentTask = task
      this.titleInput = new FormControl(this.currentTask.title,[Validators.required])
      this.descriptionInput = new FormControl(this.currentTask.description,[Validators.required])
      this.deadlineInput = new FormControl(this.handleDate(this.currentTask.deadline),[Validators.required])
      this.subtask = new FormControl('', Validators.required)
    }) 
    this.loaderSubscription = this.loaderService.loadingSpecificTasks.subscribe((value)=>{
      this.loader = value
    })
  }
  }

type Subtask = {
  title: string,
  status: number
}
