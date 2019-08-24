<template>
  <footer class="footer">
    <span>
      Copyright
      <strong>SGSL</strong> © 2019
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss">
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;

  span {
    font-size: 0.875rem;
  }
}
</style>
