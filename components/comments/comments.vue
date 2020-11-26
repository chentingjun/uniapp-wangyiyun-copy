<template>
  <view class="comp-comments">
    <template v-for="(comment, commentI) in list">
      <view :key="commentI" class="comment-item">
        <view class="comment-item-top">
          <image class="comment-item-avatar" :src="comment.avatar" mode=""></image>
          <view class="comment-item-top-main">
            <view class="comment-item-name"><text>{{ comment.name }}</text></view>
            <view class="comment-item-date"><text>{{ comment.createTime }}</text></view>
          </view>
          <view class="comment-item-goods">
            <text>{{ comment.goodsNum }}</text>
            <text class="iconfont icondianzan"></text>
          </view>
        </view>
        <view class="comment-item-main">
          <text>{{ comment.content }}</text>
        </view>
      </view>
    </template>
    <view v-if="list.length === 0" class="empty-list">
      <text>暂无评论</text>
    </view>
    <view v-if="list.length > 5" class="btn-to-download">
      <text>下载云音乐查看更多精彩评论</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'comp-comments',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comp-comments {
    .comment-item {
      margin: 30rpx;
    }
    .comment-item-top {
      display: flex;
      align-items: center;
      .comment-item-avatar {
        flex: none;
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
      }
      .comment-item-top-main {
        flex: 1;
        margin-left: 20rpx;
        .comment-item-name {
          color: #ddd;
          font-size: 24rpx;
        }
        .comment-item-date {
          color: #8ab79b;
          font-size: 20rpx;
          margin-top: 10rpx;
        }
      }
      .comment-item-goods {
        color: #8ab79b;
        .icondianzan {
          margin-left: 10rpx;
        }
      }
    }
    .comment-item-main {
      margin-left: 90rpx;
      margin-top: 10rpx;
      padding-bottom: 20rpx;
      color: #fff;
      font-size: 28rpx;
      line-height: 48rpx;
      border-bottom: 2rpx solid rgba($color: #fff, $alpha: .1);
    }
    .empty-list {
      width: 100%;
      text-align: center;
      color: #fff;
      margin-top: 50rpx;
    }
    .btn-to-download {
      background-color: rgba($color: #000, $alpha: .1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 690rpx;
      margin: 30rpx auto 50rpx;
      height: 70rpx;
      border-radius: 70rpx;
    }
  }
</style>
