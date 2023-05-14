import { IBaseModel } from './baseModel';
import { IAuditedModel } from './auditedModel';

export interface IComment extends IBaseModel, IAuditedModel {
    text: string;
    postId: string;
}   

export type FutureComment = Pick<IComment, "postId" | "text">; 