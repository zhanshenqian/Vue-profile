<template>
  <div class="sceen" v-if='closed'>

    <video
    id="my-player"
    class="video-js"
    autoplay='autoplay'
    controls  width="360" height="640" data-setup="{}"
    poster="//vjs.zencdn.net/v/oceans.png"
    preload="auto"
    >
  <!-- <source src="rtmp://3992.liveplay.myqcloud.com/live/3992_22776" type="rtmp/flv"/> -->
  <!-- <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source> -->
</video>
<el-button @click="close">取 消</el-button>
  </div>
</template>
<script>
  // import 'video.js'
  import * as http from '../utils/common.js'
  export default{
    /* eslint-disable */
    props: {
      channel: {
        coerce: function (data) {  
          return 'data'
        }
      },
      closed: {
        coerce: function (data) {
          console.log(123)
          return data
        }
      }
    },
    data () {
      return {
        livemsg: ''
      }
    },
    watch: {
      closed (value) {
        if (value) {
          console.log(value)
          let _this = this
          setTimeout(function(){
            _this.getrtmp()
            // var players = videojs('my-player');
            // console.log(players)
            // players.src({
            //   type:"rtmp/flv",
            //   src: 'rtmp://3992.liveplay.myqcloud.com/live/3992_22776',
            //   width: '320px',
            //   height: '640px'
            // })
            // players.ready(function() { 
            //     players.play()   
            // }); 
          },200)
          
          // console.log(player)
          // player.src({
          //   type:"rtmp/flv",
          //   src: 'rtmp://3992.liveplay.myqcloud.com/live/3992_22776',
          //   width: '320px',
          //   height: '640px'
          // })
        //   player.ready(function() { 
        //       player.play()   
        //   });   
        }
        
      }
    },
    methods: {
      close () {
        this.closed = false
        console.log(this.livemsg, 111, this.closed)
        var player = videojs('my-player');
        player.ended()
        player.dispose()
        player.hide()
      },
      getrtmp () {
        let _this = this
        http.get({
          url: '/Operation/room/GetUserChannelInfo?v=' + Math.random(),
          data: {channel_id: _this.channel},
          succ (json) {
            if (json.result === 1) {
              var player = videojs('my-player');
                console.log(player)
                player.src({
                  type:"rtmp/flv",
                  src: json.rtmp_downstream_address,
                  width: '320px',
                  height: '640px'
                })
                player.ready(function() {  
                  // playerInitVideo();  
                    player.play();  
                    //setsrc(player,"rtmp://192.168.30.21/live/test3","rtmp/flv");  
                }); 
            } else {
            }
          }
        })
      }
    },
    mounted () {
      // console.log(this.$store, this.$store.state.live)
      let _this = this
      _this.livemsg = 'rtmp://2519.liveplay.myqcloud.com/live/2519_' + '3934372'
      console.log(_this.livemsg)
      /* eslint-disable */
      this.getrtmp()
      // var player = videojs('my-player');
      // console.log(player)
      // player.src({
      //   type:"rtmp/flv",
      //   src: 'rtmp://3992.liveplay.myqcloud.com/live/3992_22776',
      //   width: '320px',
      //   height: '640px'
      // })
      // player.ready(function() {  
      //   // playerInitVideo();  
      //     player.play();  
      //     //setsrc(player,"rtmp://192.168.30.21/live/test3","rtmp/flv");  
      // }); 
      // setsrc(player, 'rtmp://2519.liveplay.myqcloud.com/live/2519_1269029', 'rtmp/flv') 
    }
  }
</script>
<style lang="less" scoped>
  .sceen{
    z-index: 1500;
    position: absolute;
    top:0;
    left: 0;
    right:0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    // width: 100%;
    // height: 100%;
    display: flex;
    margin: 0 auto;
    text-align: center;
    align-items: center;
    #my-player{
      margin: 0 auto;
      // text-align: center;
      // margin: 10% 0;
    }
  }
</style>
