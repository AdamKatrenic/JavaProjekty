import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'wt-stats',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-title>Stats</mat-card-title>
      <mat-card-content>
        <p>Total workouts: 3</p>
        <p>Total sets: 15</p>
      </mat-card-content>
    </mat-card>
  `
})
export class StatsComponent {}
