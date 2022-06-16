<template>
  <div class="test">
    <!-- 删除标签提示dialog -->
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
      <span>
        确定要删除
        <span class="strong-tip">{{ selectedTag.tag }}</span> 类型的测评吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDialogVisible = false">取 消</el-button>
        <el-button @click="deleteTag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加标签dialog -->
    <el-dialog title="提示" :visible.sync="addDialogVisible" width="30%">
      <span>
        确定要添加
        <span class="strong-tip">{{ selectedTag }}</span> 类型的测评吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 测评标签 -->
    <div class="test-type_wrap">
      测评类型：
      <el-tag type="success" v-for="tag in fixTag" :key="tag">{{ tag }}</el-tag>
      <el-tag
        :key="tag.tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{ tag.tag }}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

    <!-- 编辑标签信息 -->
    <div class="test-type-set_wrapp">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="tag" label="测评类型" width="180"></el-table-column>
        <el-table-column label="icon">
          <template slot-scope="scope">
            <img v-if="scope.row.icon" :src="scope.row.icon" class="table-icon" />
          </template>
        </el-table-column>
        <el-table-column label="被选中时icon">
          <template slot-scope="scope">
            <img v-if="scope.row.selectedIcon" :src="scope.row.selectedIcon" class="table-icon" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editTest(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 修改问卷信息 -->
    <el-dialog title="编辑测评信息" :visible.sync="questionnaireListDialogFormVisible">
      <el-form :model="questionnaireListform">
        <el-form-item label="测评类型" label-width="180">
          <el-input v-model="questionnaireListform.tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认icon" label-width="180">
          <img v-if="questionnaireListform.icon" :src="questionnaireListform.icon" />
          <el-upload
            v-else
            class="upload-demo"
            drag
            action="/api/test/editTagInfo"
            :data="{
              tag: questionnaireListform.tag,
              type: 'icon'
            }"
            multiple
            :on-success="uploadTagIcon"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="被选中icon" label-width="180">
          <img v-if="questionnaireListform.selectedIcon" :src="questionnaireListform.icon" />
          <el-upload
            v-else
            class="upload-demo"
            drag
            action="/api/test/editTagInfo"
            :data="{
              tag: questionnaireListform.tag,
              type: 'selectedIcon'
            }"
            multiple
            :on-success="uploadTagIcon"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="questionnaireListDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="questionnaireListDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 创建问卷的dialog -->
    <div class="add" @click="createQSDialog = true">+ 创建问卷</div>
    <el-dialog title="创建问卷" :visible.sync="createQSDialog">
      <el-form :model="questionnaForm">
        <el-form-item label="问卷标题" label-width="180">
          <el-input v-model="questionnaForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="测评类型" label-width="180">
          <el-select v-model="questionnaForm.type" placeholder="请选择测评类型">
            <el-option
              v-for="type in dynamicTags"
              :key="type.index"
              :label="type.tag"
              :value="type.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问卷描述" label-width="180">
          <el-input v-model="questionnaForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目" label-width="180">
          <el-input v-model="questionnaForm.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应得分区间展示结果" label-width="180">
          <el-input v-model="questionnaForm.result" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createQSDialog = false">取 消</el-button>
        <el-button type="primary" @click="createQS">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      ref="multipleTable"
      :data="testTableData"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      stripe
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" width="120" label="问卷标题"></el-table-column>
      <el-table-column prop="type" width="120" label="问卷类型"></el-table-column>
      <el-table-column prop="thumbnail" width="120" label="缩略图"></el-table-column>
      <el-table-column prop="desc" width="120" label="问卷描述"></el-table-column>
      <el-table-column prop="question" width="120" label="题目"></el-table-column>
      <el-table-column prop="result" label="对应得分区间展示结果"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editQuestionnaireList(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
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
export default {
  data() {
    return {
      fixTag: ['全部'],
      dynamicTags: [],
      selectedTag: '',
      inputVisible: false,
      inputValue: '',
      deleteDialogVisible: false,
      addDialogVisible: false,
      tableData: [],
      testTableData: [],
      total: 0,
      currentPage: 0,
      questionnaireListform: {},
      questionnaireListDialogFormVisible: false,
      createQSDialog: false,
      questionnaForm: {},
      editIndex: 0
    };
  },
  mounted() {
    // this.dynamicTags.forEach(item => {
    //   const dataItem = {
    //     tag: item,
    //     icon: '',
    //     selectedIcon: '',
    //   }
    //   this.tableData.push(dataItem)
    // })
    this.getAll();
  },
  methods: {
    changeTagInfo() {
      axios({
        url: '/api/test/editTagInfo',
        method: 'post',
        data: {
          tag: this.questionnaireListform.tag
        }
      });
    },
    getAll() {
      axios({
        url: '/api/test/getAllTag',
        method: 'get'
      }).then(res => {
        const { tagData } = res.data;
        console.log('tagData:', tagData);
        this.dynamicTags = tagData;
        this.tableData = tagData;
      });
    },
    handleClose(tag) {
      this.selectedTag = tag;
      this.deleteDialogVisible = true;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.selectedTag = inputValue;
        this.addDialogVisible = true;
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    createTag() {
      this.addDialogVisible = false;
      axios({
        url: '/api/test/createTag',
        method: 'post',
        data: {
          tag: this.selectedTag
        }
      })
        .then(res => {
          this.dynamicTags.push({ tag: this.selectedTag });
          this.$message({
            type: 'success',
            message: '成功添加标签'
          });
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '添加标签失败'
          });
        });
    },
    deleteTag() {
      axios({
        url: '/api/test/deleteTag',
        method: 'post',
        data: {
          tagInfo: this.selectedTag
        }
      }).then(res => {
        this.$message(res.data);
        this.dynamicTags.splice(this.dynamicTags.indexOf(this.selectedTag), 1);
      });
      this.deleteDialogVisible = false;
    },
    editTagInfo() {},
    uploadTagIcon(msg) {
      this.$message({
        type: 'success',
        message: '上传图片成功'
      });
      const { type, imageFullCode } = msg;
      this.tableData[this.editIndex][type] = imageFullCode;
      console.log(this.tableData);
    },
    // 编辑tag信息
    editTest(rowInfo) {
      this.questionnaireListform = rowInfo;
      const editIndex = this.tableData.findIndex(
        item => item.tag === rowInfo.tag
      );
      this.editIndex = editIndex;
      this.questionnaireListDialogFormVisible = true;
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
    },
    editQuestionnaireList(index) {
      console.log('index:', index);
    },
    createQS() {
      this.createQSDialog = false;
      axios({
        method: 'post',
        url: '/api/test/question',
        data: this.questionnaForm
      });
      console.log('questionnaForm:', this.questionnaForm);
    },
    getQSRes() {
      axios({
        method: 'get',
        url: '/api/test/getQS'
      }).then(res => {
        this.testTableData = res.data;
      });
    }
  }
};
</script>

<style lang="less">
.test {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  .strong-tip {
    font-size: 20px;
    font-weight: 600;
  }
  .test-type_wrap {
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    .input-new-tag {
      width: 100px;
    }
  }
  .table-icon {
    height: 25px;
    width: 25px;
  }
}
.add {
  margin: 20px 0 10px 0;
  text-align: right;
  font-size: 16px;
  font-weight: 400;
  color: #409eff;
  cursor: pointer;
}
</style>
