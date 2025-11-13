import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  listings = [
    { id: 1, name: 'Prvá položka' },
    { id: 2, name: 'Druhá položka' },
    { id: 3, name: 'Tretia položka' }
  ];
}
