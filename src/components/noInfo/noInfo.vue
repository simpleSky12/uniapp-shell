<template>
	<view class="no-info-container">
		<image src="../../static/no-info.png" mode=""></image>
		<text>暂无内容</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.no-info-container{
		width: 100%;
		text-align: center;
		image{
			width: 515rpx;
			height: 338rpx;
		}
		text{
			display: block;
			font-size: 20rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	}
</style>
