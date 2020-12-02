<template>
  <view class="setting-item">
    <slot />
    <view class="item-right">
      <slot name="tip"></slot>
      <text class="iconfont iconyou1"></text>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'setting-item'
  }
</script>

<style lang="scss" scoped>
  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-right {
      display: flex;
      align-items: center;
    }
    .iconyou1 {
      margin-left: 10rpx;
    }
  }
</style>
