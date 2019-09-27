<template>
  <div class="card-dashboard mb-2 mr-5" :style="'background-color: ' + cor">
    <div class="card-icon">
      <i :class="icon"></i>
    </div>
    <div class="card-desc">
      <h4>{{value}}</h4>
      <h5>{{desc}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cor: {
      type: String
    },
    icon: {
      type: String
    },
    value: {
      type: String
    },
    desc: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.card-dashboard {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 15px;
  width: 280px;
  border-radius: 3px;

  .card-icon {
    width: 40%;
    i {
      font-size: 50px;
    }
  }
}
</style>