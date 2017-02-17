<template>
	<div class="containner">
		<div class="top">
			时间：
			<div class="block">
		    <el-date-picker
		      v-model="timeSlot"
		      @change='timeChange'
		      type="datetimerange"
		      :picker-options="pickerOptions"
		      placeholder="选择时间范围"
		      align="right"
		      style="width:350px">
		    </el-date-picker>
		  </div>
		  <el-input placeholder="请输入房间号" v-model.trim="emid" style="width: 300px;margin-left: 15px">
		    <el-select v-model="type" slot="prepend" placeholder="请选择">
		      <el-option
			      v-for="item in options2"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		    </el-select>
		    <el-button slot="append" icon="search" @click='search'></el-button>
		  </el-input>
		</div>
		<el-table :data="dataGrid.list" border style="width: 100%" v-loading='loading'>
	    <el-table-column prop="ChannelName" label="房间标题"></el-table-column>
	    <el-table-column prop="ChannelId" label="房间号"></el-table-column>
	    <el-table-column prop="LiveID" label="主播浪客号"></el-table-column>
	    <el-table-column prop="UserName" label="主播昵称" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="EndTime" label="结束时间" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="CreateTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" inline-template width='138'>
        <el-button-group>
          <el-button type='text' style='margin-right: 5px' icon='search' @click='leave(row)'>查看</el-button>
          <el-button type='text' v-if='row.AuditState!=1' icon='circle-check' @click='updataState(row)'>通过</el-button>
        </el-button-group>
      </el-table-column>
	    <el-table-column prop="AuditState" label="状态" :formatter="formatterType"></el-table-column>
	    <el-table-column prop="AdminName" label="管理员" show-overflow-tooltip>></el-table-column>
	  </el-table>
    <!-- 分页 -->
    <div class="block" style="margin: 20px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.index"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="pages.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataGrid.count">
      </el-pagination>
    </div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
      timeSlot: ['', ''],
      type: '',
      emid: '',
      loading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      options2: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '通过'
        }
      ],
      pages: {
        index: 1,
        size: 15
      }
    }
  },
  computed: {
    ...mapGetters({
      dataGrid: 'fetchComAudit'
    })
  },
  methods: {
    timeChange () {
      console.log(this.timeSlot)
    },
     // 分页
    handleSizeChange (val) {
      if (this.pages.size !== val) {
        this.pages.size = val
      }
      this.loadmsg()
    },
    handleCurrentChange (val) {
      if (this.pages.index !== val) {
        this.pages.index = val
      }
      this.loadmsg()
    },
    formatterType (row) {
      if (row.AuditState === 0) {
        return '未审核'
      } else if (row.AuditState === 1) {
        return '审核通过'
      } else if (row.AuditState === 2) {
        return '审核失败'
      }
    },
    // 查询
    search () {
      this.loadmsg()
      this.emid = ''
    },
    // 页面跳转
    leave (row) {
      this.$router.push('/comment/info/' + row.ChannelId + '/' + row.AuditState)
    },
    // 时间过滤
    formates (times) {
      return times.getFullYear() + '-' + (times.getMonth() + 1) + '-' + times.getDate() + ' ' + times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds()
    },
    // 加载数据
    /*
    *channel_id：房间号
    *starttime、endtime开始结束时间
    *state：类型，对应选项''全部,1未审核,2审核通过
    */
    loadmsg () {
      let _this = this
      _this.loading = true
      let endtime = _this.formates(_this.timeSlot[1])
      let starttime = _this.formates(_this.timeSlot[0])
      this.$store.dispatch('fetchChannelCommAudit', {channel_id: _this.emid, state: _this.type, starttime: starttime, endtime: endtime, pageindex: _this.pages.index, pagesize: _this.pages.size, vue: this})
    },
    // 通过
    updataState (row) {
      let _this = this
      _this.$confirm('确认通过?', '提示', {
        type: 'warning'
      }).then(() => {
        // state: 1通过  0 未审核
        _this.$store.dispatch('updataState', {channel_id: row.ChannelId, state: 1, vue: _this})
      }).catch((e) => {
        _this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  },
  mounted () {
    let end = new Date()
    let start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
    this.timeSlot = [start, end]
    this.loadmsg()
  }
}
</script>
<style lang='less' scoped>
	.top{
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}
	.type{
		width: 100px;
	}
</style>
<style>
	.el-select .el-input {
	  width: 100px;
	}
</style>