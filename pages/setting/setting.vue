<template>
  <view v-if="userinfo" class="page-setting">
    <setting-item>
      <text>头像</text>
      <template #tip>
        <u-avatar
          v-if="userinfo.avatar"
          class="user-avatar"
          mode="square"
          size="120"
          :src="userinfo.avatar"
          @click="chooseImage"
        >
        </u-avatar>
        <u-avatar
          v-else
          class="empty-avatar user-avatar"
          mode="square"
          size="large"
          text="无"
          @click="chooseImage"
        >
        </u-avatar>
      </template>
    </setting-item>
    <setting-item>
      <text>用户名</text>
      <text slot="tip">{{ userinfo.username }}</text>
    </setting-item>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import SettingItem from './setting-item.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'page-setting',
    components: {
      SettingItem,
    },
    data() {
      return {
        showSexPicker: false,
        sexList: [
          {value: 1, label: '男', extra: 0},
          {value: 2, label: '女', extra: 1},
        ],
        defaultSex: 0,
        chooseSex: '',
      }
    },
    computed: {
      ...mapState(['userinfo']),
    },
    created() {
      if (!this.userinfo) {
        uni.navigateTo({
          url: '../home/home'
        })
      }
    },
    methods: {
      confirmSelect(res) {
        const [sex] = res
        const { extra } = sex
        console.log('sex ->', sex)
        this.userInfo.sex = sex.value
        this.chooseSex = sex.label
        this.defaultSex = extra || 0
      },
      async updateUserInfo(key, val) {
        this.$store.commit('updateUserInfo', {[key]: val})
        try{
          await this.$http.updateUserInfo({
            _id: this.userinfo._id,
            [key]: val,
          })
          this.$refs.uToast.show({
            title: '更新成功',
            type: 'success',
            duration: '1000',
          })
        }catch(e){
          //TODO handle the exception
          console.log('更新用户信息失败：', e)
        }
      },
      chooseImage() {
        console.log('----')
        const that = this
        uni.chooseImage({
          count: 1, //默认9
          success: async function (res) {
            const [file] = res.tempFiles
            const uploadRes = await uniCloud.uploadFile({
              filePath: file.path,
              cloudPath: file.name,
            });
            if (uploadRes.fileID) {
              that.updateUserInfo('avatar', uploadRes.fileID)
            }
          }
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .page-setting {
    .empty-avatar {
      border: 1px solid #efefef;
    }
    .user-avatar {
      margin: 10rpx 0;
    }
    .setting-item {
      padding: 30rpx;
      & + .setting-item {
        position: relative;
        &::before {
          position: absolute;
          content: '';
          left: 30rpx;
          top: 0;
          right: 0;
          border-top: 1rpx solid #efefef;
        }
      }
    }
  }
</style>
