<template>
  <view class="imt-audio">
    <view class="audio-wrapper">
      <view class="audio-number">{{current | playTime}}</view>
      <slider class="audio-slider" :activeColor="color" block-size="16" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
        @change="audio.seek($event.detail.value)"></slider>
      <view class="audio-number">{{duration | playTime}}</view>
    </view>
    <view class="audio-control-wrapper" :style="{color}">
      <view
        v-if="control"
        class="audio-control iconfont iconplay-prev"
        :class="{disabled: prevDisable}"
        :style="{borderColor:color}"
        @click="prev"
      >
      </view>
      <view
        class="audio-control audio-control-switch iconfont"
        :class="switchBtnClass"
        :style="{borderColor:color}"
        @click="audio.paused?play():audio.pause()"
      ></view>
      <view
        v-if="control"
        class="audio-control iconfont iconplay-next"
        :class="{disabled: nextDisable}"
        :style="{borderColor:color}"
        @click="next"
      >
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        audio: uni.createInnerAudioContext(),
        current: 0, //当前进度(s)
        duration: 0, //总时长(s)
        paused: true, //是否处于暂停状态
        loading: false, //是否处于读取状态
        seek: false //是否处于拖动状态
      }
    },
    props: {
      src: String, //音频链接
      onHide: Boolean, // 页面是否隐藏
      // 前一个禁用
      prevDisable: Boolean,
      // 后一个禁用
      nextDisable: Boolean,
      // 播放禁用
      playDisable: Boolean,
      autoplay: Boolean, //是否自动播放
      loop: Boolean,
      control: {
        type: Boolean,
        default: true
      }, //是否需要上一曲/下一曲按钮
      color: {
        type: String,
        default: '#169af3'
      }, //主色调
      reload: Boolean,
      /**
       * play: 开始播放
       * pause: 暂停
       * stop: 停止
       * reload: 重载
       * 其他: 无操作
       */
      audioState: {
        type: String,
        default: 'auto',
      }
    },
    computed: {
      switchBtnClass() {
        // if (this.loading) {
        //   return ['iconjiazaizhong', 'audioLoading']
        // }
        const list = []
        if (this.playDisable) {
          list.push('disabled')
        }
        if (this.paused) {
          list.push('iconbofang1')
        } else {
          list.push('iconzanting')
          
        }
        return list
      }
    },
    filters: {
      playTime(val) {
        const allsecond = Math.ceil(val)
        const minutes = `0${Math.floor(allsecond / 60)}`.substr(-2)
        const second = `0${Math.ceil(allsecond % 60)}`.substr(-2)
        return `${minutes}:${second}`
      }
    },
    methods: {
      initAudio() {
        this.destroyAudio()
        this.createAudio()
      },
      destroyAudio() {
        if (this.audio) {
          this.audio.stop()
          //音频进度更新事件
          this.audio.offTimeUpdate(this.onTimeUpdate)
          //音频播放事件
          this.audio.offPlay(this.onPlay)
          //音频获取可播放时长
          this.audio.offCanplay(this.onCanplay)
          //音频暂停事件
          this.audio.offPause(this.onPause)
          //音频结束事件
          this.audio.offEnded(this.onEnded)
          //音频完成更改进度事件
          this.audio.offSeeked(this.onSeeked)
          this.audio.destroy()
        }
      },
      createAudio() {
        this.current = 0 //当前进度(s)
        this.duration = 0 //总时长(s)
        this.loading = false //是否处于读取状态
        this.seek = false //是否处于拖动状态
        this.audio = uni.createInnerAudioContext()
        // #ifndef APP-PLUS
        this.audio.obeyMuteSwitch = false
        // #endif
        this.audio.loop = this.loop // 循环播放
        //音频进度更新事件
        this.audio.onTimeUpdate(this.onTimeUpdate)
        //音频播放事件
        this.audio.onPlay(this.onPlay)
        //音频获取可播放时长
        this.audio.onCanplay(this.onCanplay)
        //音频暂停事件
        this.audio.onPause(this.onPause)
        //音频结束事件
        this.audio.onEnded(this.onEnded)
        //音频完成更改进度事件
        this.audio.onSeeked(this.onSeeked)
        this.audio.src = this.src
      },
      onTimeUpdate() {
        if (!this.seek) {
          this.current = this.audio.currentTime
        }
        if (!this.duration) {
          this.duration = this.audio.duration
        }
      },
      onPlay() {
        console.log('onPlay 播放了')
        this.paused = false
        this.loading = false
        this.$emit('onplay')
      },
      onCanplay() {
        console.log('可以播放了')
        // 如果是自动播放 或 切歌 则自动播放
        if (this.onHide) {
          console.log('is hide')
          return
        }
        if (this.autoplay || !this.paused) {
          this.play()
        }
        this.duration = this.audio.duration
      },
      onPause() {
        console.log('onPause 暂停了')
        this.paused = true
        this.$emit('onpaused')
      },
      onEnded() {
        console.log('onEnded 结束了')
        this.$emit('onended')
        this.paused = true
        this.current = 0
      },
      onSeeked() {
        this.seek = false
      },
      //返回prev事件
      prev() {
        if (this.prevDisable) return
        this.$emit('prev')
      },
      //返回next事件
      next() {
        if (this.nextDisable) return
        this.$emit('next')
      },
      //格式化时长
      //点击播放按钮
      play() {
        if (this.playDisable) return
        if (this.audio) {
          this.audio.play()
          this.loading = true
        }
      },
      pause() {
        this.audio.pause()
        this.paused = true
      },
      stop() {
        this.audio.stop()
        this.paused = true
      },
    },
    created() {
      this.initAudio()
    },
    beforeDestroy() {
      this.destroyAudio()
    },
    watch: {
      reload(val) {
        if (val) {
          this.initAudio()
        }
      },
      audioState(state) {
        if (state) {
          switch(state) {
            case 'reload':
              this.initAudio()
              break
            case 'pause':
              this.pause()
              break
            case 'stop':
              this.stop()
              break
            case 'play':
              this.play()
              break
          }
          this.$emit('update:audioState', '')
        }
      }
    },
  }
</script>

<style scoped>
  .imt-audio {
    padding: 30upx 0;
    background: #fff;
    border-radius: 20upx;
  }

  .audio-wrapper {
    display: flex;
    align-items: center;
  }

  .audio-number {
    width: 120upx;
    font-size: 24upx;
    line-height: 1;
    color: #333;
    text-align: center;
  }

  .audio-slider {
    flex: 1;
    margin: 0;
  }

  .audio-control-wrapper {
    margin-top: 20upx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "icon" !important;
  }

  .audio-control {
    font-size: 48rpx;
  }
  .disabled {
    color: #ccc;
  }
  
  .audio-control-switch {
    font-size: 100rpx;
    margin: 0 120rpx;
  }

  .audioLoading {
    animation: loading 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
</style>
