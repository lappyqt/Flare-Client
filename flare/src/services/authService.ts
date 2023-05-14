import { HttpClient, IHttpClient } from "./httpClient";

export interface IAuthService {
    getCurrentAccount(): Promise<object>;
    login(username: string, password: string): Promise<object>;
    create(email: string, username: string, password: string): Promise<object>;
    confirm(token: string): Promise<object>;
}

export class AuthService implements IAuthService {
    private http: IHttpClient;
   
    constructor() {
        this.http = new HttpClient(import.meta.env.VITE_BASE_API_URL, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

    public async getCurrentAccount(): Promise<object> {
        return await this.http.get('accounts/current') as object;
    }

    public async login(username: string, password: string): Promise<object> {
        return await this.http.post('accounts/login', { json: { 
            username: username, 
            password: password 
        }}) as object;
    }

    public async create(email: string, username: string, password: string): Promise<object> {
        return await this.http.post('accounts', { json: {
            email: email,
            username: username,
            password: password
        }}) as object;
    }

    public async confirm(token: string): Promise<object> {
        return await this.http.post('accounts/confirm', { json: {
            token: token
        }}) as object;
    }
}

export const authService = new AuthService();