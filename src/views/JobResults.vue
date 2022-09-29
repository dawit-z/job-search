<template>
  <div>
    <h1 class="text-6xl font-bold">Jobs View</h1>
    <button @click="goToHome">Go to Home Page</button>
  </div>
</template>

<script>
export default {
  name: "Jobs",
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
