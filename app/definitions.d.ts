interface RiseUser {
  account: {
    idProofUploaded: boolean;
    profileSettings: {
      accountId: string;
      createdAt: string;
      employmentStatus: string;
      id: string;
      jobSector: string;
      maritalStatus: string;
      monthlyIncomeRange: string;
      updatedAt: string;
    };
    referral: {
      accountId: number;
      approvedAt: string | null;
      clicks: number;
      code: string;
      createdAt: string;
      id: number;
      invested: number;
      isAffiliate: number;
      signups: number;
      updatedAt: string;
    };
    type: 'individual' | 'business';
    uuid: string;
  };
  accountId: number;
  bvn: string;
  bvnVerified: boolean;
  canUseReferralCode: boolean;
  country?: string;
  createdAt: string;
  deletedAt: string | null;
  dob: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  gender: string;
  hasBuildWealth: boolean;
  hasPayDay: boolean;
  id: number;
  informationSource: string;
  isAdmin: boolean;
  lastName: string;
  metadata: {
    hasBeenUpsoldFIRE: boolean;
    idNotificationCount: number;
    idVerified: boolean;
    lastActiveNotificationCount: number;
    nextIdReminderDate: string;
  };
  name: string;
  newsletterSubscribed: boolean;
  phone: string;
  phoneCountryCode: string;
  phoneNumberVerified: boolean;
  pin: string;
  profilePicUrl: string | null;
  referralId: number;
  role: string;
  status: string;
  updatedAt: string;
  username: string;
  uuid: string;
  verification: {
    proofOfIdStatus:
      | 'approved'
      | 'declined'
      | 'pending approval'
      | 'not uploaded';
  };
}

interface Session {
  country: string;
  hasCompletedSignup: boolean;
  id: number;
  token: string;
  uuid: string;
}
