<template>
  <div v-if="isLoading" class="page-global-loading">
    Loading...
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      isLoading: false
    };
  }
};
</script>
   
<style scoped>
  .page-global-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
</style>