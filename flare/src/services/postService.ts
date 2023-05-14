import { IPost } from "../models/post";
import { HttpClient, IHttpClient } from "./httpClient";

export interface IPostService {
    get(id: string): Promise<IPost>;
    getAll(): Promise<IPost[]>;
    create(data: FormData): Promise<IPost>;
}

export class PostService implements IPostService {
    private http: IHttpClient;

    constructor() {
        this.http = new HttpClient(import.meta.env.VITE_BASE_API_URL, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

    public async get(id: string): Promise<IPost> {
        return await this.http.get(`posts/${id}`) as IPost;
    }

    public async getAll(type: string = '', category: string = '', page: number = 1, pageSize: number = 20): Promise<IPost[]> {
        return await this.http.get(`posts?type=${type}&category=${category}&page=${page}&pageSize=${pageSize}`) as IPost[];
    }

    public async create(data: FormData): Promise<IPost> {
        return await this.http.post('posts', { body: data, timeout: 120000 }) as IPost;
    }
}

export const postService = new PostService();