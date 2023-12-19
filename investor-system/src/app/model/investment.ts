export class Investment {
    _id: number;
    startDate: Date;
    endDate: Date;
    investAmount: string;
    investType: string;
    profitMonthly: number;
    profitYearly: number;
    profitEnd: number;
    explanation: string;
    attachments: [];
    createdDate: Date;
    createdBy: string;
    modifiedDate: Date;
    modifiedBy: string;
}