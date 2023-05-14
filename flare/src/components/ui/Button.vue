<template>
    <button @click="handleClick">{{ text }}</button>
</template>

<script lang="ts" setup>

const props = defineProps({
    text: { 
        type: String,
        required: true
    },
    
    click: {
        type: Function,
        required: false
    }
});

const handleClick = () => {
    (props.click !== undefined) && props.click();
}

</script>

<style lang="scss" scoped>

@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

button {
    color: rgb(255, 255, 255);
    background-color: rgb(34, 34, 34);
    padding: 8px 25px;
    border-radius: 12px;
    cursor: pointer;

    @include set-font($primary-font-family, 15px, 500);
    @include no-border-outline;
}

</style>