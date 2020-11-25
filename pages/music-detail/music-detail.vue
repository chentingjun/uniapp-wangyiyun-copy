<template>
  <view
    v-if="musicInfo"
    class="music-detail"
    :style="{backgroundColor: bgColor}"
  >
    <view class="music-font-bg"> {{ musicInfo && musicInfo.title }} </view>
    <view class="title-tip">
      <text class="iconfont iconmusic"></text>
      <text>网易云音乐</text>
    </view>
    <view class="cd-wrapper">
      <view
        class="cd-bg"
        :animation="animationData"
        :style="{backgroundImage: `url(${musicInfo && musicInfo.posters})`}"
      ></view>
      <audio-player
        size="150rpx"
        color="#fff"
        class="btn-player"
        :src="musicInfo.src"
        @onplay="playCd"
        @onpause="pauseCd"
      />
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <button open-type="share" class="btn-share">
      <text class="iconfont iconhuaban19"></text>
      <text>分享给微信好友</text>
    </button>
    <!-- #endif -->
    <comments :list="comments"></comments>
  </view>
</template>

<script>
  export default {
    name: 'music-detail',
    data() {
      return {
        bgColor: '#000000',
        animation: null,
        animationData: null,
        playTimer: null,
        animationDuration: 20,
        animationRotate: 0,
        musicInfo: null,
        isPlaying: false,
        comments: [],
      }
    },
    onLoad({ id, bgcolor }) {
      if (id) {
        this.getMusicDetail(id)
      }
      this.initAnimation()
      this.initBg(bgcolor)
    },
    onShow() {
      console.log('music-detail onShow')
    },
    onHide() {
      console.log('music-detail onHide')
    },
    onUnload() {
      console.log('music-detail onUnload')
      clearInterval(this.playTimer)
    },
    methods: {
      initBg(color) {
        this.bgColor = color
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.bgColor,
        })
        // #ifdef MP-WEIXIN
        uni.setBackgroundColor({
          backgroundColor: this.bgColor,
        })
        // #endif
      },
      initAnimation() {
        this.animation = uni.createAnimation({
          timingFunction: "linear",
          duration: this.animationDuration,
        })
      },
      async getMusicDetail(id) {
        const res = await this.$http.getMusicDetail({id})
        console.log('res ->', res)
        this.musicInfo = res
        uni.setNavigationBarTitle({
          title: res.title,
        })
      },
      async getMusicComments(id) {
        // const res = await this.$http.getMusicDetail({id})
        // console.log('res ->', res)
        this.musicComments = [
          {
            name: 'name',
            createTime: '2020年11月23日',
            zan: '431',
            content: 'hello world'
          }
        ]
      },
      playCd() {
        console.log('开始动画：this.animationRotate: ', this.animationRotate)
        this.animation.rotate(this.animationRotate).step()
        this.animationData = this.animation.export()
        this.playTimer = setInterval(() => {
          this.animationRotate += 1
          console.log('循环动画：this.animationRotate: ', this.animationRotate)
          this.animation.rotate(this.animationRotate).step()
          this.animationData = this.animation.export()
        }, this.animationDuration)
      },
      pauseCd() {
        clearInterval(this.playTimer)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .music-detail {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    perspective: 10000;
    .music-font-bg {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg) scale(5, 15);
      color: rgba($color: red, $alpha: .7);
      text-shadow: 5rpx 5rpx 5rpx #FF0000;
      z-index: -1000;
    }
    .title-tip {
      color: #fff;
      padding-top: 20rpx;
      padding-left: 20rpx;
    }
    .iconmusic {
      color: #fff;
      background-color: #c52d25;
      border-radius: 50%;
      padding: 4rpx;
      margin-right: 10rpx;
    }
    .cd-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-sizing: border-box;
      width: 500rpx;
      height: 500rpx;
      margin-left: 125rpx;
      margin-top: 100rpx;
      border-radius: 50%;
      @keyframes cdplay {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .cd-bg {
        position: absolute;
        width: 350rpx;
        height: 350rpx;
        border-radius: 50%;
        background-size: contain;
        // transform: rotate(0);
        // animation: cdplay 15s linear infinite;
        // animation-play-state: paused;
        z-index: 0;
      }
      .btn-player {
        color: red;
        border-radius: 50%;
        box-shadow: 0 0 40rpx #ccc inset;
        z-index: 1;
      }
    }
    .btn-share {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 300rpx;
      width: 300rpx;
      border-radius: 50rpx;
      height: 60rpx;
      font-size: 24rpx;
      color: #fff;
      border: 2rpx solid #fff;
      background-color: rgba($color: #000, $alpha: .1);
    
      &::after {
        border: 0;
      }
    
      .iconhuaban19 {
        margin-right: 10rpx;
        font-size: 28rpx;
      }
    }
  }
</style>
