import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WorkoutsListComponent } from './workouts-list.component';
import { WorkoutEditorComponent } from './workout-editor.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { ExercisesComponent } from './exercises.component';
import { StatsComponent } from './stats.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'exercises/:type', component: ExercisesComponent },
  { path: 'workouts', component: WorkoutsListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'workouts/new', component: WorkoutEditorComponent },
  { path: 'workouts/:id', component: WorkoutDetailComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '' },
  { path: '', component: DashboardComponent, data: { animation: 'DashboardPage' } },
  { path: 'exercises/:type', component: ExercisesComponent, data: { animation: 'WorkoutPage' } }
];
