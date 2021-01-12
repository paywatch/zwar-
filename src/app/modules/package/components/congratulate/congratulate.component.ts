import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramService } from 'src/app/modules/program/services/program.service';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-congratulate',
  templateUrl: './congratulate.component.html',
  styleUrls: ['./congratulate.component.css'],
})
export class CongratulateComponent implements OnInit {

  programId: any;
  program: any;
  ID: any;

  constructor(
    private packageService: PackageService,
    private router: Router) { }

  ngOnInit(): void {
    this.ID = JSON.parse(sessionStorage.getItem('ID'));
    setTimeout(() => {
      this.getProgram();
    }, 2000);
  }

  getProgram() {
    this.packageService.getProgram().subscribe((program: any[]) => {
      const found = program.find(prog => prog.programId == this.ID);
      console.log(found);
      this.program = found;
    });
  }

  details() {
    this.router.navigate(['package/edit']);
    sessionStorage.removeItem('base');
    sessionStorage.removeItem('group');
    sessionStorage.removeItem('room');
    sessionStorage.removeItem('roomID');
    sessionStorage.removeItem('MatwafImage');
    sessionStorage.removeItem('packageBasicID');
    sessionStorage.removeItem('groupID');
    sessionStorage.removeItem('groupID');
  }

  newOne() {
    sessionStorage.removeItem('base');
    sessionStorage.removeItem('group');
    sessionStorage.removeItem('room');
    sessionStorage.removeItem('roomID');
    sessionStorage.removeItem('MatwafImage');
    sessionStorage.removeItem('packageBasicID');
    sessionStorage.removeItem('groupID');
    sessionStorage.removeItem('groupID');

    this.router.navigate(['package/base', this.ID]);
  }

}
