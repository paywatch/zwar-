import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  packages: any[];

  constructor(
    private router: Router,
    private packageService: PackageService,
  ) { }

  ngOnInit(): void {
    this.getPackage();
  }

  getPackage() {
    this.packageService.getPackage().subscribe(pack => {
      if (pack) {
        this.packages = pack;
        console.log(this.packages);
      }
      else {
        this.packages = [];
      }
    });
  }

  onRowDelete(event, item) {
    this.packageService.deletePackage(item);
  }

}
