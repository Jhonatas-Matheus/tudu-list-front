import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateComment } from '../interfaces/comment';
import { Observable, Subject, take } from 'rxjs';
import { Comment } from '../interfaces/task';
import { Store } from '@ngrx/store';
import { setComments } from '../store/task.actions';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3000/comment'
  constructor(
    private http: HttpClient,
    private store: Store<Comment>
  ) {}
  
  public addComment(comment: CreateComment){
    return this.http.post(this.baseUrl,comment)
  }
  public getCommentsOfTask(taskId: string){
    this.http.get<Comment[]>(`${this.baseUrl}/${taskId}`).pipe(take(1)).subscribe((comments)=>{
      const handleUser = () =>{
        return comments.map((comment)=>{
          return {
            ...comment,
            //@ts-ignore
            user: comment.user[0]
          }
        })
      }
      const correctComment = handleUser()
      this.store.dispatch(setComments({comments: correctComment}))
    })
  }
}