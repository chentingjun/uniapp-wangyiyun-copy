<template>
  <view class="comp-login flex flex-align-center flex-justify-between">
    <view class="user-status flex flex-align-center">
      <image
        v-if="userinfo && userinfo.avatar"
        class="user-image"
        :src="userinfo.avatar"
      />
      <text v-else class="iconfont iconren"></text>
      <text :class="{'is-login': userinfo}">{{ userName }}</text>
    </view>
    <u-button
      class="btn-login"
      shape="circle"
      size="mini"
      @click="handleToggerLogin"
    >{{userinfo ? '退出登录' : '立即登录'}}</u-button>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'comp-login',
    computed: {
      ...mapState(['userinfo']),
      userName() {
        if (this.userinfo) {
          return this.userinfo.username
        }
        return '未登录'
      }
    },
    methods: {
      handleToggerLogin() {
        if (this.userinfo) {
          this.$store.commit('updateUserInfo')
          uni.redirectTo({
            url: '/pages/home/home'
          })
        } else {
          uni.redirectTo({
            url: '/pages/login/login'
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.comp-login {}
.user-status {
  color: #bebebe;
}
.user-image {
  height: 48rpx;
  width: 48rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}
.is-login {
  color: #010101;
  font-size: 36rpx;
}
.iconren {
  margin-right: 10rpx;
  font-size: 48rpx;
}
.btn-login {
  margin: 0;
  margin-left: 20rpx;
}
</style>
