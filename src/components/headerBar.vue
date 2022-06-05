<template>
  <div class="header-bar">
    <div class="user-wrap">
      <div class="username">管理员</div>
      <img src="../assets/image/avatar.png" class="avatar" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.header-bar {
  height: 80px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-wrap {
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: 88px;
}

.username {
  font-size: 14px;
  color: #909399;
  margin-right: 10px;
}

.avatar {
  height: 30px;
  width: 30px;
  border-radius: 30px;
  cursor: pointer;
}

</style>