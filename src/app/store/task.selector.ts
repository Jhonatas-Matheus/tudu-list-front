import { createSelector } from '@ngrx/store';
import { Task } from '../interfaces/task';

export interface FeatureState{
    task: Task
}
export const selectFeatureTask = createSelector(
    (state) => state,
    (state: any) => state.task
)