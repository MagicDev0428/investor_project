export class MyInvestment {
    _id: number;
    investmentNo: number;
    investorName: string;
    amountInvested: string;
    transferDate: Date;
    transactionFrom: string;
    transactionTo: string;
    transactionNo: string;
    documents: [];
    profitMonthly: number;
    profitYearly: number;
    profitEnd: number;
    investType: string;
    firstProfitDate: Date;
    lastProfitDate: Date;
    payBackDate: number;
    torbenMonthly: number;
    torbenYearly: number;
    torbenEnd: number;
    description: string;
    createdDate: Date;
    createdBy: string;
    modifiedDate: Date;
    modifiedBy: string;
}