import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wt-exercises',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercises">
      <h2>{{ type | uppercase }} CVIKY</h2>
      <ul>
        <li *ngFor="let exercise of exercises">{{ exercise }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .exercises {
      padding: 2rem;
      text-align: center;
      color: #fff;
      background: #111;
      min-height: 100vh;
    }

    h2 {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      font-size: 1.5rem;
      margin: 1rem 0;
      padding: 1rem;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
    }
  `]
})
export class ExercisesComponent {
  type: string = '';
  exercises: string[] = [];

  private allExercises: Record<string, string[]> = {
    push: ['Bench Press', 'Shoulder Press', 'Triceps Dip'],
    pull: ['Pull-Up', 'Barbell Row', 'Biceps Curl'],
    legs: ['Squat', 'Deadlift', 'Lunges']
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.exercises = this.allExercises[this.type] || [];
    });
  }
}
