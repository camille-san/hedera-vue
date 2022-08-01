<script setup>

defineProps({
  regulars: null,
});

</script>

<template>
  <div class="container-fluid">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Type</th>
        <th scope="col">Label</th>
        <th scope="col">Periodicity</th>
        <th scope="col">Start</th>
        <th scope="col">End</th>
        <th scope="col" class="text-end">Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(regular) in regulars" @click="$emit('select', regular)">
        <td>{{ regular.type }}</td>
        <td class="fw-bold">{{ regular.label }}</td>
        <td>Every {{ regular.periodicityFactor }} {{ regular.periodicity }}</td>
        <td>{{ regular.startDate }}</td>
        <td>{{ regular.endDate }}</td>
        <td class="text-end">{{ regular.amount }} €</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tbody tr:hover {
  background-color: var(--hedera-color-highlight);
  cursor: pointer;
}
</style>