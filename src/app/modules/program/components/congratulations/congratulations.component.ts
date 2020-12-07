import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['/program/basics']);
  }

  submit() {
    const program = JSON.parse(sessionStorage.getItem('program'));
    this.router.navigate(['/program/edit']);
  }
}
