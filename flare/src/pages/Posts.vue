<template>
    <router-view></router-view>
    
    <FilterList @reset-page="handlePageReset" :types="types" :categories="categories"></FilterList>
    <PostGrid :columns="columns"></PostGrid>

    <div ref="pageBottom" class="page-bottom"></div>
</template>

<script lang="ts" setup>

import { onMounted, computed, ref, reactive, onUnmounted } from 'vue';
import PostGrid from '../components/PostGrid.vue';
import FilterList from '../components/FilterList.vue';
import { useStore } from '../store';
import { IType } from '../models/type';
import { ICategory } from '../models/category';
import useMediaQueries from '../hooks/useMediaQueries';

const store = useStore();

const posts = computed(() => store.getters.allPosts);

const contentGrid = reactive({
    posts: posts,
    columns: 4
});

const mediaQueries = [
    {
        query: 'screen and (min-width: 1200px)',
        callback: () => contentGrid.columns = 4
    },
    {
        query: 'screen and (max-width: 1200px) and (min-width: 900px)',
        callback: () => contentGrid.columns = 3
    },
    {
        query: 'screen and (max-width: 900px) and (min-width: 501px)',
        callback: () => contentGrid.columns = 2
    },
    {
        query: '(max-width: 501px)',
        callback: () => contentGrid.columns = 1
    },
];

const [ addMediaListeners, removeMediaListeners ] = useMediaQueries(mediaQueries);

const columns = computed(() => getColumns(contentGrid.posts, contentGrid.columns));

const page = ref(1);
const pageSize = computed(() => store.getters.pageSize);
const type = computed(() => store.getters.type);
const category = computed(() => store.getters.category);

const pageBottom = ref();

onMounted(async () => {
    await store.dispatch('fetchPosts', { pageSize: pageSize.value });

    addMediaListeners();

    const onIntersection = async ([{isIntersecting, target}]: any) => {
        if (isIntersecting) {
            page.value++;
            
            await store.dispatch('loadNextPosts', { 
                page: page.value, 
                pageSize: pageSize.value, 
                type: type.value, 
                category: category.value 
            });
        }
    }; 

    const observer = new IntersectionObserver(onIntersection, { threshold: 1 })
    observer.observe(pageBottom.value);
});

onUnmounted(() => {
    removeMediaListeners();
});

const handlePageReset = () => {
    page.value = 1;
}

const getColumns = (list: Array<any>, count: number) => {
    return [...Array(count).keys()].map(x => list.filter((_, i) => i % count === x));
}

const types: IType[] = [
    { id: '1', name: 'Art' },
    { id: '2', name: 'Photo' }
];

const categories: ICategory[] = [
    { id: '2', name: "Nature" },
    { id: '3', name: "Street" },
    { id: '4', name: "People" },
    { id: '5', name: "Anime" }
];

</script>

<style lang="scss">

@import '../assets/styles/mixins.scss'; 

#app {
    @include grid-display-center;
}

.page-bottom {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
}

</style>