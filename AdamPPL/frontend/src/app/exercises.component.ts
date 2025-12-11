import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'wt-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wrapper">
      <div class="header">
        <h1>{{ type | uppercase}}</h1>
        <p class="subtitle">Your workout plan for today</p>
      </div>

      <div class="grid">

        <!-- Existujúce cviky -->
        <div class="card" *ngFor="let ex of exercises; let i = index">
          <div class="icon">🏋️</div>
          <h3>{{ ex }}</h3>

          <!-- Tlačidlo na odstránenie s indexom -->
          <button class="delete-btn" (click)="removeExercise(i)">🗑️</button>
        </div>

        <!-- Carda na pridanie cviku -->
        <div class="card add-card" (click)="openAddModal()">
          <div class="add-icon">+</div>
          <p>Add Exercise</p>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <div class="modal" *ngIf="showModal">
      <div class="modal-content">
        <h3>Add Exercise</h3>

        <input [(ngModel)]="newExercise" placeholder="Exercise name" />

        <div class="modal-buttons">
          <button (click)="addExercise()">Add</button>
          <button class="cancel" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      min-height: 100vh;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #0d0d0f, #1b1b1f 60%, #26262b);
      color: white;
      font-family: 'Inter', sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeDown 1s ease forwards;
      opacity: 0;
    }

    .header h1 {
      font-size: 4rem;
      font-weight: 900;
      letter-spacing: 4px;
      margin: 0;
      text-shadow: 0 0 20px rgba(255,120,0,0.6);
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
      margin-top: 1.5rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
      gap: 3rem;
    }

    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 3.5rem;
      border-radius: 28px;
      font-size: 1.6rem;
      backdrop-filter: blur(6px);
      text-align: center;
      transition: transform 0.25s ease, background 0.25s ease;
      cursor: pointer;
      animation: fadeUp 0.8s ease forwards;
      opacity: 0;
      position: relative;
    }

    .card:hover {
      transform: translateY(-8px);
      background: rgba(255,120,0,0.15);
    }

    .delete-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(255,0,0,0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;
    }

    .delete-btn:hover {
      background: red;
    }

    .icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .card h3 {
      margin-top: 2rem; /* posunie text nižšie pod ikonou */
      margin-bottom: 0;
      font-size: 1.9rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-align: center; /* aby zostal vycentrovaný */
    }


    .add-card {
      border: 1px dashed rgba(255,255,255,0.3);
      background: rgba(255,255,255,0.04);
    }

    .add-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    /* MODAL */
    .modal {
      position: fixed;
      inset: 0;
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99;
    }

    .modal-content {
      background: #222;
      padding: 2rem;
      border-radius: 15px;
      width: 90%;
      max-width: 400px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .modal-content input {
      width: 100%;
      padding: 0.8rem;
      margin-top: 1rem;
      border-radius: 8px;
      border: none;
      outline: none;
      font-size: 1.1rem;
    }

    .modal-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
    }

    .modal-buttons button {
      width: 48%;
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      background: rgba(255,120,0,0.7);
      color: #000;
    }

    .modal-buttons .cancel {
      background: #444;
      color: #fff;
    }

    /* Animácie */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ExercisesComponent {

  type: string = '';
  exercises: string[] = [];

  showModal = false;
  newExercise = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      // const saved = localStorage.getItem(this.type);
      // this.exercises = saved ? JSON.parse(saved) : [];
    });
  }

  openAddModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newExercise = '';
  }

  addExercise() {
    if (!this.newExercise.trim()) return;
    this.exercises.push(this.newExercise.trim());
    // localStorage.setItem(this.type, JSON.stringify(this.exercises));
    this.newExercise = '';
    this.showModal = false;
  }

  removeExercise(index: number) {
    this.exercises.splice(index, 1);
    // localStorage.setItem(this.type, JSON.stringify(this.exercises));
  }
}
