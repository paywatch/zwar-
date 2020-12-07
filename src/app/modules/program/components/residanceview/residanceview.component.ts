import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-residanceview',
  templateUrl: './residanceview.component.html',
  styleUrls: ['./residanceview.component.css']
})
export class ResidanceviewComponent implements OnInit {

  @Input() residance: any;
  @Input() city;

  constructor() { }

  ngOnInit(): void {
    console.log(this.residance);
  }

}
