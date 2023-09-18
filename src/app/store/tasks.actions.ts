import { createAction, props } from '@ngrx/store';
import { Subtask, Task, Comment } from '../interfaces/task';

export const setTask = createAction('[Task] SetTask',props<{tasks: Task[]}>());