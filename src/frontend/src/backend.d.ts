import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConsignmentNote {
    taxes: string;
    truckNo: string;
    consignorGST: string;
    amountToPayRs: string;
    amountPaidRs: string;
    invoiceValue: string;
    consigneeAddress: string;
    date: string;
    duty: string;
    gcNo: string;
    modePacking: string;
    consigneeGST: string;
    rate: string;
    invoiceNo: string;
    description: string;
    consigneeName: string;
    consignorAddress: string;
    stChange: string;
    toCity: string;
    grandTotal: string;
    invoiceDate: string;
    weightActual: string;
    freight: string;
    billedTo: string;
    fromCity: string;
    noOfArticles: string;
    hamaali: string;
    amountToPayP: string;
    weightChanded: string;
    consignorName: string;
    amountPaidP: string;
    remarks: string;
    advance: string;
}
export interface backendInterface {
    createConsignmentNote(gcNo: string, date: string, fromCity: string, toCity: string, truckNo: string, consignorName: string, consignorAddress: string, consignorGST: string, consigneeName: string, consigneeAddress: string, consigneeGST: string, description: string, noOfArticles: string, modePacking: string, invoiceNo: string, invoiceDate: string, invoiceValue: string, weightActual: string, weightChanded: string, rate: string, freight: string, advance: string, hamaali: string, stChange: string, duty: string, taxes: string, grandTotal: string, amountToPayRs: string, amountToPayP: string, amountPaidRs: string, amountPaidP: string, remarks: string, billedTo: string): Promise<void>;
    getAllConsignmentNotes(): Promise<Array<ConsignmentNote>>;
    getConsignmentNote(gcNo: string): Promise<ConsignmentNote>;
    getConsignmentNotesByCity(city: string): Promise<Array<ConsignmentNote>>;
    getConsignmentNotesByConsignor(consignorName: string): Promise<Array<ConsignmentNote>>;
}
