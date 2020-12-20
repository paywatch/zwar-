import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/modules/package/services/package-service.service';
import { ProgramService } from '../../../../modules/program/services/program.service';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {

  programsList$: any;
  program: any[] = [];
  user: any;
  season: any;
  programName: any;
  programYear: any;
  programSeason: any;
  searchResult: any;

  constructor(
    private programService: ProgramService,
    private packageService: PackageService) { }


  ngOnInit() {
    this.getSessionStorageData();
    this.getPrograms();
    this.getSeasons();
    setTimeout(() => {
      this.getAllCategory();
    }, 2000);
  }

  getSessionStorageData() {
    this.user = JSON.parse(sessionStorage.getItem('user')) || {};
  }

  getPrograms() {
    this.programService.getProgram().subscribe(res => {
      res ? this.programsList$ = res : this.programsList$ = [];
      console.log(this.programsList$);
      const found = this.programsList$.find(p => p.uid == this.user.user.uid);
      this.program.push(found);
    });
  }

  getAllCategory() {
    this.programService.getAllCategory().subscribe(categories => {
      this.program = this.program.map(p => {
        p.categoryName = categories.find(c => c.id == p.programCategoryID).name;
        return p;
      });
    });
  }

  getSeasons() {
    this.packageService.getUmrahSeason().subscribe(season => {
      this.season = season;
    });
  }

  findSingleProgram() {
    console.log(this.programsList$);
    const find = this.programsList$.find(p => p.programName == this.programName || p.programUmrahYear == this.programYear);
    this.searchResult = [].concat(find);
    console.log(this.searchResult);
  }

  resetForm() {
    this.programName = '';
    this.programYear = '';
    this.searchResult = null;
  }
}
