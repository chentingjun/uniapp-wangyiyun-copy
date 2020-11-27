<template>
	<view class="content">
		<imt-audio autoplay continue :src="audio[now]" :duration="audio[now].duration" @prev="now = now === 0?audio.length-1:now-1" @next="now = now === audio.length-1?0:now+1"></imt-audio>
		<!-- 
			 src: String 音频链接*必须*
			 autoplay: Boolean 是否自动播放*默认false*
			 continue: Boolean 播放完成后是否继续播放下一首，需定义@next事件*默认false*
			 control: Boolean 是否需要上一曲/下一曲按钮*默认true*
			 color: String 主色调*默认#169af3*
			 @prev:点击上一首按钮
			 @next:点击下一首按钮
		  -->
		<view class="list" :class="{active:key===now}" v-for="(item,key) in audio" :key="key" @click="now = key">{{key+1}}</view>
	</view>
</template>

<script>
	import imtAudio from 'components/imt-audio/imt-audio'
	export default {
		data() {
			return {
				audio: [
					'http://xiaozhang.php-cli.cn/music-1.mp3',
					'http://xiaozhang.php-cli.cn/music-2.mp3',
					'http://xiaozhang.php-cli.cn/music-3.mp3',
					'http://xiaozhang.php-cli.cn/music-4.mp3',
					'http://xiaozhang.php-cli.cn/music-5.mp3'
				],
				now: 0
			}
		},
		onLoad() {
			
		},
		components: {
			imtAudio
		}
	}
</script>

<style>
	page{
		background: #f5f5f5;
	}
	
	.content {
		padding: 20upx;
	}

	.list {
		font-size: 28upx;
		line-height: 88upx;
		padding-left: 30upx;
		background: #fff;
		border-radius: 10upx;
		margin-top: 20upx;
		color: #333;
	}

	.active {
		background: #169af3;
		color: #fff;
	}
</style>