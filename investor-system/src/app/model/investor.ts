export interface Investor {
    id: number,
    investorName: string,
    nickName: string,
    phone: string,
    email: string,
    address: string,
    zipCode: number,
    city: string,
    country: string,
    investorStatus: string,
    facebook: string,
    passport: string,
    beneficiaryName: string,
    beneficiaryEmail: string,
    beneficiaryPhone: string,
    countryToTransfer: string,
    currency: string,
    reason: string,
    passportImage: File,
    pincode: number,
    isAdmin: Boolean
}