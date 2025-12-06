import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'wt-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
    <mat-card>
      <mat-card-title>Recent Workouts</mat-card-title>
      <mat-card-content>
        <p>Zoznam posledných tréningov sa zobrazí tu.</p>
      </mat-card-content>
      <button mat-raised-button color="accent" routerLink="/workouts/new">New workout</button>
    </mat-card>

    <mat-card style="margin-top:1rem">
      <mat-card-title>Quick Actions</mat-card-title>
      <mat-card-content>
        <button mat-stroked-button routerLink="/exercises">Manage exercises</button>
        <button mat-stroked-button color="primary" routerLink="/stats">View stats</button>
      </mat-card-content>
    </mat-card>
  `
})
export class DashboardComponent {}
