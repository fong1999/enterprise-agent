import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  imports: [ NgFor ]
})
export class LeftPanelComponent {
  people = [
    { name: 'Alice Johnson', role: 'Product Manager', avatar: 'assets/avatar2.png' },
    { name: 'Bob Smith', role: 'Software Engineer', avatar: 'assets/avatar3.png' },
    { name: 'Charlie Brown', role: 'UX Designer', avatar: 'assets/avatar4.png' }
  ];
}
