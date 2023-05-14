<template>
    <div class="authorization-container">
        <div @click="$router.push('/signup')" class="return-back">
            <p class="text">Return back</p>
        </div>

        <div class="conformation-form">
            <form @submit.prevent="handleSubmit">
                <div class="message">
                    <p>We sent you a conformation token.</p>
                    <p>Please paste it here.</p>
                </div>

                <input type="text" placeholder="Token..." v-model="formData.token">
                <button class="continue-button">Confirm</button>
            </form>
        </div>

        <Transition>
            <div v-if="v$.$errors.length > 0" class="error-container">
                <p class="error-message">{{ v$.$errors[0].$property }}: {{ v$.$errors[0].$message }}</p>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>

import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators'; 
import { authService } from '../services/authService';
import { router } from '../router';

const formData = reactive({
    token: ''
});

const rules = {
    token: {
        required,
        minLength: minLength(128),
        maxLength: maxLength(128)
    }
}

const v$ = useVuelidate(rules, formData);

const handleSubmit =  async () => {
    const formValidated = await v$.value.$validate();

    if (formValidated) {
        await authService.confirm(formData.token);
        router.push('/signin');
    }
}

</script>

<style lang="scss" scoped>

@import '../assets/styles/authorization.scss';

</style>