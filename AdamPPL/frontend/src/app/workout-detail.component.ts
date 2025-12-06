import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'wt-workout-detail',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-title>Workout Detail</mat-card-title>
      <mat-card-content>
        <p>Detail tréningu sa zobrazí tu.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class WorkoutDetailComponent {}
