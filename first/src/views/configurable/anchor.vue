<template>
  <div id="container">
    <div class="top">
      <h3>主播弹框消息管理</h3>
      <el-button type='primary' style="height:36px" icon="plus" @click='add'>新增</el-button>
    </div>
    <el-table :data="dataGrid.list" style="width: 100%;margin-top: 10px;margin-bottom: 30px;" border>
      <el-table-column type='index' width="70"></el-table-column>
      <el-table-column prop="Value" label="提示信息" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" inline-template width='150' align='center'>
      <div>
        <!-- <el-button-group> -->
          <el-button type='text' icon='edit' @click='edit(row)'>编辑</el-button>
          <el-button type='text' icon='delete' @click='delet(row)'>删除</el-button>
        <!-- </el-button-group> -->
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block" style="margin-top: 10px">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='pages.index'  :page-sizes="[10, 30, 50, 100]" :page-size='pages.size' layout="total, sizes, prev, pager, next, jumper" :total='dataGrid.count'>
    </el-pagination>
    <!-- 编辑框  -->
    <el-dialog :title="operate" v-model="dialogVisible" class='dialog'>
      <el-form  label-width="90px" :model='list' :rules="rules" ref='list'  >
        <el-form-item label="内容" prop='value'>
          <el-input v-model.trim='list.value' placeholder='请输入主播弹框消息' type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updata">确 定</el-button>
        </el-form-item>
      </el-form>    
    </el-dialog>
  </div>
  
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        pages: {
          type: 1, // type 1 主播警告信息 2 系统消息 3关闭原因
          index: 1,
          size: 30
        },
        dialogVisible: false,
        operate: '新增主播弹框消息',
        list: {value: '', type: 2},
        rules: {
          value: [
            { required: true, message: '请输入主播弹框消息', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handleSizeChange (val) {
        if (Number(val) === this.pages.size) {
          return
        } else {
          this.pages.size = Number(val)
          this.loadmsg()
        }
      },
      handleCurrentChange (val) {
        if (Number(val) === this.pages.index) {
          return
        } else {
          this.pages.index = Number(val)
          this.loadmsg()
        }
      },
      // 新增
      add () {
        let _this = this
        _this.dialogVisible = true
        _this.operate = '新增主播弹框消息'
        _this.list = {value: '', type: 2}
      },
      // 编辑
      edit (row) {
        let _this = this
        _this.dialogVisible = true
        _this.operate = '编辑主播弹框消息'
        _this.list = {value: row.Value, type: 2, gid: row.GID}
      },
      // 删除
      delet (row) {
        let _this = this
        _this.$confirm('确认新增主播弹框消息?', '提示', {
          type: 'warning'
        }).then(() => {
          _this.$store.dispatch('DeleteLiveConfigInfo', {gid: row.GID, vue: _this})
          _this.dialogVisible = false
        }).catch((e) => {
          _this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      // 新增或修改数据
      updata () {
        let _this = this
        _this.$refs.list.validate((valid) => {
          if (valid) {
            if (_this.operate === '新增主播弹框消息') {
              _this.$confirm('确认新增主播弹框消息?', '提示', {
                type: 'warning'
              }).then(() => {
                _this.$store.dispatch('AddLiveConfigInfo', {value: _this.list.value, type: _this.pages.type, vue: _this})
                _this.dialogVisible = false
              }).catch((e) => {
                _this.$message({
                  type: 'info',
                  message: '已取消操作'
                })
              })
            } else {
              _this.$confirm('确认编辑主播弹框消息?', '提示', {
                type: 'warning'
              }).then(() => {
                _this.$store.dispatch('UpdateLiveConfigInfo', {gid: _this.list.gid, value: _this.list.value, vue: _this})
                _this.dialogVisible = false
              }).catch((e) => {
                _this.$message({
                  type: 'info',
                  message: '已取消操作'
                })
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      loadmsg () {
        let _this = this
        this.$store.dispatch('fetchSystemMsg', {type: _this.pages.type, index: _this.pages.index, size: _this.pages.size, vue: this})
      }
    },
    mounted () {
      this.loadmsg()
    },
    computed: {
      ...mapGetters({
        dataGrid: 'fetchSystemMsgList'
      })
    }
  }
</script>
<style lang="less" scoped>
.edit-img{
  width: 100%;
  height: 150px;
}
.top{
  display: flex;
  justify-content: space-between;
}
.block{
  margin-bottom: 30px;
}
.el-table__body-wrapper .el-tooltip .el-tooltip__rel .cell{
  text-align: left !important;
}
</style>

<style>
  .dialog .el-dialog{
    width: 500px;
  }
</style>
