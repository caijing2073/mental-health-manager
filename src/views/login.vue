<template>
  <div class="login">
    <div class="login-wrap">
      <div class="title">心理测试后台管理系统</div>
      <div class="content">
        <el-form label-position="left" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.region" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="login-btn" type="primary" @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    };
  },
  methods: {
    login() {
      this.$router.push('/');
    },
  }
};
</script>

<style lang="less">
.login {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: rgb(192, 205, 228);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap {
  width: 400px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .login-btn {
    margin-top: 10px;
    width: 70%;
  }
}
</style>
