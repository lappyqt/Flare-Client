import { IComment, FutureComment } from "../models/comment";
import { HttpClient, IHttpClient } from "./httpClient";

export interface ICommentService {
    create(comment: FutureComment): Promise<IComment>;
    update(id: string, comment: IComment): Promise<IComment>;
    delete(id: string): Promise<IComment>;
}

export class CommentService implements ICommentService {
    private http: IHttpClient;

    constructor() {
        this.http = new HttpClient(import.meta.env.VITE_BASE_API_URL, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

    async create(comment: FutureComment): Promise<IComment> {
        return await this.http.post("comments", { json: {
            postId: comment.postId,
            text: comment.text
        }}) as IComment;
    }

    update(id: string, comment: IComment): Promise<IComment> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<IComment> {
        throw new Error("Method not implemented.");
    }
}

export const commentService = new CommentService();