<template>
  <div class="test">
    <div class="test-type_wrap">
      音乐类型：
      <el-tag type="success" v-for="tag in fixTag" :key="tag">{{ tag }}</el-tag>
    </div>

    <el-dialog title="编辑音乐类型信息" :visible.sync="editTagDialogVisible">
      <el-form :model="editTagForm">
        <el-form-item label="测评类型" label-width="180">
          <el-input disabled="true" v-model="editTagForm.tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="icon" label-width="180">
          <img v-if="editTagForm.icon" :src="editTagForm.icon" />
          <el-upload
            v-else
            class="upload-demo"
            drag
            action="/api/music/editMusicInfo"
            :data="{
              tag: editTagForm.tag,
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTagDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTagDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="test-type-set_wrapp">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="tag" label="音乐类型"></el-table-column>
        <el-table-column label="icon">
          <template slot-scope="scope">
            <img v-if="scope.row.icon" :src="scope.row.icon" class="table-icon" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editMusic(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="add" @click="createMusicDialog = true">+ 添加音乐</div>
    <el-dialog title="添加音乐" :visible.sync="createMusicDialog">
      <el-form :model="musicForm">
        <el-form-item label="心情类型" label-width="180">
          <el-select v-model="musicForm.type" placeholder="请选择音乐心情">
            <el-option v-for="type in fixTag" :key="type" :label="type" :value="type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图" label-width="180">
          <img v-if="musicForm.icon" :src="musicForm.icon" />
          <el-upload
            v-else
            class="upload-demo"
            drag
            action="/api/music/editMusicInfo"
            :data="{
              tag: musicForm.tag,
            }"
            multiple
            :on-success="uploadTagIcon"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="音乐" label-width="180">
          <div v-if="musicForm.music">{{musicForm.music}}</div>
          <el-upload
            v-else
            class="upload-demo"
            drag
            action="/api/music/editMusicInfo"
            :data="{
              tag: musicForm.tag,
              type: 'music'
            }"
            multiple
            :on-success="uploadTagIcon"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createMusicDialog = false">取 消</el-button>
        <el-button type="primary" @click="createMusicDialog">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      ref="multipleTable"
      :data="musicTableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top:20px;"
      stripe
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="thumbnail" label="缩略图"></el-table-column>
      <el-table-column prop="desc" label="音乐文件"></el-table-column>
      <el-table-column prop="question" label="心情"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editMusicList(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      fixTag: ['忧伤', '快乐', '平静', '兴趣', '寂寞', '治愈'],
      selectedTag: '',
      inputValue: '',
      tableData: [],
      editTagDialogVisible: false,
      createMusicDialog: false,
      musicForm: {},
      editTagForm: {},
      musicTableData: '',
      currentPage: 1,
      total: 0
    };
  },
  mounted() {
    this.fixTag.forEach(tag => {
      this.tableData.push({
        tag
      });
    });
  },
  methods: {
    editMusicList(val) {},
    test() {
      axios({
        url: '/api/test/getAll',
        method: 'get'
      }).then(res => {
        console.log(res.data);
      });
    },
    handleClose(tag) {
      this.selectedTag = tag;
      this.deleteDialogVisible = true;
    },
    editMusic(val) {
      this.editTagDialogVisible = true;
      this.editTagForm = val;
    },
    uploadTagIcon(msg) {
      this.$message({
        type: 'success',
        message: '上传图片成功'
      });
      const { imageFullCode } = msg;
      this.tableData[this.editIndex].icon = imageFullCode;
      console.log(this.tableData);
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
  margin-top: 10px;
  font-weight: 300;
}
</style>
