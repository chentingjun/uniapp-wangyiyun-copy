<template>
  <view class="register">
    <view class="input-form">
      <u-field
        v-model="username"
        label="用户名"
        placeholder="请填写用户名"
      >
      </u-field>
      <u-field
        v-model="password"
        label="账号密码"
        placeholder="请填写账号密码"
        type="password"
      >
      </u-field>
      <u-field
        v-model="repassword"
        label="确认密码"
        placeholder="请确认账号密码"
        type="password"
      >
      </u-field>
      <u-button class="btn-registe" @click="handleRegiste">注册</u-button>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
      }
    },
    methods: {
      handleRegiste() {
        const params = {
          username: this.username,
          password: this.password,
          repassword: this.repassword,
        }
        console.log('params ->', params)
        this.registeCalled(params)
      },
      async registeCalled(data) {
        uni.showLoading({
        	title: '注册中...'
        })
        try{
          await this.$http.registe(data)
          this.$refs.uToast.show({title: '注册成功',type: 'success', url: '/pages/login/login',})
        } catch(err) {
          console.error('err ->', err)
        } finally {
					uni.hideLoading()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register {}
  .input-form {
    width: 750rpx;
  }
  .btn-registe {
    width: 650rpx;
    margin-top: 50rpx;
    margin-left: 50rpx;
    margin-right: 50rpx;
  }
</style>
