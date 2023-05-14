import { authService } from "../../services/authService";

export interface AuthState {
    credentials: {
        token: string | null;
    }
}

export const authModule = {
    state: {
        credentials: {
            token: localStorage.getItem('token') || null
        }
    } as AuthState,

    mutations: {
        setToken(state: AuthState, token: string) {
            state.credentials.token = token;
            localStorage.setItem('token', token);
        },

        removeToken(state: AuthState) {
            state.credentials.token = null;
            localStorage.removeItem('token');
        }
    },

    actions: {
        async login(context: any, account: any) {
            const response: any = await authService.login(account.username, account.password);
            context.commit('setToken', response.token);
        },

        logout(context: any) {
            context.commit('removeToken');
        }
    }
}