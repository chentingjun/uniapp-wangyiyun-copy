<template>
  <view class="home">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="used-login">
      <login />
    </view>
    <u-search class="search-input" placeholder="搜索歌曲" :show-action="false" placeholder-color="#c4c4c4"
      search-icon-color="#c4c4c4" v-model="keyword" />
    <button open-type="share" class="btn-banner">
      <image
        class="banner"
        src="../../static/wangyiyun-banner.png"
        mode="widthFix"
      />
    </button>
    <template v-for="(categoryItem, categoryItemI) in categoryList">
      <view
        v-if="categoryItem"
        :key="categoryItemI"
        class="category-item"
        @click="handleCategoryItem(categoryItem)"
      >
        <music-category :category-data="categoryItem" />
      </view>
    </template>
    <view class="copyright">
      @ 数据来源喜马拉雅，界面模仿网易云
    </view>
  </view>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        keyword: '',
        categoryList: []
      }
    },
    onLoad() {
      this.getCategoryList()
    },
    onShow() {
      console.log('home onShow')
    },
    onHide() {
      console.log('home onHide')
    },
    onUnload() {
      console.log('home onUnload')
    },
    methods: {
      async getCategoryList() {
        uni.showLoading({
          title: '加载中...'
        })
        try{
          const res = await this.$http.getCategoryList({
            musicLimit: 3
          })
          if (res) {
            this.categoryList = res
          }
          uni.hideLoading()
        }catch(e){
          //TODO handle the exception
          uni.hideLoading()
        }
      },
      handleCategoryItem(item) {
        const { _id, title, markColor } = item
        uni.navigateTo({
          url: `/pages/category-info/category-info?id=${_id}&title=${title}&color=${markColor}`
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  $spaceHeight: 30rpx;
  .status_bar {
    height: calc(var(--status-bar-height));  
    height: calc(var(--status-bar-height) + constant(safe-area-inset-top));  
    height: calc(var(--status-bar-height) + env(safe-area-inset-top));
    width: 100%;
  }
  .home {
    padding: $spaceHeight;
  }

  .used-login {
    margin-bottom: $spaceHeight;
  }

  .earch-input {
    color: red;
  }
  .btn-banner {
    width: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    margin-top: $spaceHeight;
    line-height: 0;
    &::after {
      border: 0;
    }
  }
  .banner {
    width: 100%;
    border-radius: 10rpx;
  }

  .category-item {
    margin-top: $spaceHeight;
  }
  .copyright {
    text-align: center;
    margin-top: 30rpx;
    border-top: 1px solid #ccc;
    padding-top: 25rpx;
    font-size: 20rpx;
    color: #cecece;
  }
</style>
