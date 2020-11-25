<template>
  <view class="comp-error-log">
    <view class="error-list">
      <template v-for="(errItem, errItemI) in $store.state.errorList">
        <view :key="errItemI" class="error-item">
          {{ JSON.stringify(errItem) }}
        </view>
      </template>
    </view>
  </view>
</template>

<script>
  /**
   * 错误日志控制台
   * 【暂时用不到】
   */
  export default {
    name: 'comp-error-log',
  }
</script>

<style lang="scss" scoped>
  .comp-error-log {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30vh;
    box-sizing: border-box;
    padding: 30rpx;
    box-shadow: 0 -2px 10px #000;
    background-color: rgba(#000, .8);
    color: #fff;
    z-index: 99999;
  }
</style>
