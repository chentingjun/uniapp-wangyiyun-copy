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
      <view class="btn-register flex flex-justify-end" @click="handleRegiste">
        <text style="color: #2B85E4;">没有账号？去注册</text>
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
          const userinfo = await this.$http.login(params)
          uni.hideLoading()
          if (userinfo) {
            this.$store.commit('updateUserInfo', userinfo)
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
  }
</style>
