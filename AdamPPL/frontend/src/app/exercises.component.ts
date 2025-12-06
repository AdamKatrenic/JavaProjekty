import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'wt-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatListModule],
  template: `
    <mat-card>
      <mat-card-title>Exercises</mat-card-title>
      <mat-card-content>
        <mat-form-field appearance="outline">
          <mat-label>Názov cviku</mat-label>
          <input matInput [(ngModel)]="exerciseName">
        </mat-form-field>
        <button mat-raised-button color="accent" (click)="addExercise()">Add</button>

        <mat-list>
          <mat-list-item *ngFor="let e of exercises">{{ e }}</mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `
})
export class ExercisesComponent {
  exerciseName = '';
  exercises: string[] = [];

  addExercise() {
    if (this.exerciseName.trim()) {
      this.exercises.push(this.exerciseName.trim());
      this.exerciseName = '';
    }
  }
}
