<template>
     <div class="authorization-container">
        <div @click="$router.push('/')" class="return-back">
            <p class="text">Return back</p>
        </div>

        <div class="authorization-form">
            <div class="top">
                <p class="app-title">Flare</p>
                <p class="tagline">Create your account</p>
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="step-container" v-show="step == 1">
                    <input type="text" placeholder="Email..." v-model="formData.email">
                    <button class="continue-button" @click="step++" type="button">Continue</button>  
                </div>     
                
                <div class="step-container" v-show="step == 2">
                    <input type="text" placeholder="Username..." v-model="formData.username">
                    <input type="password" placeholder="Password..." v-model="formData.password">

                    <button class="continue-button" type="submit">Continue</button>    
                </div>
            </form>

            <div class="steps">
                <div class="step" @click="step = 1" :class="{ selected: step == 1 }"></div>
                <div class="step" @click="step = 2" :class="{ selected: step == 2 }"></div>
            </div>
        </div>

        <Transition>
            <div v-if="v$.$errors.length > 0" class="error-container">
                <p class="error-message">{{ v$.$errors[0].$property }}: {{ v$.$errors[0].$message }}</p>
            </div>
        </Transition>

        <div class="alt-auth-link">
            <p class="text">Have an account? <u><RouterLink to="/signin">Sign in here</RouterLink></u></p>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import { router } from '../router';
import { authService } from '../services/authService';

const step = ref(1);

const formData = reactive({
    email: '',
    username: '',
    password: ''
});

const rules = {
    email: { required, email },

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
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    const formValidated = await v$.value.$validate();

    if (formValidated) {
        router.push('/confirm');
        await authService.create(formData.email, formData.username, formData.password);
    } 
}

</script>

<style lang="scss" scoped>

@import '../assets/styles/authorization.scss';

</style>