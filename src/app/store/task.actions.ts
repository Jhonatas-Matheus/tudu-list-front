import { createAction, props } from '@ngrx/store';
import { Subtask, Task, Comment } from '../interfaces/task';

export const setTask = createAction('[Task] GetTask',props<Task>());

export const addSubtask = createAction('[Task] AddSubTask', props<Subtask>())

// export const addComment = createAction('[Task] AddComment', props<Comment>())

export const updateProp = createAction('[Task] UpdateProp',props<{[propName: string]:string}>())



export const setComments = createAction('[Task] SetComments',props<{comments: Comment[]}>())
export const updateTask = createAction('[Task] UpdateTask');
export const reset = createAction('[Task] Reset');