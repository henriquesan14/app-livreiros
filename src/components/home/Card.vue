<template>
  <div class="card-dashboard mb-2" :style="'background-color: ' + cor">
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
      type: Number | String
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
  padding: 13px;
  width: 260px;
  height:100px;
  border-radius: 3px;

  .card-icon {
    width: 40%;
    i {
      font-size: 50px;
    }
  }

  .card-desc h5{
    font-size: 1rem;
  }
}
</style>