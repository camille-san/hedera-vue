<script setup>
import {store} from '../store'</script>

<template>
  <div class="container-fluid">
    Hello <span class="text-success">{{ store.user.firstName }}</span>
  </div>
</template>

<style scoped></style>