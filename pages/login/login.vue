<template>
  <view class="login flex-column flex-align-center">
    <image class="logo" src="/static/logo.png"></image>
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
        <!-- #ifdef MP-WEIXIN -->
        <button class="wx-login" open-type="getUserInfo" @getuserinfo="loginWithWx">微信账号快捷登录</button>
        <!-- #endif -->
        <text style="color: #2B85E4;" @click="handleRegiste">没有账号？去注册</text>
      </view>
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
        console.log('detail ->', detail)
        const { nickName, avatarUrl, ...otherUserInfo } = detail.userInfo || {}
        try{
          const userInfo = await this.$http.login({
            loginType: 'wx',
            username: nickName,
            avatar: avatarUrl,
            ...otherUserInfo,
          })
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
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-bottom: 50rpx;
  }
  .input-form {
    width: 750rpx;
  }
  .btn-wrapper {
    padding: 50rpx;
  }
  .btn-register {
    margin-top: 20rpx;
    margin-right: 50rpx;
    margin-left: 50rpx;
  }
  /* #ifdef MP-WEIXIN */
  .wx-login {
    font-size: 28rpx;
    background-color: transparent;
    color: #2B85E4;
    line-height: inherit;
    &::after {
      border: 0;
    }
  }
  /* #endif */
</style>
