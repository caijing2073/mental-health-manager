<template>
  <div class="home">
    <SideBar></SideBar>
    <div class="main">
      <HeaderBar></HeaderBar>
      <div class="manager-page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/sideBar.vue';
import HeaderBar from '../components/headerBar.vue';
export default {
  name: 'home',
  components: {
    SideBar,
    HeaderBar
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  width: 100%;
  display: flex;
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    .manager-page {
      flex: 1;
      background-color: #f4f4f5;
    }
  }
}
</style>
