import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { Member, Subtask } from 'src/app/interfaces/task';
import { Data } from 'src/app/interfaces/user';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent {
  public subtask!: FormControl
  public title!: FormControl
  public description!: FormControl
  public status!: FormControl
  public deadline!: FormControl
  public category!: FormControl
  public owner!: FormControl
  public priority!: FormControl
  public member!: FormControl
  public subtasks: Subtask[] = []
  public categories: string[] = []
  public members: Member[] = []

    constructor(
      private taskService: TaskService,
      private userService: UserService,
      private modalService: ModalService
      ){
      this.subtask = new FormControl('');
      this.title = new FormControl('')
      this.description = new FormControl('')
      this.status = new FormControl('')
      this.deadline = new FormControl('')
      this.category = new FormControl('')
      this.owner = new FormControl('')
      this.priority = new FormControl('')
      this.member = new FormControl('')
    }


    public addSubtask(){
      const currentSubtask = {
        title: this.subtask.value as string,
        status: 0,
        subtask_id:''
      }
      this.subtasks.push(currentSubtask)
      this.subtask.reset()
    }

    public addCategory(){
      const currentCategory = this.category.value as string
      this.categories.push(currentCategory)
      this.category.reset()
    }
    public removeCategory(categoryToExclude: string){
      this.categories = this.categories.filter((category)=> category !== categoryToExclude)
    }
    public addMember(){
      let currentUser: Member
      this.userService.findUserByEmail(this.member.value).subscribe((data)=>{
        currentUser = data
        this.members.push(currentUser)
        this.member.reset()
      })
    }
    public removeMember(userToExclude: Member){
      this.members = this.members.filter((user)=> user.email !== userToExclude.email)
    }

    public createTask(){
      const currentTask = {
        title: this.title.value,
        description: this.description.value,
        status: 0,
        deadline: this.deadline.value,
        categories: this.categories,
        priority: this.priority.value,
        user_ids: this.members.map((member)=> member.id ),
        subtasks: this.subtasks,
        files: []
      }
      this.taskService.createTask(currentTask).pipe(take(1),
        finalize(()=> {
          this.taskService.fetchTasksTest()
          this.modalService.createTaskModal.next('close')
        })
      ).subscribe()
      // this.taskService.fetchTasks().pipe(take(2)).subscribe()
    }
}


// type Subtask = {
//   title: string,
//   status: number
//   subtask_id?:string
// }