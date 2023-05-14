<template>
    <Navbar v-if="!$route.meta.hideNavbar"></Navbar>
    <RouterView></RouterView>
</template>

<script setup lang="ts">

import Navbar from './components/ui/Navbar.vue';

</script>