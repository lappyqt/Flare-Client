<template>
    <div class="authorization-container">
        <div @click="$router.push('/')" class="return-back">
            <p class="text">Return back</p>
        </div>

        <div class="authorization-form">
            <div class="top">
                <p class="app-title">Flare</p>
                <p class="tagline">Sign in to your account</p>
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="step-container">
                    <input type="text" v-model="formData.username" placeholder="Username...">
                    <input type="password" v-model="formData.password" placeholder="Password...">
                </div>

                <button class="continue-button" type="submit">Continue</button>
            </form>
        </div>

        <Transition>
            <div v-if="v$.$errors.length > 0" class="error-container">
                <p class="error-message">{{ v$.$errors[0].$property }}: {{ v$.$errors[0].$message }}</p>
            </div>
        </Transition>

        <div class="alt-auth-link">
            <p class="text">Don't have an account? <u><RouterLink to="/signup">Sign up here</RouterLink></u></p>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { reactive } from 'vue';
import { useStore } from '../store';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';

const store = useStore();

const formData = reactive({
    username: null,
    password: null
});

const rules = {
    username: { 
        required, 
        minLength: minLength(4),
        maxLength: maxLength(50)
    },

    password: { 
        required, 
        minLength: minLength(6),
        maxLength: maxLength(150) 
    }
}

const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
    const formValidated = await v$.value.$validate();

    if (formValidated) {
        await store.dispatch('login', formData);
        location.assign('/');
    }
}

</script>

<style lang="scss" scoped>

@import '../assets/styles/authorization.scss';

</style>