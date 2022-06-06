<template>
  <div class="hot-line">
    <ToolBar @search="search" @create="create" @deleteItem="deleteItem"></ToolBar>
    <el-dialog title="新增音乐" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTip">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      stripe
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" width="120" label="标题"></el-table-column>
      <el-table-column prop="publishTime" width="120" label="发布时间"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import ToolBar from '../components/toolBar.vue';
let totalData = [];
let currentData = [];
export default {
  components: {
    ToolBar
  },
  data() {
    return {
      tableData: [],
      total: 0,
      size: 10,
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      form: {
        title: '',
        publishTime: '',
        content: ''
      },
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.getTip();
  },
  watch: {
    size() {
      this.currentPage = 1;
      this.switchData(1);
    }
  },
  methods: {
    search(val) {
      const result = [];
      if (!val) {
        this.getTip();
        return;
      } else {
        totalData.forEach(dataItem => {
          Object.keys(dataItem).forEach(key => {
            if (
              typeof dataItem[key] === 'string' &&
              dataItem[key].includes(val)
            ) {
              result.push(dataItem);
            }
          });
        });
        currentData = result.slice(1);
        this.total = result.length - 1;
      }
      this.switchData(1);
    },
    create() {
      this.dialogFormVisible = true;
    },
    checkCreateParams() {
      let result = true;
      Object.keys(this.form).forEach(item => {
        if (!this.form[item]) {
          result = false;
        }
      });
      return result;
    },
    async createTip() {
      const month =
        (new Date().getMonth() + 1).length > 1
          ? new Date().getMonth() + 1
          : `0${new Date().getMonth() + 1}`;
      const day =
        new Date().getDate().length > 1
          ? new Date().getDate()
          : `0${new Date().getDate()}`;
      const nowDate = `${new Date().getFullYear()}-${month}-${day}`;
      this.form.publishTime = nowDate;
      const isLegalparam = this.checkCreateParams();
      if (!isLegalparam) {
        return this.$message({
          type: 'error',
          message: '请将参数填写完整'
        });
      }
      const result = await axios({
        url: '/api/tip/create',
        method: 'post',
        data: {
          tip: this.form
        }
      });
      const { code, message, state } = result.data;
      this.dialogFormVisible = false;
      if (code === 200) {
        this.$message({
          type: state,
          message
        });
      }
    },
    async deleteItem(val) {
      const result = await axios({
        url: '/api/tip/delete',
        method: 'post',
        data: {
          form: this.multipleSelection
        }
      });
      const { code, message, state } = result.data;
      if (code === 200) {
        this.$message({
          type: state,
          message
        });
      }
    },
    getTip() {
      axios({
        url: '/api/tip/getInfo',
        method: 'get'
      }).then(res => {
        totalData = res.data.tip;
        currentData = totalData;
        this.total = totalData.length;
        this.currentPage = 1;
        console.log('res', res);
        if (currentData.length) {
          this.tableData = currentData.slice(0, 10);
        }
      });
    },
    switchData(currentPage) {
      if (currentData.length) {
        this.tableData = currentData.slice(
          (currentPage - 1) * this.size,
          currentPage * this.size
        );
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.switchData(val);
    }
  }
};
</script>

<style lang="less">
.hot-line {
  padding: 0 60px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.pager {
  margin: 20px 0;
}
</style>
