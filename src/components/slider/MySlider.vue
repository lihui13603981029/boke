<template>
  <div style="width: 1000px; margin: 10px auto; height:400px;">
    <!-- 配置slider组件 -->
    <slider :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>

  </div>
</template>

<script>
    import Slider from "vue-concise-slider/src/components/slider";
    export default {
      components: {Slider},
      name: "my-slider",
      data(){

        return{
          pages:[
            {
              title:'第一张',
              style:{
                background:"url(../../static/slider/bg_1.png)"
              }
            },{
              title:'第二张',
              style:{
                'background':"url(../../static/slider/bg_2.png)"
              }

            },
            {
              title:'第三张',
              style:{
                'background':"url(../../static/slider/bg_3.png)"
              }
            }
          ],
          sliderinit:{
            currentPage: 0,
            thresholdDistance:500,
            thresholdTime:100,
            autoplay:2000,
            loop:true,
            // direction:'vertical',
            infinite:1,
            slidesToScroll:1,
            timingFunction: 'ease',
            duration: 300
          }

        }
      },
      methods:{

        slide:function(data){



        },
        onTap:function(data){
          //第一张图片
          if(data.currentPage == 0){

          }
          //第二张图片
          if(data.currentPage == 1){

          }
          //第三张
          if(data.currentPage == 2){

          }
          console.log(data);

        },
        onInit:function(data){

        }
      }

    }
</script>

<style>
  @import url('./mySlider.css');

</style>
