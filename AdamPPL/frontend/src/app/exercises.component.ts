import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PRHistory {
  weight: number;
  date: string;
}

interface Exercise {
  name: string;
  currentMax: number;
  history: PRHistory[];
}

@Component({
  selector: 'wt-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wrapper">
      <div class="header">
        <h1>{{ type | uppercase }}</h1>
        <p class="subtitle">Your workout plan for today</p>
      </div>

      <div class="grid">

        <!-- CVIK -->
        <div class="card" *ngFor="let ex of exercises; let i = index">
          <div class="icon">🏋️</div>

          <h3>{{ ex.name }}</h3>
          <p class="pr">{{ ex.currentMax }} kg</p>

          <!-- PR história -->
          <div class="history" *ngIf="ex.history.length > 1">
            <p class="history-title">PR history</p>
            <ul>
              <li *ngFor="let h of ex.history">
                {{ h.weight }} kg – {{ h.date }}
              </li>
            </ul>
          </div>

          <button class="edit-btn" (click)="openEditModal(i, $event)">✏️</button>
          <button class="delete-btn" (click)="removeExercise(i, $event)">🗑️</button>
        </div>

        <!-- ADD CARD -->
        <div class="card add-card" (click)="openAddModal()">
          <div class="add-icon">+</div>
          <p>Add Exercise</p>
        </div>

      </div>
    </div>

    <!-- MODAL -->
    <div class="modal" *ngIf="showModal">
      <div class="modal-content">
        <h3>{{ editIndex === null ? 'Add Exercise' : 'Edit Exercise' }}</h3>

        <input [(ngModel)]="formName" placeholder="Exercise name" />
        <input type="number" [(ngModel)]="formMax" placeholder="PR weight (kg)" />

        <div class="modal-buttons">
          <button (click)="saveExercise()">Save</button>
          <button class="cancel" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      min-height: 100vh;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #0d0d0f, #1b1b1f);
      color: white;
      font-family: Inter, sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 2.5rem;
    }

    .card {
      background: rgba(255,255,255,0.06);
      padding: 3rem;
      border-radius: 26px;
      text-align: center;
      position: relative;
    }

    .icon {
      font-size: 3rem;
    }

    h3 {
      margin: 1.5rem 0 0.5rem;
      font-size: 1.8rem;
    }

    .pr {
      font-size: 1.4rem;
      opacity: 0.85;
    }

    .history {
      margin-top: 1.5rem;
      text-align: left;
      font-size: 0.95rem;
      opacity: 0.8;
    }

    .history-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .history ul {
      padding-left: 1.2rem;
    }

    .edit-btn, .delete-btn {
      position: absolute;
      top: 1rem;
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
    }

    .edit-btn {
      right: 4.2rem;
      background: rgba(0,150,255,0.7);
    }

    .delete-btn {
      right: 1rem;
      background: rgba(255,0,0,0.7);
    }

    .add-card {
      border: 2px dashed rgba(255,255,255,0.3);
      cursor: pointer;
    }

    .add-icon {
      font-size: 4rem;
    }

    .modal {
      position: fixed;
      inset: 0;
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: #222;
      padding: 10rem;
      border-radius: 15px;
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    input {
      width: 90%;
      padding: 0.8rem;
      margin-top: 1rem;
      border-radius: 8px;
      border: none;
    }

    .modal-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
    }

    button {
      width: 48%;
      padding: 0.7rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 1000;
    }

    .cancel {
      background: #444;
      color: white;
    }
  `]
})
export class ExercisesComponent {

  type = '';
  exercises: Exercise[] = [];

  showModal = false;
  editIndex: number | null = null;

  formName = '';
  formMax: number | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  openAddModal() {
    this.editIndex = null;
    this.formName = '';
    this.formMax = null;
    this.showModal = true;
  }

  openEditModal(index: number, event: Event) {
    event.stopPropagation();
    const ex = this.exercises[index];
    this.editIndex = index;
    this.formName = ex.name;
    this.formMax = ex.currentMax;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveExercise() {
    if (!this.formName.trim() || this.formMax === null) return;

    const today = new Date().toLocaleDateString();

    if (this.editIndex === null) {
      // ADD
      this.exercises.push({
        name: this.formName.trim(),
        currentMax: this.formMax,
        history: [{ weight: this.formMax, date: today }]
      });
    } else {
      // EDIT + PR history
      const ex = this.exercises[this.editIndex];
      if (this.formMax !== ex.currentMax) {
        ex.history.push({ weight: this.formMax, date: today });
      }
      ex.name = this.formName.trim();
      ex.currentMax = this.formMax;
    }

    this.closeModal();
  }

  removeExercise(index: number, event: Event) {
    event.stopPropagation();
    this.exercises.splice(index, 1);
  }
}
