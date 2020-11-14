import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.initializeSignupMaxDate();
  }

  private initializeSignupMaxDate(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
  }

}
