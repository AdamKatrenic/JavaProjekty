import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wt-workout-editor',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-title>Workout Editor</mat-card-title>
      <mat-card-content>
        <mat-form-field appearance="outline">
          <mat-label>Názov tréningu</mat-label>
          <input matInput [(ngModel)]="title">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Poznámky</mat-label>
          <textarea matInput rows="3" [(ngModel)]="notes"></textarea>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">Save</button>
        <button mat-button>Cancel</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class WorkoutEditorComponent {
  title = '';
  notes = '';
}
