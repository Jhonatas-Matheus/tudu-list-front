import { createReducer, on } from '@ngrx/store';
import { setTask} from './tasks.actions';
import { Task } from '../interfaces/task';

export let initialState: Task[] = [];

export const tasksReduceer = createReducer(
  initialState,
  on(setTask, (state, {tasks}) => state = tasks),
);