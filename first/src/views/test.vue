<template>
  <div class=''>
    <input type="text" v-model.trim='lvbop' placeholder="请输入_em_lvb_ma">
    <button @click='login'>模拟登录</button>
  </div>
</template>
<script>
  import cookie from '../utils/cookie'
  export default {
    data () {
      return {
        lvbop: ''
      }
    },
    mounted () {
    },
    methods: {
      login () {
        cookie('_em_lvb_ma', this.lvbop, {'path': '/'})
      }
    }
  }

</script>

<style scoped>
  button{
    width: 500px;
    margin: 10px auto;
    display: block;
    line-height: 90px;
  }
  input[type='text']{
    width: 500px;
    height: 600px;
  }
</style>
