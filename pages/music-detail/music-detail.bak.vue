<template>
  <scroll-view
    class="music-detail"
    scroll-y
    :style="{backgroundColor: bgColor}"
  >
    <template v-if="musicInfo">
      <view class="music-font-bg"> {{ musicInfo && musicInfo.title }} </view>
      <view class="title-tip">
        <text class="iconfont iconmusic"></text>
        <text>网易云音乐</text>
      </view>
      <view class="cd-wrapper">
        <view
          class="cd-bg"
          ref="cdBg"
          :style="{backgroundImage: `url(${musicInfo && musicInfo.posters})`}"
        >
        </view>
        <!-- 一个页面只需要一个播放器，这个暂时不需要 -->
        <!-- <audio-player size="150rpx" color="#fff" class="btn-player" :src="musicInfo.src" @onplay="playCd" @onpause="pauseCd" /> -->
      </view>
      <view class="audio-control-plugin">
        <imt-audio
          :src="musicInfo.src"
          :reload.sync="reloadAudio"
          :color="bgColor"
          :prev-disable="currentIndex === 0"
          :next-disable="currentIndex === total - 1"
          @onplay="playCd"
          @onpaused="pauseCd"
          @prev="playPrev"
          @next="playNext"
        ></imt-audio>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <button open-type="share" class="btn-share">
        <text class="iconfont iconhuaban19"></text>
        <text>分享给微信好友</text>
      </button>
      <!-- #endif -->
      <view class="comment-title">精彩评论</view>
      <comments :list="musicComments"></comments>
    </template>
    <view v-if="!musicInfo && !isLoadingDetail" class="no-music">
      未找到歌曲
    </view>
  </scroll-view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'music-detail',
    data() {
      return {
        // 重载音频
        reloadAudio: false,
        isLoadingDetail: true,
        total: 0,
        musicInfo: null,
        isPlaying: false,
        animation: null,
        musicComments: [],
      }
    },
    computed: {
      ...mapState({
        categoryId: state => state.musicDetailInfo.categoryId,
        bgColor: state => state.musicDetailInfo.bgColor || '#000000',
        currentIndex: state => state.musicDetailInfo.offset || 0,
      })
    },
    onShow() {
      console.log('music-detail onShow')
      this.initBg(this.bgColor)
      this.getMusicDetail()
    },
    onHide() {
      console.log('music-detail onHide')
    },
    onUnload() {
      console.log('music-detail onUnload')
    },
    methods: {
      initBg(color) {
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
      initCDAnimation() {
        const dom = this.$refs.cdBg.$el
        this.animation = dom
      },
      async getMusicDetail() {
        this.isLoadingDetail = true
        uni.showLoading({title: '加载中...'})
        try{
          const { list, total } = await this.$store.dispatch('updateMusicListByCategory', {
            id: this.categoryId, offset: this.currentIndex, limit: 1
          })
          if (list && list.length > 0) {
            this.total = total
            this.musicInfo = list[0]
            uni.setNavigationBarTitle({
              title: this.musicInfo.title,
            })
            this.getMusicComments(this.musicInfo._id)
          }
          this.isLoadingDetail = false
          uni.hideLoading()
        }catch(e){
          //TODO handle the exception
          this.isLoadingDetail = false
          uni.hideLoading()
        }
      },
      async getMusicComments(id) {
        const list = await this.$http.getMusicComments({id, limit: 10})
        console.log('list ->', list)
        this.musicComments = list
      },
      playCd() {
        if (this.animation) return this.animation.play()
        const cdBg = this.$refs.cdBg
        if (cdBg) {
          const dom = cdBg.$el
          const ani = dom.getAnimations()[0]
          this.animation = ani
          ani.play()
        }
      },
      pauseCd() {
        if (this.animation) return this.animation.pause()
        const cdBg = this.$refs.cdBg
        if (cdBg) {
          const dom = cdBg.$el
          const ani = dom.getAnimations()[0]
          this.animation = ani
          ani.pause()
        }
      },
      async playPrev() {
        console.log('play prev')
        let musicIndex = this.currentIndex - 1
        if (musicIndex < 0) return
        this.$store.commit('updateMusicDetailInfo', {offset: musicIndex})
        await this.getMusicDetail()
        this.reloadAudio = true
      },
      async playNext() {
        console.log('play next')
        let musicIndex = this.currentIndex + 1
        if (musicIndex > this.total - 1) return
        this.$store.commit('updateMusicDetailInfo', {offset: musicIndex})
        this.getMusicDetail()
        this.reloadAudio = true
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
    
    .no-music {
      color: #fff;
      font-size: 64rpx;
      padding-top: 100rpx;
      text-align: center;
    }

    .music-font-bg {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg) scale(5, 15);
      color: transparent;
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
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
      }

      .cd-bg {
        width: 350rpx;
        height: 350rpx;
        border-radius: 50%;
        background-size: contain;
        animation: cdplay 5s linear infinite;
        animation-play-state: paused;
      }

      .btn-player {
        position: absolute;
        color: red;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        box-shadow: 0 0 40rpx #ccc inset;
        z-index: 1;
      }
    }

    .audio-control-plugin {
      margin: 150rpx 30rpx 30rpx;
    }
    
    .btn-share {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30rpx;
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
    .comment-title {
      color: #fff;
      font-size: 32rpx;
      margin-top: 50rpx;
      margin-left: 30rpx;
      font-weight: 700;
      margin-bottom: 40rpx;
    }
  }
</style>
