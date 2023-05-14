import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { postModule, PostState } from './modules/postModule';
import { authModule, AuthState } from './modules/authModule';

export interface State {
    post: PostState,
    auth: AuthState
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    modules: {
        postModule,
        authModule
    }
})

export function useStore() {
    return baseUseStore(key);
}