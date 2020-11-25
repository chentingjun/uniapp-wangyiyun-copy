<template>
  <view class="flex-column flex-align-center">
    <image class="logo" src="/static/logo.png"></image>
    <view>hello</view>
  </view>
</template>

<script>
  export default {
    onLoad() {
      const userinfo = this.$store.state.userinfo
      if (!userinfo) {
        uni.redirectTo ({
          url: '/pages/login/login'
        })
      } else {
        uni.redirectTo ({
          url: '/pages/home/home'
        })
      }
    }
  }
</script>

<style scoped>
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-bottom: 50rpx;
  }
  .input-form {
    width: 750rpx;
  }
  .btn-login {
    margin-top: 50rpx;
    margin-left: 50rpx;
    margin-right: 50rpx;
  }
  .btn-register {
    margin-top: 20rpx;
    margin-right: 50rpx;
  }
</style>
