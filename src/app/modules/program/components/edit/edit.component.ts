import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  programs: Program[];

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms() {
    this.programService.getProgram().subscribe(res => {
      if (res) {
        this.programs = res;
        console.log(this.programs);
      }
      else {
        this.programs = [];
      }
    });
  }

  onRowDelete(event, program) {
    console.log(program);
    this.programService.deleteProgram(program);
  }

  // getProgram(programId) {
  //   this.programService.getProgram(programId)
  //     .subscribe((program) => {
  //       sessionStorage.setItem('basics', JSON.stringify(this.extractBasics(program)));
  //       sessionStorage.setItem('residential', JSON.stringify(this.extractBasics(program)));
  //       sessionStorage.setItem('basics', JSON.stringify(this.extractBasics(program)));
  //       sessionStorage.setItem('basics', JSON.stringify(this.extractBasics(program)));
  //     });
  // }
}
