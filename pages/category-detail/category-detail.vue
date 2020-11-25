<template>
  <view
    v-if="categoryInfo"
    class="category-detail flex-column flex-align-center"
    :style="{backgroundColor: categoryInfo.detailBgColor}"
  >
    <view
      class="category-title flex flex-align-center flex-justify-center"
      :style="{backgroundColor: categoryInfo.markColor}"
    > 
      {{ categoryInfo.title }}
    </view>
    <view class="category-subtitle flex flex-justify-center"> {{ categoryInfo.subTitle }} </view>
    <view
      class="category-line"
      :style="{
        backgroundImage: `linear-gradient(to right, ${categoryInfo.detailBgColor}, #fff, ${categoryInfo.detailBgColor})`
      }"
    ></view>
    <view class="category-tags"> 标签：{{ tagText }} </view>
    <view class="category-desc"> {{ categoryInfo.desc }} </view>
  </view>
</template>

<script>
  export default {
    name: 'category-detail',
    data() {
      return {
        categoryInfo: null
      }
    },
    computed: {
      tagText() {
        if (this.categoryInfo) {
          const {tags} = this.categoryInfo
          if (tags.length > 0) {
            return tags.join('、')
          }
        }
        return '无'
      }
    },
    onLoad({ id }) {
      this.getCategoryDetail(id)
    },
    methods: {
      async getCategoryDetail(id) {
        if (!id) return
        const detailInfo = await this.$http.getCategoryDetail({id})
        this.categoryInfo = detailInfo
        uni.setNavigationBarTitle({
          title: detailInfo.title,
        })
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
    }
  }
</script>

<style lang="scss" scoped>
  $width: 650rpx;
  $marginTop: 30rpx;
  .category-detail {
    height: 100vh;
    color: #fff;
    .category-title {
      width: 400rpx;
      height: 400rpx;
      font-size: 80rpx;
      font-weight: 700;
      color: #fff;
      border-radius: 20rpx;
    }
    .category-subtitle {
      margin-top: $marginTop;
    }
    .category-line {
      margin-top: $marginTop;
      height: 2rpx;
      width: $width;
    }
    .category-tags, .category-desc {
      width: $width;
      margin-top: $marginTop;
      font-size: 22rpx;
      line-height: 36rpx;
    }
  }
</style>
