import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AgencyService } from '../../../../modules/agency/services/agency/agency.service';
import { PackageService } from '../../../../modules/package/services/package-service.service';
import { ProgramService } from '../../../../modules/program/services/program.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  programs: any;
  packages: any;
  agencies: any;

  constructor(
    private programService: ProgramService,
    private packageService: PackageService,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.getAllProgram();
    this.getAllPackages();
    this.getAllAgencies();
    setTimeout(() => {
      this.barCanavas();
      this.pieChart();
    }, 2000);
  }

  getAllProgram() {
    this.programService.getProgram().subscribe(res => {
      this.programs = res.length;
    });
  }

  getAllPackages() {
    this.packageService.getPackage().subscribe(res => {
      this.packages = res.length;
    });
  }

  getAllAgencies() {
    this.agencyService.getAllData().subscribe(res => {
      this.agencies = res.length;
    });
  }

  barCanavas() {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Program', 'Packages', 'Agencies'],
        datasets: [{
          label: '# of count',
          data: [this.programs, this.packages, this.agencies],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  pieChart() {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Program', 'Packages', 'Agencies'],
        datasets: [{
          label: '# of count',
          data: [this.programs, this.packages, this.agencies],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
