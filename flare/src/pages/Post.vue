<template>
    <div v-if="post.orientation == Orientation.portrait" class="content-container portrait">

        <img :src="urls.fullscreen" class="poster">
        <img :src="urls.fullscreen" class="poster-blur">
        <span class="category">{{ post.category }}</span>
    </div>

    <div v-else class="content-container landscape-squarish">

        <img :src="urls.original" class="poster">
        <span class="category">{{ post.category }}</span>
    </div>

    <div class="row">
        <div class="author-and-date">
            <img src="https://i.pinimg.com/originals/b7/8d/c3/b78dc35cd99fe399b4b5a7bcf318ae97.gif" class="author-avatar">
            <span class="author-name">{{ post.createdBy }}</span>
            <span class="publication-date">{{ new Date(post.createdOn).toDateString() }}</span>
        </div>

        <div class="post-actions">
            <Button :text="'Download'" :click="openImage"></Button>
        </div>
    </div>

    <div class="description-and-recommendations">
        <div class="left">
            <div class="description">
                <span class="title">About</span>
                <span class="text">{{ post.description }}</span>
            </div>

            <div class="comments">
                <span class="title">Comments</span>

                <form class="new-comment-form" @submit.prevent="handleSubmit">
                    <img class="account-avatar" src="https://i.pinimg.com/originals/b7/8d/c3/b78dc35cd99fe399b4b5a7bcf318ae97.gif">
                    <input v-model="formData.commentText" class="comment-text" type="text" placeholder="Leave your comment...">
                </form>

                <div class="comment-list">
                    <div v-for="comment in post.comments" class="comment" :key="comment.id">
                        <img class="account-avatar" src="https://i.pinimg.com/originals/b7/8d/c3/b78dc35cd99fe399b4b5a7bcf318ae97.gif">
                        <span class="date">{{ comment.createdBy }} • {{ new Date(comment.createdOn).toLocaleDateString("ru") }}</span>
                        <span class="text">{{ comment.text }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="right">
            <div class="related-content">
                <span class="title">Might be interesting</span>
                <PostGrid :columns="columns"></PostGrid>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import Button from '../components/ui/Button.vue';
import PostGrid from '../components/PostGrid.vue';
import { ref, onMounted, watch, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { IPost, Orientation } from '../models/post';
import { postService } from '../services/postService';
import { commentService } from '../services/commentService';
import { getColumns } from '../public/getColumns';

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const route = useRoute();

const post = ref({} as IPost);
const related = ref([] as IPost[]);
const columns = computed(() => getColumns(related.value, 2));

const formData = reactive({
    commentText: ''
});

const urls = reactive({
    fullscreen: "",
    original: ""
});

watch(() => route.params.id, async () => {
    await fetchPost();
    window.scrollTo({ top: 0 });
});

onMounted(async () => {
    await fetchPost();
});

const fetchPost = async () => {
    post.value = await postService.get(`${route.params.id}`) as IPost;
    related.value = (await postService.getAll(post.value.type, post.value.category, 1, 10)).filter(x => x.id != post.value.id);

    urls.fullscreen = `${baseApiUrl}${post.value.urls.fullscreen}`; 
    urls.original = `${baseApiUrl}${post.value.urls.original}`;

    const poster: any = document.querySelector('.poster');


    poster.onload = () => {
        poster.classList.remove('loading');
    }
}

const handleSubmit = async () => {
    await commentService.create({
        postId: route.params.id.toString(),
        text: formData.commentText
    });

    await fetchPost();

    formData.commentText = '';
}

const openImage = () => {
    window.open(urls.original);
}

</script>

<style lang="scss" scoped>

@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.content-container {
    width: var(--content-width);
    margin-top: 20px;
    position: relative;
    border-radius: 16px;
    display: grid;
    animation: init 1s;
    overflow: hidden;

    @keyframes init {
        from {
            opacity: 0;
            filter: blur(5px);
        }

        to {
            opacity: 1;
            filter: blur(0);
        }
    }

    .category {
        position: absolute;
        left: 20px;
        bottom: 20px;
        padding: 6px 30px;
        border-radius: 30px;
        background-color: rgb(255, 255, 255);
    }
}

.portrait {
    display: grid;
    place-items: center;
    background-color: gray;
    padding: 30px 0;
    overflow: hidden;

    .poster {
        max-height: 720px;
        border-radius: 12px;
        object-fit: cover;
        z-index: 10;
    }

    .loading {
        visibility: hidden;
    }

    .poster-blur {
        width: 100%;
        height: 100%;
        filter: blur(200px) brightness(0.8);
        position: absolute;
        border-radius: 16px;
        object-fit: cover;
        z-index: 0;
    }
}

.landscape-squarish {
    .poster {
        width: 100%;
        max-height: 780px;
        object-fit: cover;
        border-radius: 16px;
    }
}

.row {
    width: var(--content-width);
    display: flex;
    align-items: center;
    margin-top: 15px;
    position: relative;

    .author-and-date {
        .author-avatar {
            object-fit: cover;
            border-radius: 30px;
            @include set-size(48px, 48px);
        }

        .author-name {
            position: absolute;
            left: 60px;
            top: 4px;

            @include set-font($primary-font-family, 16px, 500);
        }

        .publication-date {
            position: absolute;
            left: 60px;
            bottom: 4px;
            color: rgb(175, 175, 175);

            @include set-font($primary-font-family, 14px, 500);
        }
    }

    .post-actions {
        order: 2;
        margin-left: auto;
    }
}

.description-and-recommendations {
    width: var(--content-width);
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 100px;
    row-gap: 20px;

    .title {
        @include set-font($primary-font-family, 16px, 500);
    }

    .left, .right {
        width: 100%;
    }

    .description {
        display: grid;
        row-gap: 10px;
    }

    .comments {
        margin-top: 20px;

        .account-avatar {
            object-fit: cover;
            border-radius: 30px;
            @include set-size(38px, 38px);
        } 


        .new-comment-form {
            width: 100%;
            display: grid;
            grid-template-columns: 38px 1fr;
            column-gap: 20px;
            margin-top: 20px;

            .comment-text {
                width: 100%;
                padding-left: 15px;
                padding-right: 15px;
                background-color: rgb(242, 242, 242);
                height: 36px;
                border-radius: 12px;
                box-sizing: border-box;

                @include no-border-outline;
                @include set-font($primary-font-family, 14px, 500);
            }
        }

        .comment-list {
            display: grid;
            row-gap: 20px;
            margin-top: 20px;

            .comment {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 15px;
                position: relative;

                .date {
                    position: absolute;
                    left: 60px;
                    top: 0;
                    color: rgb(175, 175, 175);
                    @include set-font($primary-font-family, 12px, 600);
                }

                .text {
                    position: absolute;
                    left: 60px;
                    bottom: 0;

                    @include set-font($primary-font-family, 14px, 500);
                }
            }
        }
    }
}

.posts {
    max-width: 100%;
    grid-template-columns: repeat(2, 1fr);
}

@media screen and (max-width: 501px) {
    .portrait {
        padding: 0;
        background-color: transparent;
    }

    .poster {
        width: 100%;
    }

    .poster-blur {
        display: none;
    }

    .description-and-recommendations {
        grid-template-columns: none;
    }
}

</style>