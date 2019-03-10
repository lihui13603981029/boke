<template>

  <div id="myClothes" class="my-clothes" ref="myClothes">
    <div class="clothes-header"> <span @click="close"></span></div>
    <div class="clothes-content">
      <ul>
        <li v-for="(iterm , index) in clothes" :key="index" @click="changeTheam(iterm.id)"><img :src="iterm.imgUrl" alt=""><span>{{iterm.title}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-clothes',
  data () {
    return {
      clothes: [
        {
          id: '1',
          title: '默认背景',
          imgUrl: '../../assets/clothes/01.png'
        }, {
          id: '2',
          title: '粉妆玉琢',
          imgUrl: '../../assets/clothes/02.gif'
        }, {
          id: '3',
          title: '磨砻砥砺',
          imgUrl: '../../assets/clothes/03.jpg'
        }, {
          id: '4',
          title: '幽暗绿荫',
          imgUrl: '../../assets/clothes/04.jpg'
        }, {
          id: '5',
          title: '纡朱曳紫',
          imgUrl: '../../assets/clothes/05.jpg'
        }, {
          id: '6',
          title: '漆黑金属',
          imgUrl: '../../assets/clothes/06.png'
        }, {
          id: '7',
          title: '湛蓝苍穹',
          imgUrl: '../../assets/clothes/07.gif'
        }, {
          id: '8',
          title: '橘绿墨苒',
          imgUrl: '../../assets/clothes/08.gif'
        }, {
          id: '9',
          title: '槁木尘灰',
          imgUrl: '../../assets/clothes/09.gif'
        }, {
          id: '10',
          title: '花心粉阵',
          imgUrl: '../../assets/clothes/10.png'
        }
      ]
    }
  },
  created () {
  },
  methods: {
    //  改变主题
    changeTheam (index) {
      var body = document.getElementById('body')
      body.style.backgroundImage = 'url("+this.clothes[index-1].imgUrl+")'
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style >
@import "myClothes.css";
</style>
