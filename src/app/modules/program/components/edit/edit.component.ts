import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  programs: Program[];
  page = 1;
  pageSize = 5;
  // tslint:disable-next-line:ban-types
  totalRec: any;
  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getPrograms();
    setTimeout(() => {
      this.getAirplane();
    }, 1000);
  }

  getPrograms() {
    this.programService.getProgram().subscribe(res => {
      if (res) {
        this.programs = res;
        console.log(this.programs);
        this.totalRec = res.length;
      }
      else {
        this.programs = [];
      }
    });
  }

  getAirplane() {
    this.programService.getAllAirplaneCompany().subscribe(airplane => {
      this.programs = this.programs.map((p: any) => {
        p.airplaneName = airplane.find(a => a.id == p.airlineID).name;
        return p;
      });
    });
  }

  onRowDelete(event, program) {
    console.log(program);
    this.programService.deleteProgram(program);
  }
}
