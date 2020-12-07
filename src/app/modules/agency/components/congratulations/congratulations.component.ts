import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
    // const auth = JSON.parse(sessionStorage.getItem('auth'));
    // console.log(auth);

    // if (!auth.access_token) {
    //   console.log('yes');
    //   this.router.navigate(['/auth/login']);
    // }
    this.clearSessionStorage();
  }

  clearSessionStorage() {
    sessionStorage.removeItem('agencyBasic');
    sessionStorage.removeItem('register');
    sessionStorage.removeItem('licence');
    sessionStorage.removeItem('branches');
  }

}
