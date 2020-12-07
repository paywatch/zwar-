import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProgramService } from '../../services/program.service';


@Component({
  selector: 'app-viewprogram',
  templateUrl: './viewprogram.component.html',
  styleUrls: ['./viewprogram.component.css']
})
export class ViewprogramComponent implements OnInit {

  programId: string;
  program: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private programService: ProgramService,
  ) { }

  ngOnInit(): void {
    this.programId = this.activatedRoute.snapshot.params["programId"];
    this.getProgram(this.programId);
  }

  getProgram(programId) {
    this.programService.getProgram().subscribe(program => {
      this.program = program.find(p => p.programId == programId);
      console.log(program);
    });
  }

  createNewPackage() {
    this.router.navigate(['/package/base/', this.program.programId]);
  }
}
