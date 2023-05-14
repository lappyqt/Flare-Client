<template>
    <nav class="navbar">
        <RouterLink to="/"><a class="app-title">Flare</a></RouterLink>
        <input class="search-bar" type="text" placeholder="Search for breathtaking photos and art">

        <div v-if="isAuthorized" class="account-options">
            <RouterLink to="/create"><a class="create-post-link">Create a post</a></RouterLink>
            <img class="account-avatar" @click="toggleDropdown" src="https://i.pinimg.com/originals/b7/8d/c3/b78dc35cd99fe399b4b5a7bcf318ae97.gif">
        </div>

        <div v-else class="account-options">
            <RouterLink to="/signin"><span class="sign-in-button">Sign In</span></RouterLink>
        </div>

        <div class="dropdown" v-show="dropdownView">
            <div class="account-details">
                <img class="account-avatar" src="https://i.pinimg.com/originals/b7/8d/c3/b78dc35cd99fe399b4b5a7bcf318ae97.gif">
                <p class="username">{{ account.username }}</p>
                <p class="email">{{ account.email }}</p>
            </div>

            <ul class="options">
                <li><a class="option" href="#">Your content</a></li>
                <li><a class="option" href="#">Favorite</a></li>
                <li><a class="option" href="#">Profile</a></li>
                <li><a class="option" href="#">Followed</a></li>
                <li><a class="option" href="#">Prereferences</a></li>
                <li @click="handleLogoutClick()"><a class="option">Sign out</a></li>
            </ul>
        </div>
    </nav>
</template>


<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import { useStore } from '../../store';
import { IAccount } from '../../models/account';
import { authService } from '../../services/authService';

const store = useStore();

const account = ref({} as IAccount);
const dropdownView = ref(false);
const isAuthorized = localStorage.getItem('token') ? true : false;

watch(dropdownView, () => {
    document.body.classList.toggle('no-scroll', dropdownView.value);
});

const toggleDropdown = () => dropdownView.value = !dropdownView.value;

const handleLogoutClick = () => {
    store.dispatch('logout');
    location.reload();
}

onMounted(async () => {
    if (isAuthorized) {
        account.value = await authService.getCurrentAccount() as IAccount;
    }
});

</script>

<style lang="scss">

@import '../../assets/styles/variables.scss';
@import '../../assets/styles/mixins.scss';

.navbar {
    width: 100%;
    height: 60px;
    background-color: rgb(34, 34, 34);
    z-index: 10;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    color: white;
    user-select: none;
    padding: 0 30px 0 30px;
    box-sizing: border-box;
    z-index: 10000;

    .app-title {
        font-size: 19px;
        font-weight: 500;
        color: $app-accent-color;
    }

    .search-bar {
        position: relative;
        padding: 0 15px 0 45px;
        border-radius: 10px;
        color: rgb(240, 240, 240);
        background-color: rgb(60, 60, 60);
        box-sizing: border-box;
        background-image: url('../../assets/img/search.svg');
        background-repeat: no-repeat;
        background-position: 15px;
        background-size: 14px;

        @include set-size(30%, 38px);
        @include no-border-outline;
        @include set-position-absolute(50%, 50%);
        @include set-font($primary-font-family, 14px, 500);
    }

    .account-options {
        display: flex;
        align-items: center;
        margin-left: auto;
        gap: 30px;

        .create-post-link {
            color: white;
            @include set-font($primary-font-family, 15px, 500);
        }

        .sign-in-button {
            font-size: 15px;
            font-weight: 500;
            padding: 6px 25px;
            border-radius: 30px;
            background-color: rgb(255, 255, 255);
        }
    }

    .account-avatar {
            border-radius: 30px;
            box-sizing: border-box;
            filter: drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.25));
            object-fit: cover;
            cursor: pointer;

            @include set-size(36px, 36px);
    }
}


.dropdown {
    position: absolute;
    top: 70px;
    right: 30px;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 14px;
    box-shadow: 0px 0px 4px rgba(250, 250, 250, 0.25);
    background-color: rgb(34, 34, 34);

    @include set-size(300px, 390px);

    .account-details {
        text-align: center;

        .account-avatar {
            margin-top: 5px;
            width: 48px;
            height: 48px;
        }

        .username {
            @include set-font($primary-font-family, 16px, 500);
        }
        
        .email {
            @include set-font($primary-font-family, 12px, 500);
            color: rgb(175, 175, 175);
        }
    }

    .options {
        display: inline-block;
        list-style: none;
        margin-top: 20px;
        width: 100%;

        .option {
            display: inline-block;
            width: 100%;
            height: 40px;
            color: white;
            font-size: 15px;
            font-weight: 500;
            border-radius: 10px;
            padding-left: 15px;
            box-sizing: border-box;

            @include set-display-flex(center, inherit);
        }

        .option:hover {
            background-color: white;
            color: black;
        }
    }
}

@media screen and (max-width: 601px) {
    .dropdown {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        border-radius: 0;
        box-shadow: none;
    }

    .no-scroll {
        overflow: hidden;
    }
}

</style>