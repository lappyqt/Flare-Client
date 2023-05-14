export interface IAuditedModel {
    createdBy: string;
    createdOn: Date;
    updatedOn?: Date;
}