<template>
	<div class="containner">
    <h4>评论审核后台</h4>
		<div class="top">
		  <el-input v-model='liveid' placeholder="请输入浪客ID"></el-input>
      <el-input v-model='content' placeholder="请输入关键字"></el-input>
      <el-button icon='search' @click='loadmsg' type='primary'>搜索</el-button>
		</div>
		<el-table :data="dataGrid.list" border style="width: 100%" @selection-change="handleSelectionChange" v-loading='loading'>
      <el-table-column type="selection" width="55" v-if='type==0'></el-table-column>
	    <el-table-column prop="BarrageContent.content" label="发言内容" inline-template show-overflow-tooltip>
        <span>
          <span v-if="row.ContentType==0">{{row.BarrageContent.content}}</span>
          <span v-if="row.ContentType==1">{{row.Content}}</span>
        </span> 
      </el-table-column>
	    <el-table-column prop="Sender.LiveID" label="浪客ID"></el-table-column>
	    <el-table-column prop="Sender.NickName" label="昵称"></el-table-column>
	    <el-table-column prop="SendDateTime" label="发言时间" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="SendDateTime" label="聊天类型" :formatter="formatterType"></el-table-column>
      <el-table-column label="操作" inline-template width='165'>
        <el-button-group>
          <el-button type='text' style='margin-right: 5px' icon='delete' v-if='type==0' @click='delet(row)'>删除</el-button>
          <el-button type='text' icon='warning' @click='shield(row)'>屏蔽用户</el-button>
        </el-button-group>
      </el-table-column>
	  </el-table>
    <el-button @click='deletMore' type='primary' icon='delete' style='margin-top: 15px;'>删除</el-button>
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
      <!-- 屏蔽 -->
      <div class="dialog">
        <el-dialog class='dialog-form' :title="titleR" v-model="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form" label-width="90px">
            <el-form-item label="屏蔽原因"  prop="reason">
              <el-input v-model="form.reason" placeholder="请输入原因(30字以内的)" auto-complete="off" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" align="center">
            <el-button @click.native="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handelSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
      liveid: '',
      content: '',
      pages: {
        index: 1,
        size: 15
      },
      loading: false,
      type: '',
      deletMsgs: [],
      dialogFormVisible: false,
      form: {
        reason: ''
      },
      rules: {
        reason: [
          { required: true, message: '请输入原因(30字以内的)', trigger: 'change' },
          { min: 1, max: 30, message: '请输入原因(30字以内的)', trigger: 'change' }
        ]
      },
      titleR: ''
    }
  },
  computed: {
    ...mapGetters({
      dataGrid: 'fetchComAuditInfo'
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
    // 删除
    delet (row) {
      let _this = this
      _this.$confirm('确认删除?', '提示', {
        type: 'warning'
      }).then(() => {
        _this.$store.dispatch('deleteMsg', {channel_id: _this.$route.params.id, msgids: row.MsgID, vue: _this})
      }).catch((e) => {
        _this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 多选
    handleSelectionChange (val) {
      this.deletMsgs = val
    },
    deletMore () {
      let _this = this
      _this.$confirm('确认删除所选评论?', '提示', {
        type: 'warning'
      }).then(() => {
        let msgs = []
        _this.deletMsgs.map((n) => {
          msgs.push(n.MsgID)
        })
        let Msgs = msgs.join(',')
        _this.$store.dispatch('deleteMsg', {channel_id: _this.$route.params.id, msgids: Msgs, vue: _this})
      }).catch((e) => {
        _this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 屏蔽
    shield (row) {
      console.log(row.Sender.LiveID)
      this.dialogFormVisible = true
      this.titleR = `屏蔽${row.Sender.LiveID}`
    },
    handelSubmit () {
      let _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.$confirm('确定屏蔽?', '提示', {
            type: 'warning'
          }).then(() => {
            let uid = _this.titleR.replace('屏蔽', '')
            _this.$store.dispatch('ShieldUser', {uid: uid, reason: _this.form.reason, vue: _this})
            _this.form.reason = ''
            _this.dialogFormVisible = false
          }).catch((e) => {
            _this.$message({
              type: 'info',
              message: '已取消操作'
            })
            _this.form.reason = ''
          })
        } else {
          _this.$message({
            type: 'warning',
            message: 'error submit!!'
          })
          return false
        }
      })
    },
    handleCurrentChange (val) {
      if (this.pages.index !== val) {
        this.pages.index = val
      }
      this.loadmsg()
    },
    // 查询
    search () {
      this.loadmsg()
    },
    formatterType (row) {
      return row.ContentType === 1 ? '弹幕' : '评论'
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
      this.$store.dispatch('fetchGetChannelConmmList', {channel_id: _this.$route.params.id, liveid: _this.liveid, content: _this.content, pageindex: _this.pages.index, pagesize: _this.pages.size, vue: _this})
    }
  },
  mounted () {
    this.loadmsg()
    this.type = this.$route.params.type
  }
}
</script>
<style lang='less' scoped>
	.top{
		display: flex;
		align-items: center;
		margin-bottom: 15px;
    .el-input{
      margin-right:15px;
    }
	}
</style>
<style>
.dialog .el-dialog{
  width: 500px;
}
</style>