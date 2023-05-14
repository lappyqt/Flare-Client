<template>
    <div class="filter-list">
        <div class="filters types">
            <span class="filter type" :class="{ selected: selectedType == '' }" @click="selectedType = ''">Mixed</span>
            <span v-for="type in types" :key="type.id" class="filter type" :class="{ selected: selectedType == type.name }" @click="selectedType = type.name">
                {{ type.name }}
            </span>
        </div>

        <div class="filters categories">
            <span class="filter category" :class="{ selected: selectedCategory == '' }"  @click="selectedCategory = ''">Latest</span>
            <span v-for="category in categories" :key="category.id" class="filter category" :class="{ selected: selectedCategory == category.name }" @click="selectedCategory = category.name">
                {{ category.name }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue';
import { ICategory } from '../models/category';
import { IType } from '../models/type';
import { useStore } from '../store';  

const emit = defineEmits(['resetPage']);

defineProps({
    types: {
        type: Array<IType>,
        required: true
    },

    categories: {
        type: Array<ICategory>,
        reqired: true
    }
});

const selectedType = ref('');
const selectedCategory = ref('');
const store = useStore();

const pageSize = computed(() => store.getters.pageSize);

watch(selectedType, () => updatePosts());
watch(selectedCategory, () => updatePosts());

async function updatePosts() {
    store.commit('setType', selectedType.value);
    store.commit('setCategory', selectedCategory.value);

    await store.dispatch('fetchPosts', {
        type: selectedType.value,
        category: selectedCategory.value,
        pageSize: pageSize.value,
        page: 1
    });

    emit('resetPage');
}

</script>

<style lang="scss" scoped>

@import '../assets/styles/mixins.scss';
@import '../assets/styles/variables.scss';

.filter-list {
    width: 80%;
    text-align: center;
    margin-top: 20px;

    @media screen and (max-width: 501px) {
        width: 90%;
    }
    
    .selected {
        color: rgb(0, 0, 0);
    }

    .filters {
        column-gap: 20px;
        user-select: none;
        color: rgb(175, 175, 175);

        @include set-font($primary-font-family, 17px, 400);

        .filter {
            margin: 0 10px;
            cursor: pointer;
        }
    }
    .categories {
        margin-top: 5px;
        @include set-font($primary-font-family, 16px, 400);
    }
}

</style>