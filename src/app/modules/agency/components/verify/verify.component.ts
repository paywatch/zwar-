import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  taUserId: any;
  isVerified: false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private agencyService: AgencyService) { }

  ngOnInit(): void {

    // localStorage.setItem('IsVerified', null);
    // localStorage.setItem('TAUserId', null);

    // this.route.params.subscribe(params => {
    //   if (params.id !== undefined) {
    //     this.taUserId = params.id;
    //     this.agencyService.verify(this.taUserId)
    //       .subscribe((response: any) => {
    //         if (response && response.isVerified == true) {
    //           this.isVerified = response.isVerified;
    //           console.log(JSON.stringify(this.isVerified));
    //           localStorage.setItem('TAUserId', this.taUserId);
    //           // this.router.navigate(['/agency/main']);
    //         }
    //       });
    //   }
    //   else {
    //     this.router.navigate(['/']);
    //   }
    // });
  }
}
