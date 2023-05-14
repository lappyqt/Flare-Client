<template>
    <div class="posts">
        <div v-for="column in columns" class="column">
            <div v-for="post in column" class="post" :key="post.id" @click="$router.push(`/post/${post.id}`)">
                <img class="thumbnail loading" @load="handleLoad" :src="baseApiUrl + '/' + post.urls.thumbnail">
            </div>  
        </div>
    </div>
</template>

<script lang="ts" setup>

import { IPost } from '../models/post';

defineProps({
    columns: { 
        type: Array<Array<IPost>>,
        required: true
    }
});

const handleLoad = (event: any) => {
    event.target.classList.remove('loading');
}

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

</script>

<style lang="scss" scoped>

@import '../assets/styles/variables.scss';

.posts {
    max-width: 80%;
    margin: 25px auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    .post {
        display: grid;
        animation: skeleton 1s linear infinite alternate;
        user-select: none;
        border-radius: 12px;
        margin-bottom: 20px;
    }

    .thumbnail {
        width: 100%;
        max-height: 550px;
        object-fit: cover;
        border-radius: 12px;
    }

    .loading {
        visibility: hidden;
    }
}

@media screen and (max-width: 1200px) and (min-width: 900px) {
    .posts {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (max-width: 900px) and (min-width: 501px) {
    .posts {
        grid-template-columns: repeat(2, 1fr);
        max-width: 90%;
    }
}

@media screen and (max-width: 501px) {
    .posts {
        grid-template-columns: repeat(1, 1fr);
        max-width: 90%;
    }

    .thumbnail {
        height: auto;
        max-height: 600px !important;
    }
}

@keyframes skeleton {
    0% {
        background-color: hsl(200, 20%, 70%);
    }

    100% {
        background-color: hsl(200, 20%, 95%);
    }
}
</style>