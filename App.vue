<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // uni.navigateTo({
      //   url: '/pages/home/home'
      // })
      // 验证用户信息，重定向页面
      // const userinfo = this.$store.state.userinfo
      // if (!userinfo) {
      //   uni.navigateTo({
      //     url: '/pages/login/login'
      //   })
      // } else {
      //   uni.navigateTo({
      //     url: '/pages/home/home'
      //   })
      // }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "uview-ui/index.scss";
  @import url("./static/style/index.scss");
</style>
