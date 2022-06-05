<template>
  <div class="hot-line">
    <ToolBar @search="search" @create="create" @deleteItem="deleteItem"></ToolBar>
    <el-dialog title="新增热线" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="属地" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="热线标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="在线时间" :label-width="formLabelWidth">
          <el-input v-model="form.online" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.contact" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createHotline">确 定</el-button>
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
      <el-table-column label="属地" width="70">
        <template slot-scope="scope">{{ scope.row.region }}</template>
      </el-table-column>
      <el-table-column prop="title" label="热线标题"></el-table-column>
      <el-table-column prop="online" label="在线时间"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
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
let totalHotlineData = [];
let currentHotLineData = [];
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
        region: '',
        title: '',
        online: '',
        contact: ''
      },
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.getHotline();
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
        this.getHotline();
        return;
      } else {
        totalHotlineData.forEach(hotlineItem => {
          Object.keys(hotlineItem).forEach(key => {
            if (hotlineItem[key].includes(val)) {
              result.push(hotlineItem);
            }
          });
        });
        currentHotLineData = result.slice(1);
        this.total = result.length;
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
    async createHotline() {
      const isLegalparam = this.checkCreateParams();
      if (!isLegalparam) {
        return this.$message({
          type: 'error',
          message: '请将参数填写完整'
        });
      }
      const result = await axios({
        url: '/api/hotline/create',
        method: 'post',
        data: {
          form: this.form
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
      if (!this.multipleSelection.length) return;
      const result = await axios({
        url: '/api/hotline/delete',
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
    getHotline() {
      axios({
        url: '/api/hotline/getInfo',
        method: 'get'
      }).then(res => {
        totalHotlineData = res.data;
        currentHotLineData = totalHotlineData;
        this.total = res.data.length;
        this.currentPage = 1;
        this.tableData = currentHotLineData.slice(0, 10);
      });
    },
    switchData(currentPage) {
      this.tableData = currentHotLineData.slice(
        (currentPage - 1) * this.size,
        currentPage * this.size
      );
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
