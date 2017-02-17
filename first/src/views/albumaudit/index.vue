<template>
  <div id="album">
    <el-form>
      <div class="album-top">
        <el-form-item label="数据:" class="album-data">
          <el-select v-model="data" placeholder="请选择" style='width:120px'>
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="album-load" @click='albumLoad'>加载</el-button>
        <div style="display: flex">
          <el-input placeholder="请输入浪客号" v-model="input" class="album-input"></el-input>
          <!-- <el-button-group>
            <el-button type="primary" @click='albumSearch'>搜索</el-button>
            <el-button type="primary">刷新</el-button>
          </el-button-group> -->
          <el-button type="primary" @click='albumSearch'>搜索</el-button>
        </div>
        <!-- <el-form-item label="审核到:" class="album-label">
          <el-tag type="success">5分钟</el-tag>
        </el-form-item> -->
        <el-form-item label="未审核:" class="album-label">
          <el-tag type="success"></el-tag>
        </el-form-item>
        <el-form-item label="已审核:" class="album-label">
          <el-tag type="success"></el-tag>
        </el-form-item>
        <!-- <el-form-item label="审核员:" class="album-label">
          <el-tag type="success">789</el-tag>
        </el-form-item> -->
      </div>
    </el-form>
    <div class="album-crad">
      <div v-if="type==true" v-for="(list, index) in albumData.albumList" class="card-content">
        <el-card :body-style="{ padding: '0px', width: '220px'}">
          <img :src="list.imgurl" class="image">
          <div class="card-bottom">
            <span>{{list.nickname}}</span>
            <div class="bottom clearfix">
              <time class="time">{{list.uid}}</time>
              <el-button type="primary" class="button" @click='reset(list.id)'>重置</el-button>
            </div>
        </el-card>
      </div>
      <div v-if="type==false" v-for="(list, index) in albumData.albumSearchList" class="card-content">
        <el-card :body-style="{ padding: '0px', width: '220px'}">
          <img :src="list.imgurl" class="image">
          <div class="card-bottom">
            <span>{{list.nickname}}</span>
            <div class="bottom clearfix">
              <time class="time">{{list.uid}}</time>
              <el-button type="primary" class="button" @click='reset(list.id)'>重置</el-button>
            </div>
            <div class="card-text">
              <span class="card-label">
                <el-tag type="success">{{list.state}}</el-tag>
              </span>
              <span>{{list.opname}}</span>
              <span>{{list.phototime}}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div style="width: 1150px; margin:30px 0 50px">
      <el-button type="primary" style="display: block;margin: 0 auto" v-if="type==true" @click='albumAdopt'>当页全部通过</el-button>
    </div>
    
  </div>
</template>
<script>
  import 'table2excel'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        input: '',
        type: false,
        data: 20,
        searchId: '',
        options: [{value: 20, label: '20'}, {value: 50, label: '50'}, {value: 100, label: '100'}]
      }
    },
    methods: {
      // 加载
      albumLoad () {
        let _this = this
        console.log(7894, _this.data)
        _this.$store.dispatch('getAlbumLoadList', {ps: _this.data, pi: 1, vue: _this})
      },
      // 搜索
      albumSearch () {
        let _this = this
        console.log(_this.input, 1234)
        _this.searchId = _this.input
        _this.$store.dispatch('getAlbumSearchList', {uid: _this.searchId, vue: _this})
      },
      // 搜索点击重置以后重新加载页面
      albumSearchReset () {
        let _this = this
        _this.$store.dispatch('getAlbumSearchList', {uid: _this.searchId, vue: _this})
      },
      // 当页全部通过
      albumAdopt () {
        let _this = this
        let passList = _this.albumData.albumList
        let passArr = []
        for (let i = 0; i < passList.length; i++) {
          passArr.push(passList[i].id)
        }
        _this.$store.dispatch('getAlbumAdopt', {ids: passArr.join(','), vue: _this})
      },
      // 重置
      reset (id) {
        this.$confirm('确定需要重置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _this = this
          _this.$store.dispatch('getAlbumReset', {ids: id, vue: _this})
          console.log(1598, _this.searchId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    mounted () {
      // 关闭浏览器的弹出框
     /* window.onbeforeunload = function (e) {
        e = e || window.event
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示'
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示'
      } */
    },
    computed: {
      ...mapGetters({
        albumData: 'fetchAlbumList'
      })
    }
  }
</script>
<style lang='less' scoped>
  #album {
    width: 1160px;
    margin: 0 auto;
    .album-top {
      display: flex;
      height: 36px;
      .album-data {
        display: flex;
      }
      .album-load {
        margin-left: 10px;
      }
      .album-input {
        margin: 0 10px 0 20px;
      }
    }
    .album-label {
      display: flex;
      margin: 0 10px;
    }
    .album-crad {
      display: flex;
      flex-wrap:wrap;
      .card-content {
        margin:10px 10px 0 0;
        .card-bottom {
          padding: 5px 10px 5px;
          font-size:14px;
          .card-text {
            font-size:14px;
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            .card-label {
              line-height:30px;
            }
          }
        }
      }
    }
    .time {
      font-size: 13px;
      color: #999;
    }
    
    .bottom {
      line-height: 26px;
    }

    .button {
      padding: 5px;
      float: right;
    }

    .image {
      width: 220px;
      height: 170px;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
  }
</style>