import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'wt-workouts-list',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatButtonModule, RouterLink,CommonModule],
  template: `
    <mat-card>
      <mat-card-title>Workouts</mat-card-title>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let w of ['Chest Day','Leg Day','Pull Day']">
            {{ w }}
            <span class="spacer"></span>
            <a mat-button color="primary" [routerLink]="['/workouts', w]">Detail</a>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
      <button mat-raised-button color="accent" routerLink="/workouts/new">Add workout</button>
    </mat-card>
  `
})
export class WorkoutsListComponent {}
