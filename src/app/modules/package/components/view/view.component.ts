import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  package: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    const ID = this.activatedRoute.snapshot.params['id'];
    console.log(ID);
    this.getPackage(ID);
  }



  getPackage(id) {
    this.packageService.getPackage().subscribe(pack => {
      const found = pack.find(p => p.id == id);
      this.package = found;
      console.log(this.package);
    });
  }

  // deletePackage(package) {
  // }
}
