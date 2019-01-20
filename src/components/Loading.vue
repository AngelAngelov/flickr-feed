<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
@import '../styles/colors';
.loader {
  z-index: 1;
  border: 8px solid lightgrey;
  border-top: 8px solid $b-green;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 50px auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
