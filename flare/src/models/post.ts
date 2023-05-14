import { IBaseModel } from "./baseModel";
import { IAuditedModel } from "./auditedModel";
import { IComment } from "./comment";  

export interface IPost extends IBaseModel, IAuditedModel {
    description: string;
    urls: Urls;
    orientation: Orientation;
    type: ContentType;
    category: string;
    tags: string[];
    comments: IComment[];
    views: number;
    downloads: number;
}

export type Urls = {
    original: string;
    fullscreen: string;
    thumbnail: string;
}

export enum Orientation {
    portrait = 'Portrait',
    landscape = 'Landscape',
    squarish = 'Squarish'
}

export enum ContentType {
    photo = 'Photo',
    art = 'Art'
}