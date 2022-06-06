<template>
  <el-row class="side-bar">
    <el-col :span="24">
      <img src="../assets/image/logo.png" class="logo" />
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1-0" @click="toTest">
          <i class="el-icon-edit"></i>测评问卷
        </el-menu-item>
        <el-menu-item index="1-1" @click="toMusic">
          <i class="el-icon-headset"></i>音乐管理
        </el-menu-item>
        <el-menu-item index="1-2" @click="toHotline">
          <i class="el-icon-phone-outline"></i>热线管理
        </el-menu-item>
        <el-menu-item index="1-3" @click="toActive">
          <i class="el-icon-date"></i>活动管理
        </el-menu-item>
        <el-menu-item index="1-4" @click="toArticle">
          <i class="el-icon-document"></i>文章管理
        </el-menu-item>
        <el-menu-item index="1-5" @click="toTip">
          <i class="el-icon-magic-stick"></i>知识管理
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toTest(){
      this.$router.push('/test');
    },
    toMusic(){
      this.$router.push('/music');
    },
    toHotline(){
      this.$router.push('/hotline');
    },
    toActive(){
      this.$router.push('/active');
    },
    toArticle(){
      this.$router.push('/article');
    },
    toTip(){
      this.$router.push('/tip');
    },
  }
};
</script>
<style scoped>
.side-bar {
  width: 200px;
  height: 100vh;
  overflow: scroll;
}

.logo {
  height: 80px;
  width: 100%;
}
</style>