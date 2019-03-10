<template>
    <div class="rankCell clear">
      <div class="left">
        <img src="../../assets/cell/header.gif" alt="">
      </div>
      <div class="middle">
        <p> {{model.title}}</p>
        <p>{{model.description}}</p>
      </div>
      <div class="right">
        <span>12345</span>
        <span>金币</span>
        <div>+关注</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'rank-cell',
  data () {
    return {
    }
  },
  props: {
    model: Object
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
  @import "rankCell.css";

</style>
