import { createSelector } from '@ngrx/store';
import { Task } from '../interfaces/task';

export interface FeatureState{
    tasks: Task[]
}
export const selectFeatureTasks = createSelector(
    (state) => state,
    (state: any) => state.tasks
)