import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progressValue: number = 0;
  progressCompleted: boolean = false;
  progressInterval;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.progressInterval = setInterval(() => {
      this.progressValue++;
      if (this.progressValue >= 100)
        this.progressFinished();
    },100);
  }

  stopTraining(): void {
    clearInterval(this.progressInterval);
    this.dialog.open(StopTrainingComponent, {
      height: '400px',
      width: '600px'
    });
  }

  private progressFinished(): void {
    clearInterval(this.progressInterval);
    this.progressCompleted = true;
  }

}
