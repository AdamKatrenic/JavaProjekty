import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WorkoutsListComponent } from './workouts-list.component';
import { WorkoutEditorComponent } from './workout-editor.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { ExercisesComponent } from './exercises.component';
import { StatsComponent } from './stats.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'workouts', component: WorkoutsListComponent },
  { path: 'workouts/new', component: WorkoutEditorComponent },
  { path: 'workouts/:id', component: WorkoutDetailComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '' }
];
