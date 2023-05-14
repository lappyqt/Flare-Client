import { IBaseModel } from "./baseModel";

export interface IAccount extends IBaseModel {
    email: string;
    username: string;
}