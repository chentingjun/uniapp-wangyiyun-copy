<template>
  <view class="login flex-column flex-align-center">
    <!-- <image class="logo" src="/static/logo.png"></image> -->
    <text class="iconfont iconcrew_feature"></text>
    <view class="input-form">
      <u-field
        v-model="username"
        label="用户名"
        placeholder="请填写用户名"
      >
      </u-field>
      <u-field
        v-model="password"
        label="密码"
        placeholder="请填写密码"
        type="password"
      >
      </u-field>
      <view class="btn-wrapper">
        <u-button class="btn-login" @click="handleLogin">登录</u-button>
      </view>
      <view class="btn-register flex flex-justify-between">
        <text style="color: #2B85E4;" @click="handleNoLogin">暂不登录</text>
        <text style="color: #2B85E4;" @click="handleRegiste">没有账号？去注册</text>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <u-divider style="margin-bottom: 50rpx;">第三方登录</u-divider>
      <view class="login-with-wrapper">
        <button class="wx-login btn" open-type="getUserInfo" @getuserinfo="loginWithWx">
          <text class="iconfont iconweixin"></text>
        </button>
      </view>
      <!-- #endif -->
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    onLoad() {

    },
    methods: {
      async handleLogin() {
        const params = {
          username: this.username,
          password: this.password,
        }
        uni.showLoading({title: '登录中...'})
        try{
          const userInfo = await this.$http.login(params)
          uni.hideLoading()
          if (userInfo) {
            this.$store.commit('updateUserInfo', userInfo)
          }
          this.$refs.uToast.show({
            title: '登录成功',
            type: 'success',
            duration: '1000',
            callback: () => {
              uni.redirectTo({url: '/pages/home/home',})
            }
          })
        }catch(e){
          uni.hideLoading()
          //TODO handle the exception
        }
      },
      // #ifdef MP-WEIXIN
      async loginWithWx({ detail }) {
        uni.showLoading({title: '登录中...'})
        const { nickName, avatarUrl, ...otherUserInfo } = detail.userInfo || {}
        try{
          const userInfo = await this.$http.login({
            loginType: 'wx',
            username: nickName,
            avatar: avatarUrl,
            ...otherUserInfo,
          })
          uni.hideLoading()
          if (userInfo) {
            this.$store.commit('updateUserInfo', userInfo)
          }
          this.$refs.uToast.show({
            title: '登录成功',
            type: 'success',
            duration: '1000',
            callback: () => {
              uni.redirectTo({url: '/pages/home/home',})
            }
          })
        }catch(e){
          //TODO handle the exception
          console.log('wx 登录失败', e)
        }
      },
      // #endif
      handleNoLogin() {
        uni.redirectTo({
          url: '../home/home'
        })
      },
      handleRegiste() {
        uni.redirectTo({
          url: '../register/register'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  // .logo {
  //   height: 200rpx;
  //   width: 200rpx;
  //   margin-top: 200rpx;
  //   margin-bottom: 50rpx;
  // }
  .iconcrew_feature {
    font-size: 200rpx;
    margin-top: 150rpx;
    margin-bottom: 80rpx;
    color: #d80000;
    text-shadow: 0 0rpx 80rpx #d80000;
  }
  .input-form {
    width: 750rpx;
  }
  .btn-wrapper {
    padding: 50rpx;
  }
  .btn-register {
    margin: 20rpx 50rpx 80rpx;
  }
  /* #ifdef MP-WEIXIN */
  .login-with-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      margin: 30rpx;
    }
    .iconweixin {
      font-size: 60rpx;
    }
    .wx-login {
      padding: 0;
      background-color: transparent;
      color: #2B85E4;
      line-height: inherit;
      &::after {
        border: 0;
      }
    }
  }
  /* #endif */
</style>
