export class TAOwner {
  tAOwnerNationalID: string;
  tAOwnerPhoneNo: string;
  tAOwnerFullName: string;
}

export class TAUser {
  userName: string;
  countryId: string;
  tAAdminMobileNo: string;
  tAAdminEmail: string;
  userPassword: string;
  verifyURL: string;
}

export class TAAuthMembership {
  taid: number;
  tAMinTourAuthNo: string;
  tAMinTourAuthIssueDate: string;
  tAMinTourAuthExpiryDate: string;
  tAMinTourAuthFile: string;

  tAFTAVMemberNo: string;
  tAFTAVMemberIssueDate: string;
  tAFTAVMemberExpiryDate: string;
  tAFTAVMemberFile: string;

  tAFITTMemberNo: string;
  tAFITTMemberIssueDate: string;
  tAFITTMemberExpiryDate: string;
  tAFITTMemberFile: string;
}

export class TABranch {
  Id: number;
  tABranchCode: string;
  tABranchName: string;
  tABranchAddress: string;
  tABranchMobileNo: string;
  tABranchPhoneNo: string;
  tABranchFaxNo: string;
  tABranchEmail: string;
  tABranchLongitude: string;
  tABranchLatitude: string;
  tABranchType: string | number;
  tADistrictID: string;
  tACity: string;
  taid: string;
}
