import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {
  @Output() trainingStarted = new EventEmitter<void>();

  constructor() { }

  onClickStartTraining(): void {
    this.trainingStarted.emit();
  }

}
