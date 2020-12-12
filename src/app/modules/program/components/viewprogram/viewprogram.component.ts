import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from 'src/app/modules/package/services/package-service.service';

import { ProgramService } from '../../services/program.service';


@Component({
  selector: 'app-viewprogram',
  templateUrl: './viewprogram.component.html',
  styleUrls: ['./viewprogram.component.css']
})
export class ViewprogramComponent implements OnInit {

  programId: string;
  program: any;
  programInSession: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private programService: ProgramService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.programId = this.activatedRoute.snapshot.params["programId"];
    this.getProgram(this.programId);
    this.getSinglePackage();
    this.getSessionStorageData();
  }

  getSessionStorageData() {
    this.programInSession = JSON.parse(sessionStorage.getItem('program'));
  }

  getProgram(programId) {
    this.programService.getProgram().subscribe(program => {
      this.program = program.find(p => p.programId == programId);
      this.program.categoryName = this.programInSession.categoryName;
      this.program.hotelStar = this.programInSession.hotelStar;
      this.program.transportName = this.programInSession.transportName;
      this.program.airlineNAme = this.programInSession.airlineNAme;
    });
  }

  getSinglePackage() {
    this.packageService.getPackage().subscribe(packages => {
      this.program.packages = packages.find(p => p.ID == this.program.programId);
      console.log(this.program);
    });
  }

  createNewPackage() {
    this.router.navigate(['/package/base/', this.program.programId]);
  }

  publishProgram() {
    this.program.programActive = true;
    this.programService.updateProgram(this.program);
    this.toastr.success('تم نشر اليرنامج');
  }

  unPublishProgram() {
    this.program.programActive = false;
    this.programService.updateProgram(this.program);
    this.toastr.success('تم الغاء نشر اليرنامج');
  }
}
