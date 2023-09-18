import { createReducer, on } from '@ngrx/store';
import { setTask, updateTask, reset, addSubtask, setComments, updateProp } from './task.actions';
import { Task } from '../interfaces/task';

export let initialState: Task = {
  _id: {
    $oid: ''
  },
  categories: [],
  created_at: '',
  deadline: '',
  description: '',
  files: [],
  members: [],
  owner: '',
  priority: 0,
  status: 0,
  subtasks: [],
  comments: [],
  title: '',
  updated_at:''
};

export const taskReduceer = createReducer(
  initialState,
  on(setTask, (state, task) => state = task),
  on(addSubtask,(state, subTask)=> ({
    ...state,
    subtasks: [...state.subtasks, subTask]
  })),
  on(setComments,(state,{comments})=>{
    return{
      ...state,
      comments: comments
    }
  }),
  on(updateProp,(state, payload)=>{
    return{
      ...state,
      ...payload

    }
  })
);