<template>
  <div>Job {{ currentJobId }}</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute;
const currentJobId = computed(() => route.params.id);
</script>
