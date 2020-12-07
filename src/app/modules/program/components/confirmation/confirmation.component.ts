import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  basics: any;
  residential: any;
  transportation: any;
  visit: any;
  residance: any;
  program: any;


  constructor(
    private router: Router,
    private programService: ProgramService) { }

  ngOnInit(): void {
    this.collectAllData();
    console.log(this.program);
 }

  collectAllData() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    this.residential = JSON.parse(sessionStorage.getItem('hotels'));
    this.transportation = JSON.parse(sessionStorage.getItem('residence'));
    this.visit = JSON.parse(sessionStorage.getItem('visit'));

    this.program = {
      ...this.basics,
      ...this.residential,
      ...this.transportation,
      ...this.visit
    };
 }


  confirm() {
   this.programService.AddProgram(this.program).subscribe(program => {
     sessionStorage.removeItem('basics');
     sessionStorage.removeItem('hotels');
     sessionStorage.removeItem('residence');
     sessionStorage.removeItem('visit');
     sessionStorage.setItem('program', JSON.stringify(this.program));
     this.router.navigate(['program/congratulation']);
   });
 }

  back() {
  this.router.navigate(['/program/visits']);
 }

}
