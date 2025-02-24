import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent {
  @Output() agentSelected = new EventEmitter<string>(); // ✅ Emit event

  selectAgent(agent: string) {
    this.agentSelected.emit(agent); // ✅ Send selected agent to parent
  }
}
