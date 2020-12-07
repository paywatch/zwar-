import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileService } from '../../services/profile/profile.service';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programsList$: Observable<any>;

  constructor(private profileService: ProfileService) { }

  // ngOnInit(): void {
  //   const user = JSON.parse(sessionStorage.getItem('user'));
  //   this.programsList$ = this.profileService.getPrograms(user.userID);
  // }

}
