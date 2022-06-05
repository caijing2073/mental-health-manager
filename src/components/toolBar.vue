<template>
  <div class="tool-bar">
    <div class="left-box">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
      <el-button @click="search" class="search-btn" type="primary" icon="el-icon-search">查找</el-button>
      <el-button @click="create" class="create-btn" type="primary" icon="el-icon-plus">新增</el-button>
    </div>
    <el-button @click="deleteItem" class="delete-btn" type="danger" icon="el-icon-delete">删除</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  },
  methods: {
    search() {
      this.$emit('search', this.input);
    },
    create() {
      this.$emit('create');
    },
    deleteItem() {
      this.$emit('deleteItem');
    }
  }
};
</script>
<style scoped>
.tool-bar {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-box {
  width: 472px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-btn {
  margin-left: 20px;
}
</style>