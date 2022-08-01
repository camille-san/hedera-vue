<script setup>
import {store} from '../store'</script>

<template>
  <div class="container-fluid">
    {{ JSON.stringify(store.user) }}
  </div>
</template>

<style scoped></style>