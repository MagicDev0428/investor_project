export class Investor {
    _id: number;
    name: string
    nickname: string;
    phone: string;
    email: string;
    address: string;
    postcode: number;
    city: string;
    country: string;
    status: string;
    facebook: string;
    passport: string;
    beneficiaryName: string;
    beneficiaryEmail: string;
    beneficiaryPhone: string;
    countryToTransfer: string;
    currency: string;
    reason: string;
    passportImages: File;
    pincode: number;
    isAdmin: Boolean;
    transferType: string;
    transferInfo: string;
    investorFolderId: string;
    LastLoginDate: Date;
    loginAttempts:0
}