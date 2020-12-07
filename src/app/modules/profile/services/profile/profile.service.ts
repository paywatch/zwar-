import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // getAllPrograms() {
  //   return this.http.get('/api/admin/getAllTblProgram?size=100')
  //     .pipe(map((res: any) => res && res.data ? res.data : res));
  // }

  // getPrograms(userId) {
  //   return this.http.get(`/api/ph1/getTAByUserID/${userId}`)
  //   .pipe(
  //     map((res: any) => res && res.data ? res.data : res),
  //     switchMap((agency: any) => this.http.get(`/api/admin/getTblProgramByTaid/${agency.taid}`)),
  //     map((res: any) => res && res.data ? res.data : res),
  //   );
  // }

  // getPackages(programId) {
  //   return this.http.get('/api/admin/getAllTblPackage')
  //     .pipe(
  //       map((res: any) => res && res.data ? res.data : res),
  //       map((items) => items.filter(item => item.programID.programID == programId)),
  //       tap(res => console.log(res))
  //     );
  // }

  // getTravelAgency(userId) {
  //   return this.http.get(`/api/ph1/getTAByUserID/${userId}`)
  //     .pipe(
  //       map((res: any) => res && res.data ? res.data : res),
  //       map((agency: any) => {
  //         const url = `${environment.endpoint}/api/ph1/download`;
  //         agency.regFileUrl = `${url}/${agency.tacommRegFile}`;
  //         agency.logoUrl = `${url}/${agency.tALogo}`;
  //         agency.tblTAAuthMembership = {},
  //         agency.tblTAAuthMembership.tAMinTourAuthFileUrl = `${url}/${agency.tblTAAuthMembership.tAMinTourAuthFile}`;
  //         agency.tblTAAuthMembership.tAFTAVMemberFileUrl = `${url}/${agency.tblTAAuthMembership.tAFTAVMemberFile}`;
  //         agency.tblTAAuthMembership.tAFITTMemberFileUrl = `${url}/${agency.tblTAAuthMembership.tAFITTMemberFile}`;
  //         return agency;
  //       }),
  //       switchMap((agency) => forkJoin([
  //         of(agency),
  //         this.http.get(`/api/ph1/getBranchByTAID/${agency.taid}`)
  //           .pipe(map((res: any) => res && res.data ? res.data : res))
  //       ])),
  //       map(([agency, branches]) => {
  //         agency.branches = branches;
  //         return agency;
  //       }),
  //       switchMap((agency) => forkJoin([
  //         of(agency),
  //         this.http.get(`/api/ph1/getOwnerDataByTAID/${agency.taid}`)
  //           .pipe(map((res: any) => res && res.data ? res.data : res))
  //       ])),
  //       map(([agency, owners]) => {
  //         agency.owners = owners;
  //         return agency;
  //       }),
  //     );
  // }

  // getProgram(porgramID) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'Application/json' });
  //   return this.http.get(`/api/admin/getTblProgram/${porgramID}`, { headers })
  //     .pipe(
  //       map((res: any) => res && res.data ? res.data : res),
  //       map((program: any) => {
  //         program.tblMazar = program.tblMazarSet.reduce((acc, item) => {
  //           if (!acc[item.mazarCityID.cityName]) {
  //             acc[item.mazarCityID.cityName] = [];
  //           }
  //           acc[item.mazarCityID.cityName].push(item);
  //           return acc;
  //         }, {});
  //         return program;
  //       }),
  //       tap(res => console.log(res))
  //     );
  // }
}
