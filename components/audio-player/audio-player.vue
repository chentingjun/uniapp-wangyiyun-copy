<template>
  <view v-if="innerAudioContext" class="comp-audio-player">
    <text v-if="isPlaying" class="iconfont iconzanting" :style="{color, fontSize: size}" @click="handlePause"></text>
    <text v-else class="iconfont iconbofang" :style="{color, fontSize: size}" @click="handlePlay"></text>
  </view>
</template>

<script>
  export default {
    name: 'comp-audio-player',
    props: {
      src: String,
      size: {
        type: String,
        default: '60rpx'
      },
      color: {
        type: String,
        default: '#ddd'
      },
    },
    data() {
      return {
        innerAudioContext: null,
        isPlaying: false,
      }
    },
    watch: {
      src(currentSrc) {
        console.log('to watch')
        if (currentSrc) {
          this.initAudio()
        }
      }
    },
    mounted() {
      console.log('mounted')
      this.initAudio()
    },
    onHide() {
      this.handlePause()
    },
    destroyed() {
      this.handleStop()
    },
    methods: {
      initAudio() {
        const innerAudioContext = uni.createInnerAudioContext();
        innerAudioContext.autoplay = false;
        innerAudioContext.src = this.src;
        innerAudioContext.onPlay(this.audioOnPlay);
        innerAudioContext.onPause(this.audioOnPause);
        innerAudioContext.onEnded(this.audioOnEnd);
        innerAudioContext.onError(this.audioOnError);
        this.innerAudioContext = innerAudioContext
      },
      audioOnError(res) {
        console.log('播放错误')
        console.log(res.errMsg);
        console.log(res.errCode);
      },
      audioOnPlay() {
        console.log('开始播放')
        this.$emit('onplay')
        this.isPlaying = true
      },
      audioOnPause() {
        console.log('暂停播放')
        this.$emit('onpause')
        this.isPlaying = false
      },
      audioOnEnd() {
        console.log('播放结束')
        this.$emit('onend')
        this.isPlaying = false
      },
      handlePlay() {
        this.innerAudioContext.play()
      },
      handlePause() {
        this.innerAudioContext.pause()
      },
      handleStop() {
        this.innerAudioContext.stop()
      },
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes loading {
    from { transform: rotate(0deg); }
    to { transfrom: rotate(360deg); }
  }
  .comp-audio-player {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .iconfont {
      font-size: 60rpx;
      color: #ddd;
    }
    .iconjiazaizhong {
      transform: rotate(360deg);
      animation: loading 1s linear infinite;
    }
  }
</style>
