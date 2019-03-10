<template>
  <div class="myRank">
    <div class="rankTap"><button :class="{btnActive:rankSelect}" @click="richesRank">财富排行</button><button :class="{btnActive:!rankSelect}"  @click="levelRank">等级排行</button></div>
    <rank-cell v-for="(rankModel, index) in rankModels" :model="rankModel" :key="index"></rank-cell>

  </div>
</template>

<script>
import RankCell from '../rankList/rankCell'
export default {
  components: {RankCell},
  name: 'my-rank',
  data () {
    return {
      rankSelect: true,
      rankModels: [
        {
          title: '张三',
          description: '这是张三的简介',
          imageUrl: ''
        }, {
          title: '李四',
          description: '这是李四的简介',
          imageUrl: ''
        }, {
          title: '麻子',
          description: '这是麻子的简介',
          imageUrl: ''
        }
      ]
    }
  },
  created () {
  },
  methods: {
    //  财富排行榜
    richesRank () {
      this.rankSelect = true
    },
    //  等级排行榜
    levelRank () {
      this.rankSelect = false
    }
  }
}
</script>

<style scoped>
  @import "myRank.css";

</style>
