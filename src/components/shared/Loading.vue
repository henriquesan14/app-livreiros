<template>
  <div>
    <div v-if="loader" class="text-center">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loader: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style>
</style>
