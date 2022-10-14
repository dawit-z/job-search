<template>
  <div>Job {{ currentJobId }}</div>
</template>

<script>
export default {
  name: 'Job',
  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>
