import { IPost } from "../../models/post";
import { postService } from "../../services/postService";

export interface PostState {
    posts: IPost[],

    filters: {
        type: string,
        category: string
    },

    pagination: {
        size: number
    }
}

export const postModule = {
    state: {
        posts: [] as IPost[],

        filters: {
            type: '',
            category: ''
        },

        pagination: {
            size: 20
        }
  
    } as PostState,   

    getters: {
        allPosts(state: PostState): IPost[] {
            return state.posts;
        },

        type(state: PostState): string {
            return state.filters.type;
        },

        category(state: PostState): string {
            return state.filters.category;
        },

        pageSize(state: PostState): number {
            return state.pagination.size;
        }
    },

    actions: {
        async fetchPosts(context: any, payload?: any) {
            const posts = await postService.getAll(payload.type, payload.category, payload.page, payload.pageSize);
            context.commit('definePosts', posts);
        },

        async loadNextPosts(context: any, payload?: any) {
            const posts = await postService.getAll(payload.type, payload.category, payload.page, payload.pageSize);
            context.commit('updatePosts', posts);
        }   
    },

    mutations: {
        definePosts(state: PostState, posts: IPost[]) {
            state.posts = posts;
        },

        updatePosts(state: PostState, posts: IPost[]) {
            state.posts.push(...posts);
        },

        setType(state: PostState, type: string) {
            state.filters.type = type;
        },

        setCategory(state: PostState, category: string) {
            state.filters.category = category;
        }
    }
}