<template>
  <view class="comp-music-category">
    <view class="category-image" :style="{backgroundColor: categoryData.markColor}">
      <text class="category-image-title">{{ categoryData.title }}</text>
      <text class="category-image-tip">{{ categoryData.updateFrequency }}</text>
    </view>
    <view class="category-music-list">
      <template v-for="(music, musicI) in categoryData.musicList">
        <view
          v-if="musicI < 3"
          :key="musicI"
          class="category-music-item ellip"
        >
          <text>{{`${musicI + 1}.${music.title}-${music.author}`}}</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'comp-music-category',
    props: {
      categoryData: {
        type: Object,
        default() {
          return null
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .comp-music-category {
    display: flex;
    align-items: center;
    .category-image {
      position: relative;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200rpx;
      height: 200rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
      color: #fff;
      .category-image-title {
        font-size: 48rpx;
        font-weight: 700;
      }
      .category-image-tip {
        position: absolute;
        left: 15rpx;
        bottom: 10rpx;
        font-size: 14rpx;
        opacity: .7;
      }
    }
    .category-music-list {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .category-music-item {
        margin: 20rpx 0;
        font-size: 28rpx;
      }
    }
  }
</style>
