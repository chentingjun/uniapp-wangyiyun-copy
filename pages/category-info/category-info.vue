<template>
  <view v-if="categoryInfo" class="category-info" :style="{backgroundColor: categoryInfo.detailBgColor}">
    <view class="music-header flex flex-align-center">
      <view class="header-card flex-none flex flex-align-center flex-justify-center" :style="{backgroundColor: categoryInfo.markColor}">
        <text class="card-title">{{ categoryTitle }}</text>
        <view class="card-amount flex flex-align-center">
          <text class="iconfont iconbofang-simple"></text>
          <text>{{ categoryInfo.playAmount }}</text>
        </view>
      </view>
      <view class="header-right">
        <view class="right-title"> <text class="right-title-text">{{ categoryInfo.subTitle }}</text> </view>
        <view class="music-copyright">
          <text class="iconfont iconmusic"></text>
          <text class="music-copyright-text">{{ categoryInfo.copyright }}</text>
        </view>
        <view class="right-desc" @click="toCategoryDetail">
          <text class="right-desc-text">{{ categoryInfo.desc }}</text>
          <u-icon class="desc-text-right" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <button open-type="share" class="btn-share">
      <text class="iconfont iconhuaban19"></text>
      <text>分享给微信好友</text>
    </button>
    <!-- #endif -->
    <view class="music-wrapper">
      <view class="music-wrapper-header flex flex-align-center" @click="toMusicDetail(musicList[0]._id)">
        <text class="iconfont iconbofang1"></text>
        <text>播放全部</text>
        <text class="play-all-tip">（共{{ totalCount }}首）</text>
      </view>
      <template v-for="(musicInfo, musicInfoI) in musicList">
        <view
          :key="musicInfoI"
          class="music-item flex flex-justify-between"
          @click="toMusicDetail(musicInfo._id)"
        >
          <view class="music-num border-box"><text>{{ musicInfoI + 1 }}</text></view>
          <view class="music-info flex-auto">
            <view class="info-title ellip"> <text>{{ musicInfo.title }}</text> </view>
            <view class="info-desc flex flex-align-center">
              <template v-for="(tagItem, tagItemI) in musicInfo.tags">
                <text v-if="tagItem" :key="tagItemI" class="audio-tag">{{ tagItem }}</text>
              </template>
              <text class="ellip">{{ musicInfo.author }}</text>
            </view>
          </view>
          <!-- <audio-player class="btn-player flex-none" :src="musicInfo.src" /> -->
          <text class="iconfont iconbofang"></text>
        </view>
      </template>
      <view class="loading-wrapper">
        <u-loadmore
          :status="loadStatus"
          :icon-type="iconType"
          :load-text="loadText"
        />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'category-info',
    data() {
      return {
        offset: 0,
        limit: 10,
        musicList: [],
        categoryInfo: {},
        categoryTitle: '',
        categoryId: '',
        totalCount: 0,
        loadStatus: 'loading',
        iconType: 'flower',
        loadText: {
          loading: '努力加载中',
          nomore: '我也是有底线的'
        }
      }
    },
    onLoad(options) {
      const {
        title,
        color,
        id
      } = options
      this.categoryTitle = title
      this.categoryId = id
    },
    onShow() {
      console.log('category-info onShow')
      this.getCategoryDetail()
      this.getMusicListByCategory()
    },
    onHide() {
      console.log('category-info onHide')
    },
    onUnload() {
      console.log('category-info onUnload')
    },
    onReachBottom() {
      if (['nomore'].includes(this.loadStatus)) return
      this.getMusicListByCategory()
    },
    methods: {
      async getCategoryDetail() {
        if (!this.categoryId) return
        const detailInfo = await this.$http.getCategoryDetail({
          id: this.categoryId
        })
        this.categoryInfo = detailInfo
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: detailInfo.detailBgColor,
        })
        // #ifdef MP-WEIXIN
        uni.setBackgroundColor({
          backgroundColor: detailInfo.detailBgColor,
        })
        // #endif
      },
      async getMusicListByCategory() {
        if (!this.categoryId) return
        this.loadStatus = 'loading'
        const res = await this.$http.getMusicListByCategory({
          id: this.categoryId,
          offset: this.offset,
          limit: this.limit,
        })
        if (res) {
          this.musicList.push(...res.list) 
          this.totalCount = res.count
          this.offset = this.offset + this.limit
          if (this.offset >= this.totalCount) {
            this.loadStatus = 'nomore'
            return
          }
        }
        this.loadStatus = 'loading'
      },
      toCategoryDetail() {
        uni.navigateTo({
          url: `/pages/category-detail/category-detail?id=${this.categoryId}`
        })
      },
      toMusicDetail(id) {
        const color = this.categoryInfo.detailBgColor
        uni.navigateTo({
          url: `/pages/music-detail/music-detail?id=${id}&bgcolor=${color}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category-info {
    height: 100vh;

    .music-header {
      color: #fff;
      padding: 60rpx 30rpx 40rpx;

      .header-card {
        position: relative;
        width: 250rpx;
        height: 250rpx;
        border-radius: 20rpx;

        .card-title {
          font-size: 60rpx;
        }

        .card-amount {
          position: absolute;
          top: 10rpx;
          right: 10rpx;
          font-size: 22rpx;

          .iconbofang-simple {
            font-size: 22rpx;
          }
        }
      }

      .header-right {
        margin-left: 30rpx;

        .right-title {
          font-size: 40rpx;
        }

        .music-copyright {
          margin-top: 30rpx;
          margin-bottom: 30rpx;

          .iconmusic {
            color: #fff;
            background-color: #c52d25;
            border-radius: 50%;
            padding: 4rpx;
            margin-right: 10rpx;
          }

          .music-copyright-text {
            font-size: 22rpx;
            color: #d9dee7;
          }
        }

        .right-desc {
          font-size: 22rpx;
          line-height: 32rpx;
          color: #d9dee7;
          display: flex;
          align-items: center;
          overflow: hidden;

          .right-desc-text {
            flex: 1;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .desc-text-right {
            flex: none;
          }
        }
      }
    }

    .btn-share {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      width: 300rpx;
      margin-left: 225rpx;
      margin-bottom: 40rpx;
      border-radius: 50rpx;
      height: 60rpx;
      font-size: 24rpx;
      color: #c9d9ea;
      background-color: rgba($color: #000, $alpha: .1);

      &::after {
        border: 0;
      }

      .iconhuaban19 {
        margin-right: 10rpx;
        font-size: 28rpx;
      }
    }

    .music-wrapper {
      background-color: #fff;
      border-radius: 20rpx;
      padding-bottom: 30rpx;

      .music-wrapper-header {
        color: #000;
        padding: 30rpx;

        .iconbofang1 {
          font-size: 50rpx;
          margin-right: 20rpx;
        }

        .play-all-tip {
          color: #ccc;
          font-size: 20rpx;
        }
      }

      .music-item {
        padding: 20rpx;

        .music-num {
          color: #ababab;
          width: 60rpx;
          padding-top: 6rpx;
          text-align: center;
        }

        .music-info {
          margin-left: 20rpx;
          overflow: hidden;
        }

        .info-title {
          font-weight: 700;
          font-size: 32rpx;
        }

        .info-desc {
          color: #bdbdbd;
          margin-top: 15rpx;
          font-size: 20rpx;

          .audio-tag {
            margin-right: 5rpx;
            padding: 2rpx 5rpx;
            font-size: 12rpx;
            color: #d78889;
            font-weight: 700;
            border: 2rpx solid #d78889;
          }
        }

        // .btn-player {
        //   width: 60rpx;
        //   margin-left: 20rpx;
        // }
        .iconbofang {
          font-size: 60rpx;
          color: #ddd;
        }
      }
    
      .loading-wrapper {
        margin: 50rpx 0;
      }
    }
  }
</style>
